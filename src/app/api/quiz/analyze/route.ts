import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateAIResponse } from "@/lib/ai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sendRecommendations } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { selections, stream, interests, educationLevel, passionField } = await req.json()

    // 1. Calculate frequency map of quiz choices
    const freq: Record<string, number> = {}
    selections.forEach((id: string) => {
      freq[id] = (freq[id] || 0) + 1
    })

    // 2. Get quiz-selected careers (for context)
    const quizCareerIds = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 10)
    const quizCareers = await prisma.career.findMany({
      where: { id: { in: quizCareerIds } }
    })

    // 3. Get BROADER career pool from DB based on:
    //    a) Matching stream (Science_PCM, Science_PCB, Commerce, Arts, Any)
    //    b) Interest tags matching the user's selected interests
    //    c) Passion field (music, entrepreneurship, dance, sports, art, etc.)
    const streamFilters = stream && stream !== 'NotSure'
      ? [stream, 'Any']
      : undefined

    const allRelevantCareers = await prisma.career.findMany({
      where: {
        AND: [
          streamFilters ? { stream: { in: streamFilters } } : {},
          interests && interests.length > 0
            ? {
                OR: [
                  { interestTags: { hasSome: interests } },
                  { career_cluster: { in: interests } },
                  // Include passion field as career cluster match
                  ...(passionField ? [{ career_cluster: { contains: passionField } }] : [])
                ]
              }
            : {}
        ]
      },
      take: 50 // Wider pool for AI to reason over
    })

    // 4. Merge quiz careers + broader pool (deduplicated)
    const allCareerIds = new Set([
      ...quizCareers.map(c => c.id),
      ...allRelevantCareers.map(c => c.id)
    ])
    const mergedCareers = [
      ...quizCareers,
      ...allRelevantCareers.filter(c => !quizCareers.find(qc => qc.id === c.id))
    ].slice(0, 40)

    // 5. Prepare enriched AI Prompt with broader context
    const prompt = `
      You are an expert career counsellor for Indian students after Class 12.
      Analyse ALL the student's data holistically and return their TOP 10 best-fit career recommendations.
      
      IMPORTANT RULE: You MUST recommend a diverse mix. At least 50% of your recommendations MUST BE careers that were NOT explicitly chosen in the quiz, but are highly relevant based on the student's interests, stream and passion field. Do not just regurgitate the quiz choices. Introduce them to new, lateral paths.
      
      Student Profile:
      - Stream: ${stream}
      - Education Level: ${educationLevel}
      - Selected Interest Areas: ${interests.join(", ")}
      - Passion / Field of Interest: ${passionField || "Not specified"}
      - Quiz Choices (career IDs with frequency): ${JSON.stringify(freq)}
      
      Available Careers to Recommend From (${mergedCareers.length} options):
      ${JSON.stringify(mergedCareers.map(c => ({ 
        id: c.id, 
        name: c.name,
        stream: c.stream,
        sector: c.sector,
        description: c.description,
        interestTags: c.interestTags,
        career_cluster: c.career_cluster,
        salary: `${c.salaryRangeMin}-${c.salaryRangeMax}L`,
        demand: c.demand,
        growth: c.growth,
        avg_salary_lpa: c.avg_salary_lpa,
        job_demand_trend: c.job_demand_trend,
        work_from_home: c.work_from_home_possible,
        self_employment: c.self_employment_possible,
        years_to_first_job: c.years_to_first_job,
        difficulty: c.difficulty
      })))}
      
      Scoring Criteria (weigh each):
      1. Passion field alignment (25%) — if passion field matches career cluster/sector, boost score significantly.
      2. Interest tag overlap (25%) — more matching interest tags = higher score.
      3. Stream compatibility (25%) — career must be accessible from student's stream.
      4. Market demand & growth (15%) — prioritise high-demand, high-growth careers.
      5. Discovery factor (10%) — Boost careers that match the profile but weren't in the explicit quiz choices to encourage discovery.

      Return a JSON array of exactly 10 recommendations:
      [{ 
        "careerId": "string", 
        "matchScore": 0-100, 
        "whyItFits": "2-3 sentences explaining specifically why this fits THIS student's profile, interests and passion", 
        "roadmapSummary": "Brief 1-sentence next step",
        "confidenceLevel": "High|Medium|Exploratory",
        "streamNote": "Optional: note if stream switch is needed"
      }]
      
      Sort by matchScore descending. Return ONLY valid JSON, no markdown code fences.
    `

    let recommendations;
    try {
      const aiResponse = await generateAIResponse(prompt);
      // Strip any markdown code fences if present
      const cleanedJson = aiResponse
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim()
      recommendations = JSON.parse(cleanedJson)
    } catch (aiError) {
      console.error("AI Analysis Failed, using intelligent fallback:", aiError)
      // Intelligent fallback: score by interest tag overlap + stream match
      const scored = mergedCareers.map((c, idx) => {
        const interestOverlap = c.interestTags.filter(tag => interests.includes(tag)).length
        const streamMatch = !c.stream || c.stream === 'Any' || c.stream === stream ? 20 : 0
        const quizBoost = freq[c.id] ? freq[c.id] * 5 : 0
        const passionBoost = passionField && c.career_cluster?.toLowerCase().includes(passionField.toLowerCase()) ? 15 : 0
        const score = Math.min(95, 50 + interestOverlap * 8 + streamMatch + quizBoost + passionBoost)
        return {
          careerId: c.id,
          matchScore: score,
          whyItFits: `Based on your interest in ${interests.slice(0, 3).join(', ')}, ${c.name} is a strong match for your profile.`,
          roadmapSummary: "Complete your degree, gain certifications, and build a portfolio.",
          confidenceLevel: score >= 80 ? "High" : score >= 65 ? "Medium" : "Exploratory"
        }
      })
      recommendations = scored
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10)
    }

    // 6. Save to Database if user is logged in
    let quizSessionId = null

    if (session?.user?.id && recommendations.length > 0) {
      try {
        const validCareerIds = mergedCareers.map(c => c.id)
        const validRecs = recommendations.filter((r: any) => validCareerIds.includes(r.careerId))
        
        const quizSession = await prisma.quizSession.create({
          data: {
            userId: (session.user as any).id,
            stream: stream,
            interests: interests,
            results: {
              create: validRecs.map((r: any, idx: number) => ({
                careerId: r.careerId,
                matchScore: r.matchScore || 0,
                matchReason: r.whyItFits || "High interest match.",
                rank: idx + 1
              }))
            }
          }
        })
        quizSessionId = quizSession.id

        // Autosend recommendations email
        const emailRecs = validRecs.map((r: any) => {
          const career = mergedCareers.find(c => c.id === r.careerId);
          return {
            name: career?.name || "Career",
            aiSummary: r.whyItFits
          };
        }).slice(0, 5); // Top 5
        
        if (session.user.email) {
          sendRecommendations(session.user.email, emailRecs).catch(console.error);
        }
      } catch (dbError) {
        console.error("Failed to save quiz session:", dbError)
      }
    }

    return NextResponse.json({ recommendations, quizSessionId })
  } catch (error) {
    console.error("Quiz Analysis Error:", error)
    return NextResponse.json({ error: "Failed to analyze quiz" }, { status: 500 })
  }
}

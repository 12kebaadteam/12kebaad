import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateAIResponse } from "@/lib/ai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { selections, stream, interests, educationLevel } = await req.json()

    // 1. Calculate frequency map
    const freq: Record<string, number> = {}
    selections.forEach((id: string) => {
      freq[id] = (freq[id] || 0) + 1
    })

    // 2. Get the career details from DB for the top chosen ones
    const careerIds = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 15)
    const topCareers = await prisma.career.findMany({
      where: { id: { in: careerIds } }
    })

    // 3. Prepare AI Prompt
    const prompt = `
      System: You are a career counsellor for Indian students. 
      Analyse the student's quiz data and return a JSON array of their top 10 career recommendations.
      
      User Data:
      - Stream: ${stream}
      - Education Level: ${educationLevel}
      - Selected Interests: ${interests.join(", ")}
      - Quiz choices (frequency map of career IDs): ${JSON.stringify(freq)}
      
      Career Data (Context): ${JSON.stringify(topCareers.map(c => ({ id: c.id, name: c.name, description: c.description })))}
      
      Return JSON: [{ 
        "careerId": "string", 
        "matchScore": 0-100, 
        "whyItFits": "string", 
        "roadmapSummary": "string" 
      }]
      
      IMPORTANT: Only recommend careers that exist in the provided Career Data. Do not invent careers. Return valid JSON only.
    `

    let recommendations;
    try {
      const aiResponse = await generateAIResponse(prompt);
      const cleanedJson = aiResponse.replace(/```json|```/g, "").trim()
      recommendations = JSON.parse(cleanedJson)
    } catch (aiError) {
      console.error("AI Analysis Failed, using fallback:", aiError)
      // Fallback: Use frequency map and topCareers directly
      recommendations = topCareers.map((c, idx) => ({
        careerId: c.id,
        matchScore: 90 - (idx * 5),
        whyItFits: `Based on your choices, ${c.name} is a strong match for your interests.`,
        roadmapSummary: "Complete Class 12, pursue degree, gain experience."
      })).slice(0, 10)
    }

    // 4. Save to Database if user is logged in
    let quizSessionId = null
    if (session?.user?.id && recommendations.length > 0) {
      try {
        const quizSession = await prisma.quizSession.create({
          data: {
            userId: (session.user as any).id,
            stream: stream,
            interests: interests,
            results: {
              create: recommendations.map((r: any, idx: number) => ({
                careerId: r.careerId,
                matchScore: r.matchScore || 0,
                matchReason: r.whyItFits || "High interest match.",
                rank: idx + 1
              }))
            }
          }
        })
        quizSessionId = quizSession.id
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

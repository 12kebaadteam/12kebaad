import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { explainRecommendation } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { stream, marks, interests, budget, location } = body;

    // 1. Fetch relevant careers
    const careers = await prisma.career.findMany({
      where: { stream: { in: [stream, 'ANY', 'Any'] } },
      include: { skills: true }
    });

    // 2. Scoring Logic
    const scoredCareers = await Promise.all(careers.map(async (career) => {
      let score = 0;

      // A. Interest Match (40%)
      const careerSkillNames = career.skills.map(s => s.skillName.toLowerCase());
      const interestMatches = interests.filter((i: string) => 
        careerSkillNames.some(cs => cs.includes(i.toLowerCase()) || i.toLowerCase().includes(cs))
      ).length;
      score += (interestMatches / (interests.length || 1)) * 40;

      // B. Marks (20%) - Logic: Higher demand careers often have higher cutoffs
      // For simplicity: score increases if marks are high, but we can refine this with DB data
      score += Math.min((marks / 100) * 20, 20);

      // C. Demand & Growth (15% each)
      score += (career.demand / 10) * 15;
      score += (career.growth / 10) * 15;

      // D. Difficulty (10%) - Pivot: Lower difficulty is better for general suggestions
      score += ((10 - career.difficulty) / 10) * 10;

      return {
        ...career,
        matchScore: Math.round(score),
      };
    }));

    // 3. Sort and pick Top 5
    const top5 = scoredCareers
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    // 4. Enrich with AI Summaries and Top Colleges
    const results = await Promise.all(top5.map(async (career) => {
      const aiSummary = await explainRecommendation(career.name, { stream, marks, interests, budget });
      
      // Fetch associated colleges for this career
      const collegeLinks = await prisma.collegeCareer.findMany({
        where: { careerId: career.id },
        include: { college: true },
        take: 10 // Get potential candidates
      });

      // Rank Colleges for this user
      const colleges = collegeLinks.map(link => {
        let collegeScore = 0;
        const college = link.college;

        // Match Score (50%)
        collegeScore += 50; 

        // Location Proximity (20%)
        if (location && college.location.toLowerCase().includes(location.toLowerCase())) {
          collegeScore += 20;
        }

        // Affordability (15%)
        if (budget && college.fees <= budget) {
          collegeScore += 15;
        }

        // Quality (15%)
        collegeScore += (college.realityScore / 10) * 15;

        return {
          ...college,
          collegeScore: Math.round(collegeScore)
        };
      })
      .sort((a, b) => b.collegeScore - a.collegeScore)
      .slice(0, 5); // 5 nearby or best overall

      return {
        id: career.id,
        name: career.name,
        matchScore: career.matchScore,
        salaryRange: `₹${career.salaryRangeMin.toLocaleString()} - ₹${career.salaryRangeMax.toLocaleString()}`,
        difficulty: career.difficulty,
        aiSummary,
        colleges
      };
    }));

    // 5. Log recommendation if user is logged in (optional)
    // We can implement this later when Auth is fully integrated

    return NextResponse.json({ success: true, careers: results });
  } catch (error) {
    console.error("Predictor Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

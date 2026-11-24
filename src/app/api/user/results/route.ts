import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions, getAuthenticatedUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  const dbUser = await getAuthenticatedUser(session)
  if (!dbUser) {
    return NextResponse.json({ results: null })
  }

  const latestSession = await prisma.quizSession.findFirst({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
    include: {
      results: {
        orderBy: { rank: 'asc' }
      }
    }
  })

  if (!latestSession) {
    return NextResponse.json({ results: null })
  }

  return NextResponse.json({ 
    results: {
      recommendations: latestSession.results.map(r => ({
        careerId: r.careerId,
        matchScore: r.matchScore,
        whyItFits: r.matchReason,
        rank: r.rank
      }))
    }
  })
}

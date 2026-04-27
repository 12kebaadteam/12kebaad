import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { isPositive, reason, careerId } = await req.json()

    const feedback = await prisma.feedback.create({
      data: {
        isPositive,
        reason,
        careerId,
        userId: session?.user?.id
      }
    })

    return NextResponse.json(feedback)
  } catch (error) {
    console.error("Feedback Error:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}

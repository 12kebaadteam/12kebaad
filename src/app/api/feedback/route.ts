import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { isPositive, reason, careerId } = await req.json()

    const feedback = await prisma.feedback.create({
      data: {
        isPositive,
        reason,
        careerId,
        userId: (session?.user as any)?.id
      }
    })

    revalidatePath('/admin/feedback')
    return NextResponse.json(feedback)
  } catch (error) {
    console.error("Feedback Error:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}

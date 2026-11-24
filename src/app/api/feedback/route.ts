import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions, getAuthenticatedUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { isPositive, reason, careerId } = body

    if (typeof isPositive !== 'boolean') {
      return NextResponse.json({ error: "isPositive boolean is required" }, { status: 400 })
    }

    const session = await getServerSession(authOptions)
    const dbUser = await getAuthenticatedUser(session)
    const userId = dbUser?.id || null

    const feedback = await prisma.feedback.create({
      data: {
        isPositive,
        reason: typeof reason === 'string' ? reason.trim() || null : null,
        careerId: careerId || null,
        userId: userId
      }
    })

    revalidatePath('/admin/feedback')
    if (careerId) revalidatePath(`/career/${careerId}`)

    return NextResponse.json({ success: true, id: feedback.id })
  } catch (error) {
    console.error("Feedback API Error:", error)
    return NextResponse.json({ error: "Failed to submit feedback. Please try again." }, { status: 500 })
  }
}

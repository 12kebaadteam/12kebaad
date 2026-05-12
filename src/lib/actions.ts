'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function submitFeedback(data: { isPositive: boolean, reason?: string, careerId?: string }) {
  try {
    const session = await getServerSession(authOptions)
    
    await prisma.feedback.create({
      data: {
        isPositive: data.isPositive,
        reason: data.reason,
        careerId: data.careerId,
        userId: (session?.user as any)?.id
      }
    })

    revalidatePath('/admin/feedback')
    return { success: true }
  } catch (error) {
    console.error("Feedback Action Error:", error)
    return { success: false, error: "Failed to submit feedback" }
  }
}

export async function submitComment(data: { text: string, careerId?: string, courseId?: string }) {
  try {
    const session = await getServerSession(authOptions)
    
    const comment = await prisma.comment.create({
      data: {
        text: data.text,
        careerId: data.careerId,
        courseId: data.courseId,
        userId: (session?.user as any)?.id,
        status: "APPROVED" // Auto-approve for now as requested before
      }
    })

    revalidatePath('/admin/comments')
    return { success: true, comment }
  } catch (error) {
    console.error("Comment Action Error:", error)
    return { success: false, error: "Failed to submit comment" }
  }
}

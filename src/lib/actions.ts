'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import { authOptions, getAuthenticatedUser } from '@/lib/auth'

export async function submitFeedback(data: { isPositive: boolean, reason?: string, careerId?: string }) {
  try {
    const session = await getServerSession(authOptions)
    const dbUser = await getAuthenticatedUser(session)
    const userId = dbUser?.id || null
    
    const feedback = await prisma.feedback.create({
      data: {
        isPositive: Boolean(data.isPositive),
        reason: data.reason ? data.reason.trim() : null,
        careerId: data.careerId || null,
        userId: userId
      }
    })

    revalidatePath('/admin/feedback')
    if (data.careerId) {
      revalidatePath(`/career/${data.careerId}`)
    }
    return { success: true, feedbackId: feedback.id }
  } catch (error: any) {
    console.error("Feedback Action Error:", error)
    return { success: false, error: "Failed to submit feedback. Please try again." }
  }
}

export async function submitComment(data: { text: string, careerId?: string, courseId?: string }) {
  try {
    const trimmedText = data.text ? data.text.trim() : ''
    if (!trimmedText) {
      return { success: false, error: "Comment text cannot be empty." }
    }

    const session = await getServerSession(authOptions)
    const dbUser = await getAuthenticatedUser(session)
    const userId = dbUser?.id || null
    
    const comment = await prisma.comment.create({
      data: {
        text: trimmedText,
        careerId: data.careerId || null,
        courseId: data.courseId || null,
        userId: userId,
        status: "APPROVED"
      }
    })

    revalidatePath('/admin/comments')
    if (data.careerId) {
      revalidatePath(`/career/${data.careerId}`)
    }
    if (data.courseId) {
      revalidatePath(`/course/${data.courseId}`)
    }
    return { success: true, comment }
  } catch (error: any) {
    console.error("Comment Action Error:", error)
    return { success: false, error: "Failed to submit comment. Please try again." }
  }
}

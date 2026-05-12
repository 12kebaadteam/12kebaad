'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function submitFeedback(data: { isPositive: boolean, reason?: string, careerId?: string }) {
  console.log("Submitting feedback:", data)
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id
    
    const feedback = await prisma.feedback.create({
      data: {
        isPositive: data.isPositive,
        reason: data.reason || null,
        careerId: data.careerId || null,
        userId: userId || null
      }
    })
    console.log("Feedback created:", feedback.id)

    revalidatePath('/admin/feedback')
    return { success: true }
  } catch (error: any) {
    console.error("Feedback Action Error:", error.message, error)
    return { success: false, error: "Failed to submit: " + (error.message || "Unknown error") }
  }
}

export async function submitComment(data: { text: string, careerId?: string, courseId?: string }) {
  console.log("Submitting comment:", data)
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id
    
    const comment = await prisma.comment.create({
      data: {
        text: data.text,
        careerId: data.careerId || null,
        courseId: data.courseId || null,
        userId: userId || null,
        status: "APPROVED"
      }
    })
    console.log("Comment created:", comment.id)

    revalidatePath('/admin/comments')
    return { success: true, comment }
  } catch (error: any) {
    console.error("Comment Action Error:", error.message, error)
    return { success: false, error: "Failed to submit: " + (error.message || "Unknown error") }
  }
}

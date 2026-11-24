'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions, getAuthenticatedUser } from '@/lib/auth'

export async function updateProfile(formData: FormData) {
  const state = (formData.get('state') as string) || ''
  const stream = (formData.get('stream') as string) || ''

  const c = await cookies()
  let userId = c.get('user_id')?.value

  if (!userId) {
    const session = await getServerSession(authOptions)
    const dbUser = await getAuthenticatedUser(session)
    if (dbUser) {
      userId = dbUser.id
    }
  }

  // Update DB if user is identified
  if (userId) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user) {
        // If stream is different, increment the change count
        if (stream && user.stream !== stream) {
          if (user.streamChanges >= 5) {
            redirect('/update-profile?error=LimitReached')
          }
          
          await prisma.user.update({
            where: { id: userId },
            data: { state, stream, streamChanges: { increment: 1 } }
          })
        } else {
          await prisma.user.update({
            where: { id: userId },
            data: { state }
          })
        }
      }
    } catch (e) {
      console.error("Failed to update user in DB:", e)
    }
  }

  // Overwrite cookies — empty string means "all"
  c.set('user_state', state, { maxAge: 60 * 60 * 24 * 7 })
  c.set('user_stream', stream, { maxAge: 60 * 60 * 24 * 7 })

  // Redirect to courses with updated filters
  const params = new URLSearchParams()
  if (stream) params.set('stream', stream)
  if (state) params.set('state', state)
  redirect(`/courses${params.toString() ? `?${params.toString()}` : ''}`)
}

export async function deleteAccount() {
  const c = await cookies()
  let userId = c.get('user_id')?.value

  if (!userId) {
    const session = await getServerSession(authOptions)
    const dbUser = await getAuthenticatedUser(session)
    if (dbUser) {
      userId = dbUser.id
    }
  }

  if (userId) {
    try {
      await prisma.$transaction([
        prisma.quizSession.deleteMany({ where: { userId } }),
        prisma.userPreference.deleteMany({ where: { userId } }),
        prisma.bookmark.deleteMany({ where: { userId } }),
        prisma.question.deleteMany({ where: { userId } }),
        prisma.comment.deleteMany({ where: { userId } }),
        prisma.feedback.deleteMany({ where: { userId } }),
        prisma.user.delete({ where: { id: userId } })
      ])
    } catch (e) {
      console.error("Delete error:", e)
    }
  }

  c.delete('user_id')
  c.delete('user_state')
  c.delete('user_stream')
  
  redirect('/')
}

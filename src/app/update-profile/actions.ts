'use server'

import prisma from '../../../lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const state = (formData.get('state') as string) || ''
  const stream = (formData.get('stream') as string) || ''

  const c = await cookies()
  const userId = c.get('user_id')?.value

  // Update DB if user is identified
  if (userId) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { state, stream }
      })
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

'use server'

import prisma from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  const contactInfo = formData.get('contactInfo') as string
  const mobile = (formData.get('mobile') as string) || null
  const state = (formData.get('state') as string) || ''   // '' = All States
  const stream = formData.get('stream') as string

  // Save to DB — mobile may be null for new users (old users already have null by default)
  const user = await prisma.user.create({
    data: { name, contactInfo, mobile, state, stream }
  })

  const c = await cookies()
  c.set('user_id', user.id, { maxAge: 60 * 60 * 24 * 7 })
  c.set('user_state', state, { maxAge: 60 * 60 * 24 * 7 })
  c.set('user_stream', stream, { maxAge: 60 * 60 * 24 * 7 })

  const params = new URLSearchParams()
  if (stream) params.set('stream', stream)
  if (state) params.set('state', state)
  redirect(`/courses${params.toString() ? `?${params.toString()}` : ''}`)
}

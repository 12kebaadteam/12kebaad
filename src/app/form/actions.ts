'use server'

import prisma from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  const contactInfo = formData.get('contactInfo') as string
  const state = formData.get('state') as string
  const stream = formData.get('stream') as string

  // Save user info into database
  await prisma.user.create({
    data: { name, contactInfo, state, stream }
  })

  // Store user context in a cookie so pages can filter by it
  const c = await cookies()
  c.set('user_state', state, { maxAge: 60 * 60 * 24 * 7 })
  c.set('user_stream', stream, { maxAge: 60 * 60 * 24 * 7 })

  // Redirect to courses with stream + state filters
  redirect(`/courses?stream=${encodeURIComponent(stream)}&state=${encodeURIComponent(state)}`)
}

'use server'

import prisma from '../../../lib/prisma'
import { redirect } from 'next/navigation'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  const contactInfo = formData.get('contactInfo') as string
  const state = formData.get('state') as string
  const stream = formData.get('stream') as string

  // Save user info into SQLite database
  await prisma.user.create({
    data: { name, contactInfo, state, stream }
  })

  // Redirect to Courses list, passing the selected stream
  redirect(`/courses?stream=${stream}`)
}

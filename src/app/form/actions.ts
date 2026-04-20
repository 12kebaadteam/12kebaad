'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  const contactInfo = formData.get('contactInfo') as string
  const mobile = (formData.get('mobile') as string) || null
  const state = (formData.get('state') as string) || ''   // '' = All States
  const stream = formData.get('stream') as string

  // Save to DB — using upsert to avoid unique constraint errors if email exists
  const user = await prisma.user.upsert({
    where: { email: contactInfo },
    update: { 
      name, 
      mobile,
      preferences: {
        upsert: {
          create: { stream, marks: 0, interests: [], location: state },
          update: { stream, location: state }
        }
      }
    },
    create: { 
      name, 
      email: contactInfo, 
      mobile,
      preferences: {
        create: { stream, marks: 0, interests: [], location: state }
      }
    }
  })

  const c = await cookies()
  c.set('user_id', user.id, { maxAge: 60 * 60 * 24 * 7 })
  c.set('user_state', state, { maxAge: 60 * 60 * 24 * 7 })
  c.set('user_stream', stream, { maxAge: 60 * 60 * 24 * 7 })

  const callbackUrl = (formData.get('callbackUrl') as string) || '/courses'
  
  const params = new URLSearchParams()
  if (stream) params.set('stream', stream)
  if (state) params.set('state', state)
  
  // Append params to callbackUrl
  const finalRedirect = callbackUrl.includes('?') 
    ? `${callbackUrl}&${params.toString()}`
    : `${callbackUrl}${params.toString() ? `?${params.toString()}` : ''}`

  redirect(finalRedirect)
}

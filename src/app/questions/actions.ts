'use server'

import prisma from '../../../lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function submitQuestion(formData: FormData) {
  const question = (formData.get('question') as string)?.trim()
  if (!question || question.length < 10) return

  const c = await cookies()
  const userId = c.get('user_id')?.value

  if (!userId) {
    redirect('/form')
  }

  await prisma.question.create({
    data: { userId: userId!, question }
  })

  redirect('/questions?submitted=1')
}

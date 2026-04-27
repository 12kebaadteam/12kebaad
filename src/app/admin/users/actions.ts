'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function deleteUser(userId: string) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'admin') {
    throw new Error("Unauthorized")
  }

  await prisma.$transaction([
    prisma.quizSession.deleteMany({ where: { userId } }),
    prisma.userPreference.deleteMany({ where: { userId } }),
    prisma.bookmark.deleteMany({ where: { userId } }),
    prisma.question.deleteMany({ where: { userId } }),
    prisma.comment.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } })
  ])

  revalidatePath('/admin/users')
}

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function DELETE() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as any).id

  try {
    // Delete all related data first (though Cascade should handle most)
    await prisma.$transaction([
      prisma.quizSession.deleteMany({ where: { userId } }),
      prisma.userPreference.deleteMany({ where: { userId } }),
      prisma.bookmark.deleteMany({ where: { userId } }),
      prisma.question.deleteMany({ where: { userId } }),
      prisma.comment.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } })
    ])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Delete Account Error:", error)
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
  }
}

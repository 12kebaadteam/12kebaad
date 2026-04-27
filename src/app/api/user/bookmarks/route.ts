import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ bookmarks: [] })
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: (session.user as any).id },
    select: { careerId: true }
  })

  return NextResponse.json({ bookmarks: bookmarks.map(b => b.careerId) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { careerId, action } = await req.json()

  if (action === 'add') {
    await prisma.bookmark.upsert({
      where: {
        userId_careerId: {
          userId: (session.user as any).id,
          careerId
        }
      },
      update: {},
      create: {
        userId: (session.user as any).id,
        careerId
      }
    })
  } else if (action === 'remove') {
    await prisma.bookmark.deleteMany({
      where: {
        userId: (session.user as any).id,
        careerId
      }
    })
  }

  return NextResponse.json({ success: true })
}

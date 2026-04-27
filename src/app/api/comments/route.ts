import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { text, careerId, courseId } = await req.json()

    const comment = await prisma.comment.create({
      data: {
        text,
        careerId,
        courseId,
        userId: (session.user as any).id,
        status: "PENDING"
      }
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error("Comment Error:", error)
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const careerId = searchParams.get('careerId')
    const courseId = searchParams.get('courseId')

    const comments = await prisma.comment.findMany({
      where: {
        OR: [
          { careerId: careerId || undefined },
          { courseId: courseId || undefined }
        ],
        status: "APPROVED"
      },
      include: {
        user: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Fetch Comments Error:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

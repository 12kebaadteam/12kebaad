import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions, getAuthenticatedUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, careerId, courseId, targetId, type } = body

    const trimmedText = typeof text === 'string' ? text.trim() : ''
    if (!trimmedText) {
      return NextResponse.json({ error: "Comment text cannot be empty" }, { status: 400 })
    }

    // Support both direct IDs and CommentBox targetId/type parameters
    const resolvedCareerId = careerId || (type === 'career' ? targetId : null) || null
    const resolvedCourseId = courseId || (type === 'course' ? targetId : null) || null

    const session = await getServerSession(authOptions)
    const dbUser = await getAuthenticatedUser(session)
    const userId = dbUser?.id || null

    const comment = await prisma.comment.create({
      data: {
        text: trimmedText,
        careerId: resolvedCareerId,
        courseId: resolvedCourseId,
        userId: userId,
        status: "APPROVED"
      },
      include: {
        user: {
          select: { name: true }
        }
      }
    })

    revalidatePath('/admin/comments')
    if (resolvedCareerId) revalidatePath(`/career/${resolvedCareerId}`)
    if (resolvedCourseId) revalidatePath(`/course/${resolvedCourseId}`)

    return NextResponse.json(comment)
  } catch (error) {
    console.error("Comment API Error:", error)
    return NextResponse.json({ error: "Failed to submit comment. Please try again." }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const careerId = searchParams.get('careerId')
    const courseId = searchParams.get('courseId')

    const where: any = { status: 'APPROVED' }
    if (careerId) {
      where.careerId = careerId
    } else if (courseId) {
      where.courseId = courseId
    }

    const comments = await prisma.comment.findMany({
      where,
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

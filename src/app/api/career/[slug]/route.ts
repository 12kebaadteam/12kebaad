import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // Try finding by slug first, then by ID
    let career = await prisma.career.findUnique({
      where: { slug: slug }
    })
    
    if (!career) {
      career = await prisma.career.findUnique({
        where: { id: slug }
      })
    }

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 })
    }

    // Find related careers
    const related = await prisma.career.findMany({
      where: {
        OR: [
          { stream: career.stream },
          { sector: career.sector }
        ],
        NOT: { id: career.id }
      },
      take: 3,
      select: {
        id: true,
        name: true,
        slug: true,
        stream: true
      }
    })

    return NextResponse.json({ ...career, related })
  } catch (error) {
    console.error("Career Detail API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

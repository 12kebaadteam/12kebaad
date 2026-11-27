import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const careers = await prisma.career.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(careers)
  } catch (error) {
    console.error("Careers API Error:", error)
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 })
  }
}

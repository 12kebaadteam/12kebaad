import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json()
    const careers = await prisma.career.findMany({
      where: { id: { in: ids } }
    })
    return NextResponse.json(careers)
  } catch (error) {
    console.error("Batch Careers Error:", error)
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 })
  }
}

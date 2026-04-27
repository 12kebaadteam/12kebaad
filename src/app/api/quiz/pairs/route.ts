import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const stream = searchParams.get('stream') || 'Any'
    const interests = searchParams.get('interests')?.split(',') || []

    // 1. Get potential careers
    // We want careers that match the stream AND interests
    // We also include 'Any' stream careers as fallback
    let matchedCareers = await prisma.career.findMany({
      where: {
        OR: [
          { stream: stream },
          { stream: 'Any' }
        ],
        interestTags: {
          hasSome: interests
        }
      }
    })

    // 2. Get random careers from stream for the 30% mix
    let streamCareers = await prisma.career.findMany({
      where: {
        OR: [
          { stream: stream },
          { stream: 'Any' }
        ]
      }
    })

    // 3. Fallback if matched is too few
    if (matchedCareers.length < 10) {
      matchedCareers = streamCareers
    }

    // 4. Shuffle and pick pairs
    const allPool = [...new Map([...matchedCareers, ...streamCareers].map(c => [c.id, c])).values()]
    
    if (allPool.length < 2) {
      // Fallback: get ANY 20 careers if stream-specific ones are missing
      const fallbackCareers = await prisma.career.findMany({ take: 40 })
      if (fallbackCareers.length < 2) return NextResponse.json({ pairs: [] })
      allPool.push(...fallbackCareers)
    }

    const pairs = []
    const rounds = 20
    
    for (let i = 0; i < rounds; i++) {
      // Pick two unique random careers
      let idx1 = Math.floor(Math.random() * allPool.length)
      let idx2 = Math.floor(Math.random() * allPool.length)
      
      // Ensure they are different
      let attempts = 0
      while (idx1 === idx2 && attempts < 10) {
        idx2 = Math.floor(Math.random() * allPool.length)
        attempts++
      }
      
      pairs.push([allPool[idx1], allPool[idx2]])
    }

    return NextResponse.json({ pairs })
  } catch (error) {
    console.error("Quiz Pairs Error:", error)
    return NextResponse.json({ error: "Failed to fetch pairs" }, { status: 500 })
  }
}

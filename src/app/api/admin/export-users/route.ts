import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session as any).user?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const users = await prisma.user.findMany({
    include: { preferences: true },
    orderBy: { createdAt: 'desc' },
  })

  const headers = ['Name', 'Email', 'Mobile', 'State', 'Stream', 'Registered']
  const rows = users.map(u => [
    `"${(u.name || '').replace(/"/g, '""')}"`,
    `"${(u.email || '').replace(/"/g, '""')}"`,
    `"${(u.mobile || '').replace(/"/g, '""')}"`,
    `"${(u.preferences?.location || 'Not Specified').replace(/"/g, '""')}"`,
    `"${(u.preferences?.stream || 'Not Specified').replace(/"/g, '""')}"`,
    `"${new Date(u.createdAt).toLocaleDateString('en-IN')}"`,
  ].join(','))

  const csv = [headers.join(','), ...rows].join('\n')

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="12kebaad-users-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}

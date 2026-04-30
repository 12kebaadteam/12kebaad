import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topColleges = await prisma.college.findMany({
      take: 3,
      orderBy: {
        ranking: 'asc'
      }
    });

    return NextResponse.json(topColleges);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch top colleges" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stringify } from 'csv-stringify/sync';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Security check
    if (!session || (session as any).user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const stream = searchParams.get("stream");

    const users = await prisma.user.findMany({
      where: stream ? { preferences: { stream } } : {},
      include: { preferences: true }
    });

    const rawData = users.map(u => ({
      ID: u.id,
      Name: u.name || "N/A",
      Email: u.email || "N/A",
      Mobile: u.mobile || "N/A",
      Stream: u.preferences?.stream || "N/A",
      Marks: u.preferences?.marks || 0,
      Interests: u.preferences?.interests.join(", ") || "N/A",
      Budget: u.preferences?.budget || "N/A",
      RegisteredAt: u.createdAt.toISOString()
    }));

    const csvOutput = stringify(rawData, { header: true });
    
    return new Response(csvOutput, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="users-export.csv"'
      }
    });

  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { targetType, targetId } = await req.json();

    const lead = await prisma.lead.create({
      data: {
        userId: (session as any).user.id,
        targetType, // "CAREER_MENTORSHIP" or "COLLEGE_APPLY"
        targetId,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}

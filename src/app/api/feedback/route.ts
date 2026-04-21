import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { careerId, isPositive, reason } = body;

    await prisma.feedback.create({
      data: {
        isPositive,
        reason,
        careerId,
        userId: session?.user?.id || null
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

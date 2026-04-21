import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { text, targetId, type } = await req.json();

    if (!text || !targetId || !type) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const data: any = {
      text,
      userId: (session?.user as any)?.id || null,
      status: "PENDING"
    };

    if (type === 'course') {
      data.courseId = targetId;
    } else if (type === 'career') {
      data.careerId = targetId;
    }

    await prisma.comment.create({ data });

    return NextResponse.json({ success: true });
  } catch(error) {
    console.error("Comment Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendOTP } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.upsert({
      where: { email },
      update: { otp, otpExpires: expires },
      create: { 
        email, 
        otp, 
        otpExpires: expires,
        name: email.split('@')[0], // Default name
      }
    });

    const sent = await sendOTP(email, otp);
    if (!sent) return NextResponse.json({ error: "Failed to send email" }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

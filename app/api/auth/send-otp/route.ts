import { NextResponse } from "next/server";
import { db } from "@/db";
import { allowedAdmins, otps } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { envConfig } from "@/utils/envConfig";

const resend = new Resend(envConfig.resendApiKey);

export async function POST(req: Request) {
  const { email } = await req.json();

  // 1️⃣ Verify email is whitelisted
  const admin = await db
    .select()
    .from(allowedAdmins)
    .where(eq(allowedAdmins.email, email));
  if (!admin.length) {
    return NextResponse.json(
      { error: "Email not authorized" },
      { status: 403 }
    );
  }

  try {
    // 2️⃣ Generate 6‑digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // 3️⃣ Remove any existing OTPs for this email and insert new one
    await db.delete(otps).where(eq(otps.email, email));
    await db.insert(otps).values({ email, code, expiresAt });

    // 4️⃣ Send email via Resend
    // Set RESEND_FROM_EMAIL in .env for production (verified domain).
    // Falls back to Resend's test sender for development (only sends to your own email).
    await resend.emails.send({
      from: envConfig.resendFromEmail,
      to: email,
      subject: "Your admin login OTP",
      html: `
        <p>Hello,</p>
        <p>Your one‑time login code is <strong style="font-size:1.5em;">${code}</strong>. It expires in 5 minutes.</p>
        <p>If you didn't request this, just ignore this email.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("send-otp error:", error);
    const message =
      (error as { code?: string })?.code === "42P01"
        ? "Database not initialized – allowed_admins table missing"
        : "Failed to send OTP";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

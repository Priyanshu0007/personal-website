import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { allowedAdmins, otps } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { envConfig } from "@/utils/envConfig";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        otp: { label: "One‑time code", type: "text", placeholder: "123456" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;

        // 1️⃣ Verify email is whitelisted
        const admin = await db.select().from(allowedAdmins).where(eq(allowedAdmins.email, credentials.email));
        if (!admin.length || !admin[0]) return null;

        // 2️⃣ Verify OTP (must exist and not expired)
        const otpRows = await db.select().from(otps).where(
          and(eq(otps.email, credentials.email), eq(otps.code, credentials.otp))
        );
        if (!otpRows.length) return null;
        const otpRow = otpRows[0];
        if (!otpRow || otpRow.expiresAt < new Date()) return null; // expired

        // 3️⃣ Consume OTP so it cannot be reused
        await db.delete(otps).where(eq(otps.email, credentials.email));

        return { id: credentials.email, name: admin[0].name, email: credentials.email };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: envConfig.nextAuthSecret || "fallback_secret_for_development_only_12345",
};

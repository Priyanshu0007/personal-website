import { z } from "zod";

const isServer = typeof window === "undefined";

const envSchema = z.object({
  // Required server-side environment variables (only enforced on server)
  DATABASE_URL: isServer
    ? z
        .string({ message: "DATABASE_URL environment variable is missing" })
        .min(1, "DATABASE_URL cannot be empty")
    : z.string().default(""),
  RESEND_API_KEY: isServer
    ? z
        .string({ message: "RESEND_API_KEY environment variable is missing" })
        .min(1, "RESEND_API_KEY cannot be empty")
    : z.string().default(""),

  // Resend optional configuration
  RESEND_FROM_EMAIL: z.string().default("onboarding@resend.dev"),
  CONTACT_EMAIL_TO: z.string().default(""),

  // Public URLs
  NEXT_PUBLIC_RESUME_URL: z.string().default(""),
  NEXT_PUBLIC_PROFILE_PIC_URL: z.string().default(""),
  NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().default(""),

  // NextAuth
  NEXTAUTH_SECRET: z.string().default(""),

  // Firebase Configuration
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().default(""),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().default(""),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().default(""),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().default(""),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().default(""),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().default(""),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().default(""),
});

// Explicit process.env property access is required for Next.js to replace NEXT_PUBLIC_* variables in client bundles
const rawEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
  NEXT_PUBLIC_RESUME_URL: process.env.NEXT_PUBLIC_RESUME_URL,
  NEXT_PUBLIC_PROFILE_PIC_URL: process.env.NEXT_PUBLIC_PROFILE_PIC_URL,
  NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const parsedEnv = envSchema.safeParse(rawEnv);

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  console.error(
    "❌ Environment variable validation error(s):\n" + formattedErrors
  );
  throw new Error(
    `Invalid or missing environment variables:\n${formattedErrors}`
  );
}

const env = parsedEnv.data;

export const envConfig = {
  // Public URLs
  resumeUrl: env.NEXT_PUBLIC_RESUME_URL,
  profilePicUrl: env.NEXT_PUBLIC_PROFILE_PIC_URL,
  clarityProjectId: env.NEXT_PUBLIC_CLARITY_PROJECT_ID,

  // Resend
  resendApiKey: env.RESEND_API_KEY,
  resendFromEmail: env.RESEND_FROM_EMAIL,
  contactEmailTo: env.CONTACT_EMAIL_TO,

  // Database
  databaseUrl: env.DATABASE_URL,

  // NextAuth
  nextAuthSecret: env.NEXTAUTH_SECRET,

  // Firebase
  firebase: {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
};

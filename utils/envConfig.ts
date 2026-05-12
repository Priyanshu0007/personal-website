export const envConfig = {
  // Public URLs
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "",
  profilePicUrl: process.env.NEXT_PUBLIC_PROFILE_PIC_URL || "",
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "",

  // Resend
  resendApiKey: process.env.RESEND_API_KEY || "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  contactEmailTo: process.env.CONTACT_EMAIL_TO || "",

  // Database
  databaseUrl: process.env.DATABASE_URL || "",

  // NextAuth
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",

  // Firebase
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  },
};

export const envConfig = {
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "",
  profilePicUrl: process.env.NEXT_PUBLIC_PROFILE_PIC_URL || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  contactEmailTo: process.env.CONTACT_EMAIL_TO || "",
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "",
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

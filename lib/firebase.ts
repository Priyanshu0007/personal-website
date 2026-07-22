import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { envConfig } from "@/utils/envConfig";

const firebaseConfig = {
  apiKey: envConfig.firebase.apiKey,
  authDomain: envConfig.firebase.authDomain,
  projectId: envConfig.firebase.projectId,
  storageBucket: envConfig.firebase.storageBucket,
  messagingSenderId: envConfig.firebase.messagingSenderId,
  appId: envConfig.firebase.appId,
  measurementId: envConfig.firebase.measurementId,
};

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only on client side)
export const analytics =
  typeof window !== "undefined"
    ? isSupported().then((yes) => (yes ? getAnalytics(app) : null))
    : null;

/**
 * Tracks a custom event in Firebase Analytics
 * @param eventName The name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams Optional parameters to send with the event (e.g., { page: '/about', item: 'resume' })
 */
export const trackEvent = async (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  // Helpful log for local testing
  // if (process.env.NODE_ENV !== "production") {
  //   console.log(`📊 [Analytics Event]: ${eventName}`, eventParams || {});
  // }
  if (typeof window !== "undefined" && analytics) {
    const analyticsInstance = await analytics;
    if (analyticsInstance) {
      logEvent(analyticsInstance, eventName, eventParams);
    }
  }
};

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
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
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only on client side)
export const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

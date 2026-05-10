"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    // This effect ensures the analytics instance is initialized on the client.
    if (analytics) {
      analytics.then((a) => {
        if (a) {
          console.log("Firebase Analytics initialized");
        }
      });
    }
  }, []);

  return null;
}

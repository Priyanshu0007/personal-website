"use client";

import { useEffect } from "react";
import ScrollPreserver from "@/components/ui/ScrollPreserver";

// Register service worker for PWA offline support
function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}

export default function ClientEnhancements() {
  return (
    <>
      <ServiceWorkerRegistration />
      <ScrollPreserver />
    </>
  );
}

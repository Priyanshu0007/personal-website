"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics, trackEvent } from "@/lib/firebase";

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      
      // Track the page view whenever the route changes
      trackEvent("page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function FirebaseAnalytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}

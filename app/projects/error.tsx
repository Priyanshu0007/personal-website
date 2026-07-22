"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Projects page error:", error);
    trackUserAction(AnalyticsEvents.ERROR_OCCURRED, {
      error_message: error.message,
      error_digest: error.digest || "none",
      page_path: "/projects",
      error_type: "page_error",
    });
  }, [error]);

  return (
    <section className="section" id="projects-error">
      <div className="container flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <span className="glass-card inline-block px-6 py-3 text-5xl font-black md:text-7xl">
            💼
          </span>
        </motion.div>

        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          Failed to load projects
        </h1>

        <p className="text-text-secondary mb-8 max-w-lg text-lg">
          Unable to fetch projects at the moment. Please try again.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="glass-btn glass-btn-primary"
          >
            Try Again ↻
          </button>
          <Link href="/" className="glass-btn glass-btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

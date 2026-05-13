"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Project detail error:", error);
  }, [error]);

  return (
    <div className="section pt-6" id="project-error">
      <div className="container flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block border-[4px] border-text bg-surface px-6 py-3 text-5xl font-black text-text shadow-[6px_6px_0px_var(--color-secondary)] md:text-7xl">
            🔧
          </span>
        </motion.div>

        <h1 className="mb-4 text-3xl font-extrabold md:text-4xl">
          Something went wrong
        </h1>

        <p className="mb-8 max-w-lg text-lg text-text-secondary">
          Unable to load this project. Please try again.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="neo-btn neo-btn-primary"
          >
            Try Again ↻
          </button>
          <Link href="/projects" className="neo-btn neo-btn-secondary">
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
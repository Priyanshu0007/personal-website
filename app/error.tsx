"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="section relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      {/* Decorative shapes */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden="true"
      >
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="hover-target pointer-events-auto absolute top-[30%] left-[15%] h-20 w-20 cursor-grab border-[3px] border-[var(--color-border)] bg-[var(--color-tertiary)] opacity-80 active:cursor-grabbing"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="hover-target pointer-events-auto absolute right-[15%] bottom-[25%] h-24 w-24 cursor-grab rounded-full border-[3px] border-[var(--color-border)] bg-[var(--color-accent-purple)] opacity-80 active:cursor-grabbing"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      <div className="relative z-10 container flex flex-col items-center text-center">
        <motion.div
          initial={{ rotate: 5, scale: 0.9 }}
          animate={{ rotate: [5, -5, 5], scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mb-8"
        >
          <span className="inline-block border-[4px] border-[var(--color-text)] bg-[var(--color-text)] px-8 py-4 text-6xl font-black text-[var(--color-surface)] shadow-[8px_8px_0px_var(--color-secondary)] md:text-8xl">
            OOPS!
          </span>
        </motion.div>

        <h1
          className="mb-6 text-3xl font-extrabold md:text-5xl"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          <span className="neo-highlight">Something went wrong</span>
        </h1>

        <p className="mb-10 max-w-2xl text-xl leading-relaxed text-[var(--color-text-secondary)] md:text-2xl">
          An unexpected error occurred in the matrix. Don&apos;t panic,
          it&apos;s probably not your fault.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="neo-btn neo-btn-primary neo-btn-lg px-8 py-4 text-lg"
          >
            Try Again ↻
          </button>
          <Link
            href="/"
            className="neo-btn neo-btn-secondary neo-btn-lg px-8 py-4 text-lg"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

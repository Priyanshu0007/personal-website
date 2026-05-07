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
    <div className="section relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Decorative shapes */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="absolute top-[30%] left-[15%] w-20 h-20 bg-[var(--color-tertiary)] border-[3px] border-[var(--color-border)] opacity-80 cursor-grab active:cursor-grabbing hover-target pointer-events-auto"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="absolute bottom-[25%] right-[15%] w-24 h-24 bg-[var(--color-accent-purple)] border-[3px] border-[var(--color-border)] rounded-full opacity-80 cursor-grab active:cursor-grabbing hover-target pointer-events-auto"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      <div className="container relative z-10 text-center flex flex-col items-center">
        <motion.div 
          initial={{ rotate: 5, scale: 0.9 }}
          animate={{ rotate: [ 5, -5, 5 ], scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mb-8"
        >
          <span className="inline-block text-6xl md:text-8xl font-black px-8 py-4 text-[var(--color-surface)] bg-[var(--color-text)] border-[4px] border-[var(--color-text)] shadow-[8px_8px_0px_var(--color-secondary)]">
            OOPS!
          </span>
        </motion.div>

        <h1
          className="mb-6 text-3xl md:text-5xl font-extrabold"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          <span className="neo-highlight">Something went wrong</span>
        </h1>

        <p className="text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed text-[var(--color-text-secondary)]">
          An unexpected error occurred in the matrix. Don't panic, it's probably not your fault.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="neo-btn neo-btn-primary neo-btn-lg text-lg px-8 py-4"
          >
            Try Again ↻
          </button>
          <Link
            href="/"
            className="neo-btn neo-btn-secondary neo-btn-lg text-lg px-8 py-4"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

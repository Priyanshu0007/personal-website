"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="section relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      {/* Decorative glassmorphism orbs */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden="true"
      >
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="hover-target pointer-events-auto absolute top-[20%] right-[20%] h-24 w-24 cursor-grab rounded-full bg-primary/30 backdrop-blur-md border border-primary/20 shadow-lg active:cursor-grabbing"
          animate={{ y: ["0%", "-10%", "0%"], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="hover-target pointer-events-auto absolute bottom-[20%] left-[20%] h-16 w-16 cursor-grab rounded-full bg-secondary/30 backdrop-blur-md border border-secondary/20 shadow-lg active:cursor-grabbing"
          animate={{ y: ["0%", "-15%", "0%"], scale: [1, 1.08, 1] }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1,
          }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      <div className="relative z-10 container flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block glass-card px-8 py-4 text-8xl font-black md:text-9xl">
            404
          </span>
        </motion.div>

        <h1
          className="mb-6 text-4xl font-extrabold md:text-5xl"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          <span className="glass-highlight">Lost in the Void</span>
        </h1>

        <p className="mb-10 max-w-2xl text-xl leading-relaxed text-text-secondary md:text-2xl">
          The page you are looking for has been moved, deleted, or possibly
          never existed in this dimension.
        </p>

        <Link
          href="/"
          scroll={false}
          aria-label="Return to the home page"
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #0071e3cc, #0071e388)",
            boxShadow: "0 0 0 1px rgba(0,113,227,0.4), 0 8px 24px rgba(0,113,227,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span>← Back to Reality</span>
          <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

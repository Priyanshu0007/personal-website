"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="section relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Decorative shapes */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="absolute top-[20%] right-[20%] w-24 h-24 bg-[var(--color-primary)] border-[3px] border-[var(--color-border)] opacity-80 cursor-grab active:cursor-grabbing hover-target pointer-events-auto"
          animate={{ y: ["0%", "-10%", "0%"], rotate: [12, 16, 12] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="absolute bottom-[20%] left-[20%] w-16 h-16 bg-[var(--color-secondary)] border-[3px] border-[var(--color-border)] rounded-full opacity-80 cursor-grab active:cursor-grabbing hover-target pointer-events-auto"
          animate={{ y: ["0%", "-15%", "0%"], rotate: [-3, -6, -3] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      <div className="container relative z-10 text-center flex flex-col items-center">
        <motion.div 
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: [ -5, 5, -5 ], scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mb-8"
        >
          <span className="inline-block text-8xl md:text-9xl font-black px-8 py-4 text-[var(--color-surface)] bg-[var(--color-text)] border-[4px] border-[var(--color-text)] shadow-[8px_8px_0px_var(--color-primary)]">
            404
          </span>
        </motion.div>

        <h1
          className="mb-6 text-4xl md:text-5xl font-extrabold"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          <span className="neo-highlight">Lost in the Void</span>
        </h1>

        <p className="text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed text-[var(--color-text-secondary)]">
          The page you are looking for has been moved, deleted, or possibly never existed in this dimension.
        </p>

        <Link
          href="/"
          className="neo-btn neo-btn-primary neo-btn-lg text-lg px-8 py-4"
          scroll={false}
        >
          ← Back to Reality
        </Link>
      </div>
    </div>
  );
}

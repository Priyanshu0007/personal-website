"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
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
          className="hover-target pointer-events-auto absolute top-[20%] right-[20%] h-24 w-24 cursor-grab border-[3px] border-[var(--color-border)] bg-[var(--color-primary)] opacity-80 active:cursor-grabbing"
          animate={{ y: ["0%", "-10%", "0%"], rotate: [12, 16, 12] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="hover-target pointer-events-auto absolute bottom-[20%] left-[20%] h-16 w-16 cursor-grab rounded-full border-[3px] border-[var(--color-border)] bg-[var(--color-secondary)] opacity-80 active:cursor-grabbing"
          animate={{ y: ["0%", "-15%", "0%"], rotate: [-3, -6, -3] }}
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
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: [-5, 5, -5], scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mb-8"
        >
          <span className="inline-block border-[4px] border-[var(--color-text)] bg-[var(--color-text)] px-8 py-4 text-8xl font-black text-[var(--color-surface)] shadow-[8px_8px_0px_var(--color-primary)] md:text-9xl">
            404
          </span>
        </motion.div>

        <h1
          className="mb-6 text-4xl font-extrabold md:text-5xl"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          <span className="neo-highlight">Lost in the Void</span>
        </h1>

        <p className="mb-10 max-w-2xl text-xl leading-relaxed text-[var(--color-text-secondary)] md:text-2xl">
          The page you are looking for has been moved, deleted, or possibly
          never existed in this dimension.
        </p>

        <Link
          href="/"
          className="neo-btn neo-btn-primary neo-btn-lg px-8 py-4 text-lg"
          scroll={false}
          aria-label="Return to the home page"
        >
          ← Back to Reality
        </Link>
      </div>
    </div>
  );
}

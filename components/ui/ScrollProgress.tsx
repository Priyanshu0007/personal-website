"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 right-0 h-[6px] bg-[var(--color-primary)] origin-left z-[90] border-b-[2px] border-[var(--color-border)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

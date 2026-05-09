"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[90] hidden h-[6px] origin-left border-b-[2px] border-[var(--color-border)] bg-[var(--color-primary)] md:block"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

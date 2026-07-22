"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="bg-primary fixed top-0 right-0 left-0 z-[90] hidden h-[6px] origin-left md:block"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

"use client";

import { motion } from "framer-motion";

export default function HeroShapes() {
  return (
    <div className="hidden md:block">
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="absolute top-20 right-[10%] w-16 h-16 md:w-24 md:h-24 bg-[var(--color-primary)] border-[3px] border-[var(--color-border)] opacity-60 cursor-grab active:cursor-grabbing hover-target"
        animate={{
          y: ["0%", "-10%", "0%"],
          rotate: [12, 16, 12],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        whileHover={{ scale: 1.1 }}
      />
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="absolute top-40 left-[5%] w-10 h-10 md:w-16 md:h-16 bg-[var(--color-secondary)] border-[3px] border-[var(--color-border)] rounded-full opacity-50 cursor-grab active:cursor-grabbing hover-target"
        animate={{
          y: ["0%", "-15%", "0%"],
          rotate: [-3, -6, -3],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
        whileHover={{ scale: 1.1 }}
      />
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="absolute bottom-20 right-[20%] w-12 h-12 md:w-20 md:h-20 bg-[var(--color-tertiary)] border-[3px] border-[var(--color-border)] opacity-40 cursor-grab active:cursor-grabbing hover-target"
        animate={{
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        whileHover={{ scale: 1.1 }}
      />
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="absolute bottom-40 left-[15%] w-8 h-8 bg-[var(--color-accent-green)] border-[3px] border-[var(--color-border)] opacity-50 cursor-grab active:cursor-grabbing hover-target"
        animate={{
          y: ["0%", "-20%", "0%"],
          rotate: [45, 55, 45],
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        }}
        whileHover={{ scale: 1.1 }}
      />
    </div>
  );
}

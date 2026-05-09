"use client";

import { motion } from "framer-motion";

export default function HeroShapes() {
  return (
    <div className="hidden md:block">
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="hover-target absolute top-20 right-[10%] h-16 w-16 cursor-grab border-[3px] border-[var(--color-border)] bg-[var(--color-primary)] opacity-60 active:cursor-grabbing md:h-24 md:w-24"
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
        className="hover-target absolute top-40 left-[5%] h-10 w-10 cursor-grab rounded-full border-[3px] border-[var(--color-border)] bg-[var(--color-secondary)] opacity-50 active:cursor-grabbing md:h-16 md:w-16"
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
        className="hover-target absolute right-[20%] bottom-20 h-12 w-12 cursor-grab border-[3px] border-[var(--color-border)] bg-[var(--color-tertiary)] opacity-40 active:cursor-grabbing md:h-20 md:w-20"
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
        className="hover-target absolute bottom-40 left-[15%] h-8 w-8 cursor-grab border-[3px] border-[var(--color-border)] bg-[var(--color-accent-green)] opacity-50 active:cursor-grabbing"
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

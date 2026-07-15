"use client";

import { motion } from "framer-motion";

export default function HeroShapes() {
  return (
    <div className="hidden md:block" aria-hidden="true">
      {/* Glassmorphism floating orbs instead of neobrutalism squares */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="hover-target absolute top-20 right-[10%] h-20 w-20 cursor-grab rounded-full bg-primary/30 backdrop-blur-md border border-primary/20 shadow-lg active:cursor-grabbing md:h-28 md:w-28"
        animate={{
          y: ["0%", "-10%", "0%"],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        whileHover={{ scale: 1.1 }}
        style={{ filter: "blur(1px)" }}
      />
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="hover-target absolute top-40 left-[5%] h-12 w-12 cursor-grab rounded-full bg-secondary/30 backdrop-blur-md border border-secondary/20 shadow-lg active:cursor-grabbing md:h-20 md:w-20"
        animate={{
          y: ["0%", "-15%", "0%"],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
        whileHover={{ scale: 1.1 }}
        style={{ filter: "blur(1px)" }}
      />
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="hover-target absolute right-[20%] bottom-20 h-16 w-16 cursor-grab rounded-full bg-tertiary/25 backdrop-blur-md border border-tertiary/20 shadow-lg active:cursor-grabbing md:h-24 md:w-24"
        animate={{
          scale: [1, 1.06, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        whileHover={{ scale: 1.1 }}
        style={{ filter: "blur(1px)" }}
      />
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        className="hover-target absolute bottom-40 left-[15%] h-10 w-10 cursor-grab rounded-full bg-accent-green/30 backdrop-blur-md border border-accent-green/20 shadow-lg active:cursor-grabbing"
        animate={{
          y: ["0%", "-20%", "0%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        }}
        whileHover={{ scale: 1.15 }}
        style={{ filter: "blur(1px)" }}
      />
    </div>
  );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundOrbs() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-float ${
          isDark ? "bg-primary/30" : "bg-primary/20"
        }`}
      />
      <div 
        className={`absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-float-delayed ${
          isDark ? "bg-accent-purple/30" : "bg-accent-purple/20"
        }`}
      />
      <div 
        className={`absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-float ${
          isDark ? "bg-secondary/20" : "bg-secondary/15"
        }`}
      />
    </div>
  );
}

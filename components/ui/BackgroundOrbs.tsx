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
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <div
        className={`animate-float absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full opacity-70 mix-blend-multiply blur-[120px] filter ${
          isDark ? "bg-primary/30" : "bg-primary/20"
        }`}
      />
      <div
        className={`animate-float-delayed absolute top-[20%] right-[-10%] h-[35%] w-[35%] rounded-full opacity-70 mix-blend-multiply blur-[120px] filter ${
          isDark ? "bg-accent-purple/30" : "bg-accent-purple/20"
        }`}
      />
      <div
        className={`animate-float absolute bottom-[-10%] left-[20%] h-[45%] w-[45%] rounded-full opacity-60 mix-blend-multiply blur-[120px] filter ${
          isDark ? "bg-secondary/20" : "bg-secondary/15"
        }`}
      />
    </div>
  );
}

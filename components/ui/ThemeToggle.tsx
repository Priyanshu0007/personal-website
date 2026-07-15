"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <div className="h-[42px] w-[42px]" />; // Placeholder to avoid layout shift
  }

  return (
    <button
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        trackUserAction(AnalyticsEvents.THEME_TOGGLE, { new_theme: newTheme });
      }}
      className="glass-btn glass-btn-secondary flex h-11 w-11 items-center justify-center rounded-none p-2 md:h-10 md:w-10"
      aria-label="Toggle Theme"
      id="theme-toggle"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

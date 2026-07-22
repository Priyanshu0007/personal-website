"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const defaultClassName =
    "flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-surface/50 transition-colors hover:bg-text hover:text-surface";
  const btnClassName = className || defaultClassName;

  if (!mounted) {
    return (
      <button className={btnClassName} aria-hidden="true" disabled>
        <div className="h-[18px] w-[18px] opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        trackUserAction(AnalyticsEvents.THEME_TOGGLE, { new_theme: newTheme });
      }}
      className={btnClassName}
      aria-label="Toggle Theme"
      id="theme-toggle"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

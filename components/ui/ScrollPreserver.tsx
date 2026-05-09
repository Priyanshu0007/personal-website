"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollPreserver() {
  const pathname = usePathname();

  // Determine if the current path is a list page that should preserve scroll
  const isScrollPreservedPage = pathname === "/" || pathname === "/projects";

  // Save scroll position on scroll
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }

    if (!isScrollPreservedPage) return;

    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isScrollPreservedPage]);

  // Restore scroll position on mount/navigation synchronously
  useLayoutEffect(() => {
    // Temporarily disable smooth scrolling on html element to ensure 'instant' works
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = "auto";

    if (isScrollPreservedPage) {
      const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedScroll) {
        window.scrollTo({
          top: parseInt(savedScroll, 10),
          behavior: "instant",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }
    } else {
      // For detail pages or unvisited preserved pages, start at the top
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }

    // Restore smooth scrolling after the layout effect and paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        htmlElement.style.scrollBehavior = originalScrollBehavior;
      });
    });
  }, [pathname, isScrollPreservedPage]);

  return null;
}

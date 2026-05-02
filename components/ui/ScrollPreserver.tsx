"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollPreserver() {
  const pathname = usePathname();

  // Determine if the current path is a list page that should preserve scroll
  const isScrollPreservedPage = pathname === "/" || pathname === "/projects";

  // Save scroll position on scroll
  useEffect(() => {
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
  // This MUST use useLayoutEffect so it runs before the browser takes the new View Transition snapshot.
  useLayoutEffect(() => {
    if (isScrollPreservedPage) {
      const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedScroll) {
        window.scrollTo({
          top: parseInt(savedScroll, 10),
          behavior: "instant",
        });
        return;
      }
    }
    
    // For detail pages or unvisited preserved pages, start at the top
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname, isScrollPreservedPage]);

  return null;
}

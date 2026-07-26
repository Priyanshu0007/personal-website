"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";
import type { NavItem } from "@/types";
import { Home, Briefcase, FileText, Laptop, FileBadge, Menu, X } from "lucide-react";

interface NavbarProps {
  name: string;
  shortName: string;
  navigation: NavItem[];
  socials: {
    github: string;
    linkedin: string;
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" strokeWidth={2.25} />,
  Projects: <Briefcase className="h-5 w-5" strokeWidth={2.25} />,
  Blogs: <FileText className="h-5 w-5" strokeWidth={2.25} />,
  Uses: <Laptop className="h-5 w-5" strokeWidth={2.25} />,
  Resume: <FileBadge className="h-5 w-5" strokeWidth={2.25} />,
};

const navTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.8,
} as const;

export default function Navbar({
  name,
  shortName,
  navigation,
  socials,
}: NavbarProps) {
  const pathname = usePathname();
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(380);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Prevent background scrolling when mobile navigation drawer is toggled open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleResize = () => {
      // 32px is parent horizontal padding (px-4 = 16px * 2)
      setWindowWidth(Math.min(380, window.innerWidth - 32));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if scrolled past threshold
    setIsScrolled(latest > 20);

    // Always expand at the very top of the page
    if (latest < 30) {
      setIsScrolledDown(false);
      lastScrollY.current = latest;
      return;
    }

    const diff = latest - lastScrollY.current;

    // A threshold of 10px to prevent jitter
    if (Math.abs(diff) > 10) {
      setIsScrolledDown(diff > 0);
      lastScrollY.current = latest;
    }
  });

  return (
    <>
      {/* ===================== DESKTOP NAVBAR ===================== */}
      <header
        className={`fixed left-1/2 z-50 hidden -translate-x-1/2 transition-all duration-300 md:block ${
          isScrolled ? "top-3 w-[82%] max-w-4xl" : "top-6 w-[92%] max-w-5xl"
        }`}
      >
        <nav
          className={`bg-surface/60 rounded-full border border-white/20 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 dark:border-white/10 ${
            isScrolled ? "px-4" : "px-6"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-12" : "h-16"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
              id="nav-logo-desktop"
              aria-label={`Home - ${name}`}
            >
              <span
                className={`border-border/30 bg-primary flex items-center justify-center rounded-full border font-extrabold text-white transition-all group-hover:scale-105 group-hover:shadow-md ${
                  isScrolled ? "h-8 w-8 text-sm" : "h-10 w-10 text-lg"
                }`}
                aria-hidden="true"
              >
                {shortName}
              </span>
              <span
                className={`font-extrabold tracking-tight transition-all duration-300 ${
                  isScrolled ? "text-sm" : "text-base"
                }`}
              >
                {name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-1" role="menubar">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    id={`nav-${item.label.toLowerCase()}-desktop`}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() =>
                      trackUserAction(AnalyticsEvents.NAV_LINK_CLICK, {
                        link_name: item.label,
                        destination: item.href,
                      })
                    }
                    prefetch={true}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "hover:bg-text/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Social icons */}
              <div className="border-border/20 ml-3 flex items-center gap-2 border-l pl-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border-border/20 bg-surface/50 hover:bg-text hover:text-surface flex items-center justify-center rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isScrolled ? "h-8 w-8" : "h-9 w-9"
                  }`}
                  aria-label="Visit GitHub Profile"
                  onClick={() =>
                    trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, {
                      platform: "github",
                    })
                  }
                >
                  <GitHubIcon
                    aria-hidden="true"
                    className={`transition-all duration-300 ${
                      isScrolled ? "h-4 w-4" : "h-4.5 w-4.5"
                    }`}
                  />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border-border/20 bg-surface/50 flex items-center justify-center rounded-full border transition-all hover:bg-[#0077B5] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isScrolled ? "h-8 w-8" : "h-9 w-9"
                  }`}
                  aria-label="Visit LinkedIn Profile"
                  onClick={() =>
                    trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, {
                      platform: "linkedin",
                    })
                  }
                >
                  <LinkedInIcon
                    aria-hidden="true"
                    className={`transition-all duration-300 ${
                      isScrolled ? "h-4 w-4" : "h-4.5 w-4.5"
                    }`}
                  />
                </a>
                <ThemeToggle
                  className={`border-border/20 bg-surface/50 hover:bg-text hover:text-surface flex items-center justify-center rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isScrolled ? "h-8 w-8" : "h-9 w-9"
                  }`}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ===================== MOBILE NAVBAR ===================== */}
      {/* Mobile Top Header (Floating Logo, Menu Toggle & Theme Toggle) */}
      <div className="pointer-events-none fixed top-4 right-4 left-4 z-50 flex items-center justify-between md:hidden">
        <Link
          href="/"
          className="group pointer-events-auto flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          id="nav-logo-mobile"
          aria-label={`Home - ${name}`}
        >
          <span
            className="bg-surface/80 text-primary flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-extrabold shadow-lg backdrop-blur-xl transition-all group-hover:scale-105"
            aria-hidden="true"
          >
            {shortName}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            className="bg-surface/80 text-text pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 shadow-lg backdrop-blur-xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button> */}
          <ThemeToggle className="bg-surface/80 text-text pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 shadow-lg backdrop-blur-xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black/60 p-6 pt-24 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-3">
              <span className="text-text-muted text-xs font-bold uppercase tracking-wider px-2">
                Navigation
              </span>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      trackUserAction(AnalyticsEvents.NAV_LINK_CLICK, {
                        link_name: item.label,
                        destination: item.href,
                        is_mobile_drawer: true,
                      });
                    }}
                    className={`flex items-center gap-3 rounded-2xl p-3.5 text-base font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "bg-surface/40 text-text hover:bg-surface/70"
                    }`}
                  >
                    {iconMap[item.label] || <FileText className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-4 pb-20">
              <span className="text-text-muted text-xs font-bold uppercase tracking-wider px-2">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface/50 border border-white/20 hover:bg-text hover:text-surface flex flex-1 items-center justify-center gap-2 rounded-2xl p-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() =>
                    trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, {
                      platform: "github",
                    })
                  }
                >
                  <GitHubIcon className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface/50 border border-white/20 hover:bg-[#0077B5] hover:text-white flex flex-1 items-center justify-center gap-2 rounded-2xl p-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() =>
                    trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, {
                      platform: "linkedin",
                    })
                  }
                >
                  <LinkedInIcon className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Bottom Tab Bar */}
      <div className="pointer-events-none fixed right-0 bottom-6 left-0 z-50 flex justify-center px-4 md:hidden">
        <motion.nav
          animate={{
            width: isScrolledDown ? 230 : windowWidth,
            height: isScrolledDown ? 54 : 64,
            paddingLeft: isScrolledDown ? 6 : 12,
            paddingRight: isScrolledDown ? 6 : 12,
          }}
          transition={navTransition}
          className="bg-surface/70 pointer-events-auto flex items-center justify-between rounded-full border border-white/20 py-1 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10"
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`nav-${item.label.toLowerCase()}-mobile`}
                onClick={() =>
                  trackUserAction(AnalyticsEvents.NAV_LINK_CLICK, {
                    link_name: item.label,
                    destination: item.href,
                    is_mobile: true,
                  })
                }
                prefetch={true}
                className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                        mass: 0.6,
                      }}
                      className="bg-primary/10 dark:bg-primary/20 absolute inset-x-1.5 inset-y-1 -z-10 rounded-full"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex h-full w-full flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      y: isActive ? -2 : 0,
                      color: isActive
                        ? "var(--color-primary)"
                        : "var(--color-text-secondary)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    {iconMap[item.label] || <FileText className="h-5 w-5" />}
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isScrolledDown ? 0 : 1,
                      height: isScrolledDown ? 0 : 14,
                      scale: isScrolledDown ? 0 : 1,
                      y: isScrolledDown ? 4 : 0,
                      marginTop: isScrolledDown ? 0 : 4,
                    }}
                    transition={{
                      ...navTransition,
                      delay: isScrolledDown ? 0 : 0.1,
                    }}
                    className="block w-full overflow-hidden px-1 text-center text-[10px] font-bold tracking-wide whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              </Link>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

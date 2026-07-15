"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { usePathname } from "next/navigation";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";
import type { NavItem } from "@/types";
import { Home, Briefcase, FileText, Laptop, FileBadge } from "lucide-react";

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
  Home: <Home className="h-[22px] w-[22px]" strokeWidth={2.5} />,
  Projects: <Briefcase className="h-[22px] w-[22px]" strokeWidth={2.5} />,
  Blogs: <FileText className="h-[22px] w-[22px]" strokeWidth={2.5} />,
  Uses: <Laptop className="h-[22px] w-[22px]" strokeWidth={2.5} />,
  Resume: <FileBadge className="h-[22px] w-[22px]" strokeWidth={2.5} />,
};

export default function Navbar({
  name,
  shortName,
  navigation,
  socials,
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ===================== DESKTOP NAVBAR ===================== */}
      <header className="hidden md:block fixed top-6 left-1/2 z-50 w-[92%] max-w-5xl -translate-x-1/2 transition-all duration-300">
        <nav className="rounded-full border border-white/20 dark:border-white/10 bg-surface/60 px-6 shadow-2xl backdrop-blur-2xl backdrop-saturate-150">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2"
              id="nav-logo-desktop"
              aria-label={`Home - ${name}`}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-primary text-white text-lg font-extrabold transition-all group-hover:scale-105 group-hover:shadow-md"
                aria-hidden="true"
              >
                {shortName}
              </span>
              <span className="text-base font-extrabold tracking-tight">
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
                    onClick={() => trackUserAction(AnalyticsEvents.NAV_LINK_CLICK, { link_name: item.label, destination: item.href })}
                    prefetch={true}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
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
              <div className="ml-3 flex items-center gap-2 border-l border-border/20 pl-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-surface/50 transition-colors hover:bg-text hover:text-surface"
                  aria-label="Visit GitHub Profile"
                  onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "github" })}
                >
                  <GitHubIcon aria-hidden="true" className="h-4.5 w-4.5" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-surface/50 transition-colors hover:bg-[#0077B5] hover:text-white"
                  aria-label="Visit LinkedIn Profile"
                  onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "linkedin" })}
                >
                  <LinkedInIcon aria-hidden="true" className="h-4.5 w-4.5" />
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ===================== MOBILE NAVBAR ===================== */}
      {/* Mobile Top Header (Floating Logo & Theme Toggle) */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between md:hidden pointer-events-none">
        <Link
          href="/"
          className="group flex items-center gap-2 pointer-events-auto"
          id="nav-logo-mobile"
          aria-label={`Home - ${name}`}
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-surface/80 backdrop-blur-xl shadow-lg text-primary text-sm font-extrabold transition-all group-hover:scale-105"
            aria-hidden="true"
          >
            {shortName}
          </span>
        </Link>

        <div className="pointer-events-auto shadow-lg rounded-full border border-white/20 bg-surface/80 backdrop-blur-xl">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Floating Bottom Tab Bar */}
      <nav className="fixed bottom-6 left-1/2 z-50 flex w-[96%] sm:w-[92%] max-w-md -translate-x-1/2 items-center justify-around rounded-full border border-white/20 dark:border-white/10 bg-surface/70 px-2 py-1 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 md:hidden">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              id={`nav-${item.label.toLowerCase()}-mobile`}
              onClick={() => trackUserAction(AnalyticsEvents.NAV_LINK_CLICK, { link_name: item.label, destination: item.href, is_mobile: true })}
              prefetch={true}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-1.5 transition-colors ${
                isActive ? "text-primary" : "text-text-muted hover:text-text"
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}>
                {iconMap[item.label] || <FileText className="h-5 w-5" />}
              </div>
              <span className="text-[10px] font-bold tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

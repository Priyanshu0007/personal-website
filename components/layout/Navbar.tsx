"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { usePathname } from "next/navigation";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";
import type { NavItem } from "@/types";

interface NavbarProps {
  name: string;
  shortName: string;
  navigation: NavItem[];
  socials: {
    github: string;
    linkedin: string;
  };
}

export default function Navbar({
  name,
  shortName,
  navigation,
  socials,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[92%] max-w-5xl -translate-x-1/2 transition-all duration-300">
      <nav className="rounded-full border border-border/20 bg-surface/85 px-4 shadow-lg backdrop-blur-xl md:px-6">
        <div className="flex h-14 items-center justify-between md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            id="nav-logo"
            aria-label={`Home - ${name}`}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/30 bg-primary text-white text-base font-extrabold transition-all group-hover:scale-105 group-hover:shadow-md md:h-10 md:w-10 md:text-lg"
              aria-hidden="true"
            >
              {shortName}
            </span>
            <span className="hidden text-sm font-extrabold tracking-tight sm:block md:text-base">
              {name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex" role="menubar">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  id={`nav-${item.label.toLowerCase()}`}
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
                id="nav-github"
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
                id="nav-linkedin"
              >
                <LinkedInIcon aria-hidden="true" className="h-4.5 w-4.5" />
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center rounded-full border border-border/20 bg-surface transition-colors hover:bg-primary md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            id="nav-mobile-toggle"
          >
            <span
              className={`block h-0.5 w-4 bg-text transition-transform ${
                mobileOpen ? "translate-y-1 rotate-45" : ""
              }`}
              aria-hidden="true"
            />
            <span
              className={`my-1 block h-0.5 w-4 bg-text transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
              aria-hidden="true"
            />
            <span
              className={`block h-0.5 w-4 bg-text transition-transform ${
                mobileOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="absolute top-16 left-0 right-0 mt-2 rounded-2xl border border-border/20 bg-surface/95 p-4 shadow-lg backdrop-blur-xl md:hidden animate-slide-in-up"
            role="menu"
          >
            <div className="flex flex-col gap-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setMobileOpen(false);
                      trackUserAction(AnalyticsEvents.NAV_LINK_CLICK, { link_name: item.label, destination: item.href, is_mobile: true });
                    }}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    prefetch={true}
                    className={`rounded-xl border px-4 py-3 text-base font-bold tracking-wider uppercase transition-all ${
                      isActive
                        ? "border-primary/30 bg-primary text-white shadow-md"
                        : "border-border/20 bg-surface hover:bg-bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile social links */}
              <div className="mt-2 flex gap-2 border-t border-border/10 pt-2">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn-secondary glass-btn-sm flex-1"
                  onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "github", is_mobile: true })}
                  aria-label="Visit GitHub Profile"
                >
                  <GitHubIcon aria-hidden="true" /> GitHub
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn-secondary glass-btn-sm flex-1"
                  onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "linkedin", is_mobile: true })}
                  aria-label="Visit LinkedIn Profile"
                >
                  <LinkedInIcon aria-hidden="true" /> LinkedIn
                </a>
              </div>
              <div className="mt-2 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
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

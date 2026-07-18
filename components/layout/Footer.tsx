"use client";

import Link from "next/link";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";

interface FooterProps {
  name: string;
  socials: {
    github: string;
    linkedin: string;
    medium: string;
    devto: string;
  };
}

export default function Footer({ name, socials }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mb-6 mt-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/30 bg-surface/60 p-8 shadow-lg backdrop-blur-xl md:p-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left: Branding */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight"
              id="footer-logo"
              aria-label={`Home - ${name}`}
            >
              {name}
            </Link>
            <p className="text-sm text-text-muted">
              Building bold digital experiences.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={() => trackUserAction(AnalyticsEvents.FOOTER_LINK_CLICK, { link_name: "Home", destination: "/" })}
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-secondary"
            >
              Home
            </Link>
            <span className="text-border/50" aria-hidden="true">
              •
            </span>
            <Link
              href="/projects"
              onClick={() => trackUserAction(AnalyticsEvents.FOOTER_LINK_CLICK, { link_name: "Projects", destination: "/projects" })}
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-secondary"
            >
              Projects
            </Link>
            <span className="text-border/50" aria-hidden="true">
              •
            </span>
            <Link
              href="/uses"
              onClick={() => trackUserAction(AnalyticsEvents.FOOTER_LINK_CLICK, { link_name: "Uses", destination: "/uses" })}
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-secondary"
            >
              Uses
            </Link>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-border-glow flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-surface/40 backdrop-blur-md transition-all hover:bg-surface/80"
              style={{ "--glow-color": "var(--color-text)" } as React.CSSProperties}
              aria-label="Visit GitHub Profile"
              onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "github", location: "footer" })}
              id="footer-github"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-border-glow flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-surface/40 backdrop-blur-md transition-all hover:bg-surface/80 hover:text-[#0077B5]"
              style={{ "--glow-color": "#0077B5" } as React.CSSProperties}
              aria-label="Visit LinkedIn Profile"
              onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "linkedin", location: "footer" })}
              id="footer-linkedin"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-border-glow flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-surface/40 backdrop-blur-md transition-all hover:bg-surface/80 hover:text-[#00ab6c]"
              style={{ "--glow-color": "#00ab6c" } as React.CSSProperties}
              aria-label="Visit Medium Profile"
              onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "medium", location: "footer" })}
              id="footer-medium"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </a>
            <a
              href={socials.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-border-glow flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-surface/40 backdrop-blur-md transition-all hover:bg-surface/80"
              style={{ "--glow-color": "var(--color-text)" } as React.CSSProperties}
              aria-label="Visit Dev.to Profile"
              onClick={() => trackUserAction(AnalyticsEvents.SOCIAL_LINK_CLICK, { platform: "devto", location: "footer" })}
              id="footer-devto"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-1.52.02v1.81h2.55v1.36h-4.08V8.5h4V9.83zm4.7 4.95c-.65.46-1.58.65-2.26.46-.83-.23-1.05-.62-1.93-3.41l-.4-1.25H15.4l.65 1.63c.4 1 1 2.52 1.09 2.52.08 0 .28-.53.58-1.5.3-1 .85-2.67.85-2.65h1.54l-1.5 4.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-6 sm:flex-row">
          <p className="text-sm text-text-muted">
            © {currentYear} {name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-text-muted">
            Built with{" "}
            <span
              className="inline-flex animate-pulse items-center text-secondary"
              role="img"
              aria-label="love"
            >
              ❤️
            </span>{" "}
            using Next.js & React
          </p>
        </div>
      </div>
    </footer>
  );
}

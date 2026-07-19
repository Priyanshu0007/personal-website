"use client";

import { useState } from "react";
import { Download, Link2, Check } from "lucide-react";

interface ResumeActionsProps {
  resumeUrl: string;
}

export default function ResumeActions({ resumeUrl }: ResumeActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (!resumeUrl) return;
    try {
      await navigator.clipboard.writeText(resumeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!resumeUrl) return;

    // For cross-origin URLs, the `download` attribute is often ignored by browsers.
    // To force a direct download, we fetch the file as a blob and create a local URL.
    e.preventDefault();
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "Priyanshu_Gupta_Resume.pdf";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(
        "Failed to download via fetch, falling back to new tab",
        err
      );
      window.open(resumeUrl, "_blank");
    }
  };

  if (!resumeUrl) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
      <a
        href={resumeUrl}
        onClick={handleDownload}
        className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
        style={{
          background: "linear-gradient(135deg, #0071e3cc, #0071e388)",
          boxShadow: "0 0 0 1px rgba(0,113,227,0.4), 0 8px 24px rgba(0,113,227,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Download className="h-4 w-4 shrink-0" />
        <span>Download Resume</span>
        <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
      </a>
      <button
        onClick={handleCopyLink}
        className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-6 py-3.5 text-base font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
          color: "var(--color-text)",
        }}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 shrink-0 text-green-400" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
            <span>Copy Link</span>
          </>
        )}
        <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/5 transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
      </button>
    </div>
  );
}

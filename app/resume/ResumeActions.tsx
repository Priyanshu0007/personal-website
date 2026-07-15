"use client";

import { useState } from "react";

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
        className="glass-btn glass-btn-primary"
      >
        <span role="img" aria-label="Download" className="mr-1">
          📥
        </span>{" "}
        Download Resume
      </a>
      <button onClick={handleCopyLink} className="glass-btn glass-btn-secondary">
        {copied ? (
          <>
            <span role="img" aria-label="Check" className="mr-1">
              ✅
            </span>{" "}
            Copied!
          </>
        ) : (
          <>
            <span role="img" aria-label="Link" className="mr-1">
              🔗
            </span>{" "}
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}

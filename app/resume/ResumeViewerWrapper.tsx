"use client";

import dynamic from "next/dynamic";

const ResumeViewer = dynamic(() => import("./ResumeViewer"), { ssr: false });

export default function ResumeViewerWrapper({
  resumeUrl,
}: {
  resumeUrl: string;
}) {
  return <ResumeViewer resumeUrl={resumeUrl} />;
}

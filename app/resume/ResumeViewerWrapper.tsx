"use client";

import dynamic from "next/dynamic";

function ResumeViewerSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface/50 rounded-xl p-8 animate-pulse">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-text-muted text-sm font-semibold tracking-wide uppercase">
        Loading PDF Engine & Plugins...
      </p>
    </div>
  );
}

const ResumeViewer = dynamic(() => import("./ResumeViewer"), {
  ssr: false,
  loading: () => <ResumeViewerSkeleton />,
});

export default function ResumeViewerWrapper({
  resumeUrl,
}: {
  resumeUrl: string;
}) {
  return <ResumeViewer resumeUrl={resumeUrl} />;
}


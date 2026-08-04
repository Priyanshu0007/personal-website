"use client";

import dynamic from "next/dynamic";

function ResumeViewerSkeleton() {
  return (
    <div className="bg-surface/50 flex h-full w-full animate-pulse flex-col items-center justify-center gap-4 rounded-xl p-8">
      <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
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

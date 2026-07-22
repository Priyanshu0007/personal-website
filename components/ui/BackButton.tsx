"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-text-muted hover:text-secondary mb-8 inline-flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-sm font-bold tracking-wider uppercase transition-colors"
      id="project-back"
      aria-label="Go back"
    >
      <span aria-hidden="true">←</span> Back
    </button>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors cursor-pointer bg-transparent border-none p-0"
      id="project-back"
    >
      ← Back
    </button>
  );
}

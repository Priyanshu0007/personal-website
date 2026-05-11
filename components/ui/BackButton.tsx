"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-8 inline-flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-sm font-bold tracking-wider text-text-muted uppercase transition-colors hover:text-secondary"
      id="project-back"
      aria-label="Go back"
    >
      <span aria-hidden="true">←</span> Back
    </button>
  );
}

"use client";

import dynamic from "next/dynamic";
import ScrollPreserver from "@/components/ui/ScrollPreserver";

const NoiseOverlay = dynamic(() => import("@/components/ui/NoiseOverlay"), {
  ssr: false,
});
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), {
  ssr: false,
});

export default function ClientEnhancements() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <ScrollPreserver />
    </>
  );
}

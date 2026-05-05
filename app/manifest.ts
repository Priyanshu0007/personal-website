import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Priyanshu Gupta — Full-Stack Developer & Mobile App Engineer",
    short_name: "Priyanshu Gupta",
    description:
      "Portfolio of Priyanshu Gupta — Full-stack developer specializing in React, Next.js, and React Native. Building beautiful projects and sharing thoughts through articles and blogs.",
    start_url: "/",
    display: "standalone",
    background_color: "#E0E7FF",
    theme_color: "#3B82F6",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

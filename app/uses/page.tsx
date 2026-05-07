import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The tools, software, and hardware Priyanshu Gupta uses daily for development, design, and productivity — from VS Code to React Native.",
  openGraph: {
    title: "Uses | Priyanshu Gupta",
    description:
      "The tools, software, and hardware Priyanshu Gupta uses daily for development, design, and productivity.",
    type: "website",
  },
  alternates: {
    canonical: "/uses",
  },
};

const usesData = {
  development: {
    title: "Development",
    emoji: "⚡",
    color: "var(--color-primary)",
    items: [
      {
        name: "VS Code / Cursor",
        description:
          "My primary editors. Cursor for AI-powered development, VS Code for everything else.",
      },
      {
        name: "Next.js",
        description:
          "My go-to React framework. Server components, file-based routing, and incredible DX.",
      },
      {
        name: "React Native",
        description:
          "Building robust cross-platform mobile applications with native performance and a single codebase.",
      },
      {
        name: "TypeScript",
        description:
          "Can't imagine writing JavaScript without it. Type safety is non-negotiable.",
      },
      {
        name: "Tailwind CSS",
        description:
          "Utility-first CSS that makes styling fast and consistent across projects.",
      },
      {
        name: "Firebase",
        description:
          "Google's backend-as-a-service for real-time databases, authentication, and rapid cloud scaling.",
      },
      {
        name: "expo",
        description:
          "The ultimate workflow for React Native, offering powerful APIs and a seamless development experience.",
      },
    ],
  },
  ai: {
    title: "AI Tools",
    emoji: "🤖",
    color: "var(--color-accent-purple)",
    items: [
      {
        name: "Claude",
        description:
          "My favorite AI assistant. Incredible for coding, writing, and reasoning tasks.",
      },
      {
        name: "Cursor",
        description:
          "AI-first code editor. Tab completion and chat make coding feel like pair programming.",
      },
      {
        name: "Antigravity",
        description:
          "Next-level agentic coding. The future of how we build software.",
      },
    ],
  },
  design: {
    title: "Design",
    emoji: "🎨",
    color: "var(--color-secondary)",
    items: [
      {
        name: "Figma",
        description:
          "For UI/UX design, prototyping, and design system management.",
      },
      {
        name: "Claude Design",
        description:
          "Leveraging Claude Artifacts for rapid UI prototyping, component brainstorming, and AI-driven design iterations.",
      },
      {
        name: "Google Stitch",
        description:
          "AI-powered generative UI design tool for turning prompts and sketches into interactive high-fidelity prototypes.",
      },
    ],
  },
  // productivity: {
  //   title: "Productivity",
  //   emoji: "📋",
  //   color: "var(--color-tertiary)",
  //   items: [
  //     {
  //       name: "Notion",
  //       description:
  //         "Project planning, note-taking, and knowledge management.",
  //     },
  //     {
  //       name: "GitHub",
  //       description:
  //         "Version control, CI/CD, project management — the developer's home.",
  //     },
  //     {
  //       name: "Vercel",
  //       description:
  //         "Deployment platform for all my web projects. Preview deployments are a game-changer.",
  //     },
  //     {
  //       name: "Arc Browser",
  //       description:
  //         "The best browser for developers. Spaces, profiles, and beautiful design.",
  //     },
  //   ],
  // },
  gaming: {
    title: "Gaming",
    emoji: "🎮",
    color: "var(--color-accent-orange)",
    items: [
      {
        name: "BGMI",
        description:
          "Battle Royale on mobile. Nothing like a chicken dinner after a coding session.",
      },
      {
        name: "Genshin Impact",
        description:
          "Open world exploration and beautiful anime aesthetics. My comfort game.",
      },
      {
        name: "Brawl Stars",
        description:
          "Quick 3v3 matches when I need a short break between deployments.",
      },
      {
        name: "Clash of Clans",
        description:
          "Strategic base building. Been playing since forever.",
      },
    ],
  },
  fitness: {
    title: "Fitness",
    emoji: "💪",
    color: "var(--color-accent-green)",
    items: [
      {
        name: "HIIT",
        description:
          "HIIT classes that push limits. Workout and Strength are my favorites.",
      },
      {
        name: "Swimming",
        description:
          "The ultimate full-body workout. Also my go-to for stress relief.",
      },
      {
        name: "Cycling",
        description:
          "Urban exploration on two wheels. Great for cardio and clearing the mind.",
      },
    ],
  },
};

export default function UsesPage() {
  const sections = Object.values(usesData);

  return (

    <section className="section" id="uses-page">
      <div className="container">
        <SectionHeading
          title="What I Use"
          subtitle="The tools, apps, and gear that power my daily workflow — from code to cardio."
          accent="var(--color-accent-purple)"
        />

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="flex items-center justify-center w-10 h-10 text-xl border-[3px] border-[var(--color-border)]"
                  style={{ backgroundColor: section.color }}
                >
                  {section.emoji}
                </span>
                <h2
                  className="text-2xl font-extrabold"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  {section.title}
                </h2>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="neo-card-flat p-5 hover:bg-[var(--color-bg-secondary)] transition-colors"
                  >
                    <h3 className="font-extrabold text-base mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

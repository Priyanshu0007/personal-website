import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPersonalData } from "@/lib/data";

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
        name: "React Native & Expo",
        description:
          "My primary stack for building robust cross-platform mobile applications with native performance.",
      },
      {
        name: "React & Next.js",
        description:
          "My go-to frameworks for web development. Server components, routing, and incredible DX.",
      },
      {
        name: "TypeScript & JavaScript",
        description:
          "The core languages I use daily. Type safety with TypeScript is non-negotiable for large projects.",
      },
      {
        name: "Sentry",
        description:
          "Essential for error tracking and performance monitoring. Instrumental in reducing production app crashes.",
      },
      {
        name: "GrowthBook",
        description:
          "For feature flagging and A/B testing, enabling safe and controlled feature rollouts.",
      },
      {
        name: "Tailwind CSS",
        description:
          "Utility-first CSS that makes styling fast and consistent across web projects.",
      },
      {
        name: "Redux & Context API",
        description:
          "For managing complex global state across large-scale frontend applications.",
      },
    ],
  },
  ai: {
    title: "AI Tools",
    emoji: "🤖",
    color: "var(--color-accent-purple)",
    items: [
      {
        name: "Claude Code",
        description:
          "My favorite AI coding assistant. Incredible for reasoning through complex coding tasks directly in the terminal.",
      },
      {
        name: "Cursor",
        description:
          "AI-first code editor. Tab completion and chat make coding feel like pair programming.",
      },
      {
        name: "Antigravity",
        description:
          "Next-level agentic coding assistant that helps automate and accelerate feature delivery.",
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
        name: "Adobe Suite",
        description:
          "For advanced graphic design, photo manipulation, and creating high-quality visual assets.",
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
        description: "Strategic base building. Been playing since forever.",
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
  const personal = getPersonalData();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: personal.seo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Uses",
        item: `${personal.seo.siteUrl}/uses`,
      },
    ],
  };

  return (
    <section className="section" id="uses-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <SectionHeading
          title="What I Use"
          subtitle="The tools, apps, and gear that power my daily workflow — from code to cardio."
          accent="var(--color-accent-purple)"
          as="h1"
        />

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              {/* Section header */}
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center border-[3px] border-border text-xl"
                  style={{ backgroundColor: section.color }}
                  role="img"
                  aria-label={`${section.title} icon`}
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="neo-card-flat p-5 transition-colors hover:bg-bg-secondary"
                  >
                    <h3 className="mb-1 text-base font-extrabold">
                      {item.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
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

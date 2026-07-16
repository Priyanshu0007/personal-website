import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import {
  getLandingData,
  getFeaturedProjects,
  getPersonalData,
  getAllBlogs,
} from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import HobbyCard from "@/components/ui/HobbyCard";
import BlogCard from "@/components/ui/BlogCard";
import Marquee from "@/components/ui/Marquee";
import HeroShapes from "@/components/ui/HeroShapes";
import ContactForm from "@/components/ui/ContactForm";
import { envConfig } from "@/utils/envConfig";

// Revalidate every hour (3600 seconds) - ISR for incremental updates
export const revalidate = 3600;

async function FeaturedProjectsSection() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {featuredProjects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}

async function LatestBlogsSection() {
  const allBlogs = await getAllBlogs();
  const blogs = allBlogs.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {blogs.map((blog, i) => (
        <BlogCard key={blog.id} blog={blog} index={i} />
      ))}
    </div>
  );
}

export default async function Home() {
  const landing = getLandingData();
  const personal = getPersonalData();

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="section relative overflow-hidden pt-8 md:pt-32" id="hero">
        <HeroShapes />

        <div className="relative z-10 container">
          {/* Glass Workspace Panel */}
          <div className="glass-card glass-border-glow p-1 flex flex-col mx-auto max-w-5xl rounded-3xl" style={{ "--glow-color": "var(--color-primary)" } as React.CSSProperties}>
            {/* Fake Window Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/10 bg-surface/30 rounded-t-[1.4rem] backdrop-blur-md">
              <div className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <div className="ml-4 text-xs font-semibold text-text-muted/70 tracking-widest">
                priyanshu.tsx
              </div>
            </div>

            {/* Panel Body */}
            <div className="p-6 md:p-10 lg:p-12 flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="order-2 flex-1 lg:order-1">
                <div className="max-w-3xl">
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 border border-accent-green/30 bg-accent-green/10 backdrop-blur-xl px-3 py-1.5 rounded-full text-xs font-bold text-text shadow-sm uppercase tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                      </span>
                      Available for collaborations
                    </span>
                  </div>

                  <h1
                    className="mb-4 text-5xl md:text-7xl font-extrabold"
                    style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-purple">
                      {landing.hero.name}
                    </span>
                  </h1>

                  <p
                    className="mb-6 text-xl font-extrabold text-text md:text-2xl"
                    style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
                  >
                    {landing.hero.tagline}
                  </p>

                  <p className="mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
                    {landing.hero.description}
                  </p>

                  <div className="mb-10 flex max-w-2xl flex-wrap gap-2">
                    {landing.hero.roles.map((role, i) => {
                      const colors = [
                        "var(--color-primary)",
                        "var(--color-secondary)",
                        "var(--color-tertiary)",
                        "var(--color-accent-purple)",
                      ];
                      return (
                        <span
                          key={role}
                          className="glass-badge text-xs"
                          style={{ backgroundColor: colors[i % colors.length], color: "#ffffff" }}
                        >
                          {role}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={landing.hero.ctaPrimary.href}
                      className="glass-btn glass-btn-primary glass-btn-lg glass-sweep"
                      scroll={false}
                      id="hero-cta-primary"
                    >
                      {landing.hero.ctaPrimary.label} <span aria-hidden="true">→</span>
                    </Link>
                    <a
                      href={landing.hero.ctaSecondary.href}
                      className="glass-btn glass-btn-secondary glass-btn-lg glass-sweep"
                      id="hero-cta-secondary"
                    >
                      {landing.hero.ctaSecondary.label}
                    </a>
                  </div>
                </div>
              </div>

              {/* Profile Image Column */}
              <div className="order-1 w-full max-w-[280px] flex-shrink-0 lg:order-2 lg:max-w-[340px]">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent-purple rounded-[2rem] blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/20 bg-surface backdrop-blur-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={
                        envConfig.profilePicUrl ||
                        "https://cdn.statically.io/gh/Priyanshu0007/CDN@main/profile.png"
                      }
                      alt={`Profile picture of ${landing.hero.name}`}
                      width={828}
                      height={1079}
                      className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 340px, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT SECTION (BENTO GRID) ===================== */}
      <section className="section" id="about">
        <div className="container max-w-6xl">
          <SectionHeading
            title={landing.about.heading}
            subtitle="A quick intro to who I am and what I do."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            {/* Bento Card 1: Bio (Spans 3 cols on large) */}
            <div className="md:col-span-3 glass-card glass-border-glow p-6 md:p-8 flex flex-col justify-center relative overflow-hidden" style={{ "--glow-color": "var(--color-primary)" } as React.CSSProperties}>
              <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-xl font-extrabold mb-4">Hello World.</h3>
              <p className="mb-4 text-lg leading-relaxed text-text">
                {landing.about.bio}
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                {landing.about.bioExtended}
              </p>
            </div>

            {/* Bento Card 2: Metrics (Spans 1 col on large) */}
            <div className="md:col-span-1 glass-card glass-border-glow p-6 flex flex-col justify-between gap-6" style={{ "--glow-color": "var(--color-secondary)" } as React.CSSProperties}>
              {[
                { label: "Years Exp.", value: landing.about.experience.years, color: "var(--color-primary)" },
                { label: "Projects", value: landing.about.experience.projects, color: "var(--color-secondary)" },
                { label: "Technologies", value: landing.about.experience.technologies, color: "var(--color-tertiary)" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div
                    className="text-4xl font-black mb-1 bg-clip-text text-transparent transition-transform group-hover:scale-110 inline-block"
                    style={{ backgroundImage: `linear-gradient(135deg, ${stat.color}, #fff)` }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold tracking-wider text-text-muted uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bento Card 3: Philosophy (Spans 2 cols) */}
            <div className="md:col-span-2 glass-card glass-border-glow p-6 flex flex-col justify-center items-center text-center" style={{ "--glow-color": "var(--color-accent-purple)" } as React.CSSProperties}>
              <div className="text-4xl mb-4 opacity-50">✨</div>
              <p className="text-lg font-bold text-text italic">
                "Effective user of AI-assisted development tools to accelerate delivery and craft pixel-perfect experiences."
              </p>
            </div>

            {/* Bento Card 4: Tech Stack (Spans 2 cols) */}
            <div className="md:col-span-2 glass-card glass-border-glow p-6" style={{ "--glow-color": "var(--color-tertiary)" } as React.CSSProperties}>
              <h3 className="mb-4 text-sm font-extrabold tracking-wider text-text-muted uppercase flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-tertiary animate-pulse"></span>
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {landing.about.skills.map((skill) => (
                  <span
                    key={skill}
                    className="glass-badge glass-badge-outline text-[0.7rem] hover:bg-tertiary hover:text-white hover:border-tertiary cursor-default transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PROJECTS ===================== */}
      <section className="section" id="featured-projects">
        <div className="container">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of my recent work that I'm most proud of."
            accent="var(--color-secondary)"
          />

          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-[400px] w-full animate-pulse rounded-2xl border border-border/20 bg-surface"
                  />
                ))}
              </div>
            }
          >
            <FeaturedProjectsSection />
          </Suspense>

          {/* View All CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="glass-btn glass-btn-primary glass-btn-lg"
              transitionTypes={["nav-forward"]}
              scroll={false}
              id="view-all-projects"
              aria-label="View all projects in my portfolio"
            >
              View All Projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== LATEST BLOGS ===================== */}
      <section className="section" id="latest-blogs">
        <div className="container">
          <SectionHeading
            title="Writing & Thoughts"
            subtitle="My latest articles on development, design, and software engineering."
            accent="var(--color-tertiary)"
          />

          <Suspense
            fallback={
              <div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
                aria-hidden="true"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[300px] w-full animate-pulse rounded-2xl border border-border/20 bg-surface"
                  />
                ))}
              </div>
            }
          >
            <LatestBlogsSection />
          </Suspense>

          {/* View All CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/blogs"
              className="glass-btn glass-btn-primary glass-btn-lg"
              transitionTypes={["nav-forward"]}
              scroll={false}
              id="view-all-blogs"
              aria-label="View all articles in my blog"
            >
              View All Articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TECH STACK MARQUEE ===================== */}
      <Marquee items={landing.techStack} />

      {/* ===================== BEYOND CODE ===================== */}
      <section className="section" id="beyond-code">
        <div className="container">
          <SectionHeading
            title={landing.beyondCode.heading}
            subtitle={landing.beyondCode.subheading}
            accent="var(--color-accent-purple)"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {landing.beyondCode.hobbies.map((hobby, i) => (
              <HobbyCard key={hobby.title} hobby={hobby} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section className="section relative" id="contact">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[60%] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="container relative z-10 max-w-5xl">
          <SectionHeading
            title={landing.contact.heading}
            subtitle={landing.contact.subheading}
            accent="var(--color-secondary)"
            align="center"
          />

          <div className="glass-card glass-border-glow p-2 mt-8" style={{ "--glow-color": "var(--color-secondary)" } as React.CSSProperties}>
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-surface/50">
              {/* Contact Info (Left) */}
              <div className="p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-2">Let's Connect</h3>
                  <p className="text-text-secondary mb-8">
                    My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                  </p>
                  
                  <div className="space-y-4">
                    <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">💼</span>
                      <span className="font-bold">Connect on LinkedIn</span>
                    </a>
                    <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">🐙</span>
                      <span className="font-bold">Follow on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form (Right) */}
              <div className="p-8 lg:p-10 bg-surface/30 backdrop-blur-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

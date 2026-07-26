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
import { IMAGE_BLUR_DATA_URL } from "@/utils/constants";
import { ArrowRight, Mail } from "lucide-react";

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
      <section
        className="section relative overflow-hidden pt-8 md:pt-32"
        id="hero"
      >
        <HeroShapes />

        <div className="relative z-10 container">
          {/* Glass Workspace Panel */}
          <div
            className="glass-card glass-border-glow mx-auto flex max-w-5xl flex-col rounded-3xl p-1"
            style={
              { "--glow-color": "var(--color-primary)" } as React.CSSProperties
            }
          >
            {/* Fake Window Header */}
            <div className="border-border/10 bg-surface/30 flex items-center gap-2 rounded-t-[1.4rem] border-b px-4 py-3 backdrop-blur-md">
              <div className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <div className="text-text-muted/70 ml-4 text-xs font-semibold tracking-widest">
                priyanshu.tsx
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex flex-col items-center gap-12 p-6 md:p-10 lg:flex-row lg:gap-16 lg:p-12">
              <div className="order-2 flex-1 lg:order-1">
                <div className="max-w-3xl">
                  <div className="mb-6">
                    <span className="border-accent-green/30 bg-accent-green/10 text-text inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold tracking-wider uppercase shadow-sm backdrop-blur-xl">
                      <span className="relative flex h-2 w-2">
                        <span className="bg-accent-green absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                        <span className="bg-accent-green relative inline-flex h-2 w-2 rounded-full"></span>
                      </span>
                      Available for collaborations
                    </span>
                  </div>

                  <h1
                    className="mb-4 text-5xl font-extrabold md:text-7xl"
                    style={{
                      fontFamily: "var(--font-heading), system-ui, sans-serif",
                    }}
                  >
                    <span className="from-primary to-accent-purple bg-gradient-to-r bg-clip-text text-transparent">
                      {landing.hero.name}
                    </span>
                  </h1>

                  <p
                    className="text-text mb-6 text-xl font-extrabold md:text-2xl"
                    style={{
                      fontFamily: "var(--font-heading), system-ui, sans-serif",
                    }}
                  >
                    {landing.hero.tagline}
                  </p>

                  <p className="text-text-secondary mb-8 max-w-2xl text-lg leading-relaxed">
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
                      const bgColor = colors[i % colors.length];
                      const isYellow = bgColor === "var(--color-tertiary)";
                      return (
                        <span
                          key={role}
                          className="glass-badge text-xs"
                          style={{
                            backgroundColor: bgColor,
                            color: isYellow ? "#000000" : "#ffffff",
                          }}
                        >
                          {role}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={landing.hero.ctaPrimary.href}
                      scroll={false}
                      id="hero-cta-primary"
                      className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        background:
                          "linear-gradient(135deg, #0071e3cc, #0071e388)",
                        boxShadow:
                          "0 0 0 1px rgba(0,113,227,0.4), 0 8px 24px rgba(0,113,227,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <span>{landing.hero.ctaPrimary.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                      <span
                        className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
                        aria-hidden="true"
                      />
                    </Link>
                    <a
                      href={landing.hero.ctaSecondary.href}
                      id="hero-cta-secondary"
                      className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-6 py-3.5 text-base font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        borderColor: "rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(12px)",
                        boxShadow:
                          "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                        color: "var(--color-text)",
                      }}
                    >
                      <Mail className="h-4 w-4 shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                      <span>{landing.hero.ctaSecondary.label}</span>
                      <span
                        className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/5 transition-transform duration-500 group-hover:translate-x-full"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Profile Image Column */}
              <div className="order-1 w-full max-w-[280px] flex-shrink-0 lg:order-2 lg:max-w-[340px]">
                <div className="group relative">
                  <div className="from-primary to-accent-purple absolute inset-0 rounded-[2rem] bg-gradient-to-tr opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-60"></div>
                  <div className="bg-surface relative overflow-hidden rounded-[2rem] border-2 border-white/20 shadow-2xl backdrop-blur-2xl transition-transform duration-500 group-hover:scale-105">
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
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 340px"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR_DATA_URL}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:gap-6">
            {/* Bento Card 1: Bio (Spans 3 cols on large) */}
            <div
              className="glass-card glass-border-glow relative flex flex-col justify-center overflow-hidden p-6 md:col-span-3 md:p-8"
              style={
                {
                  "--glow-color": "var(--color-primary)",
                } as React.CSSProperties
              }
            >
              <div className="bg-primary/10 pointer-events-none absolute top-[-50%] left-[-10%] h-64 w-64 rounded-full blur-3xl"></div>
              <h3 className="mb-4 text-xl font-extrabold">Hello World.</h3>
              <p className="text-text mb-4 text-lg leading-relaxed">
                {landing.about.bio}
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                {landing.about.bioExtended}
              </p>
            </div>

            {/* Bento Card 2: Metrics (Spans 1 col on large) */}
            <div
              className="glass-card glass-border-glow flex flex-col justify-between gap-6 p-6 md:col-span-1"
              style={
                {
                  "--glow-color": "var(--color-secondary)",
                } as React.CSSProperties
              }
            >
              {[
                {
                  label: "Years Exp.",
                  value: landing.about.experience.years,
                  color: "var(--color-primary)",
                },
                {
                  label: "Projects",
                  value: landing.about.experience.projects,
                  color: "var(--color-secondary)",
                },
                {
                  label: "Technologies",
                  value: landing.about.experience.technologies,
                  color: "var(--color-tertiary)",
                },
              ].map((stat) => (
                <div key={stat.label} className="group text-center">
                  <div
                    className="mb-1 inline-block text-4xl font-black transition-transform group-hover:scale-110"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-xs font-bold tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bento Card 3: Philosophy (Spans 2 cols) */}
            <div
              className="glass-card glass-border-glow flex flex-col items-center justify-center p-6 text-center md:col-span-2"
              style={
                {
                  "--glow-color": "var(--color-accent-purple)",
                } as React.CSSProperties
              }
            >
              <div className="mb-4 text-4xl opacity-50">✨</div>
              <p className="text-text text-lg font-bold italic">
                &quot;Effective user of AI-assisted development tools to
                accelerate delivery and craft pixel-perfect experiences.&quot;
              </p>
            </div>

            {/* Bento Card 4: Tech Stack (Spans 2 cols) */}
            <div
              className="glass-card glass-border-glow p-6 md:col-span-2"
              style={
                {
                  "--glow-color": "var(--color-tertiary)",
                } as React.CSSProperties
              }
            >
              <h3 className="text-text-muted mb-4 flex items-center gap-2 text-sm font-extrabold tracking-wider uppercase">
                <span className="bg-tertiary h-2 w-2 animate-pulse rounded-full"></span>
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {landing.about.skills.map((skill) => (
                  <span
                    key={skill}
                    className="glass-badge glass-badge-outline hover:bg-tertiary hover:border-tertiary cursor-default text-[0.7rem] transition-colors hover:text-black"
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
                    className="border-border/20 bg-surface h-[400px] w-full animate-pulse rounded-2xl border"
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
              transitionTypes={["nav-forward"]}
              scroll={false}
              id="view-all-projects"
              aria-label="View all projects in my portfolio"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #0071e3cc, #0071e388)",
                boxShadow:
                  "0 0 0 1px rgba(0,113,227,0.4), 0 8px 24px rgba(0,113,227,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span
                className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
                aria-hidden="true"
              />
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
                    className="border-border/20 bg-surface h-[300px] w-full animate-pulse rounded-2xl border"
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
              transitionTypes={["nav-forward"]}
              scroll={false}
              id="view-all-blogs"
              aria-label="View all articles in my blog"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #0071e3cc, #0071e388)",
                boxShadow:
                  "0 0 0 1px rgba(0,113,227,0.4), 0 8px 24px rgba(0,113,227,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span>View All Articles</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span
                className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
                aria-hidden="true"
              />
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
            {landing.beyondCode.hobbies.map((hobby) => (
              <HobbyCard key={hobby.title} hobby={hobby} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section className="section relative" id="contact">
        <div className="bg-primary/20 pointer-events-none absolute top-1/2 left-1/2 z-0 h-[60%] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"></div>
        <div className="relative z-10 container max-w-5xl">
          <SectionHeading
            title={landing.contact.heading}
            subtitle={landing.contact.subheading}
            accent="var(--color-secondary)"
            align="center"
          />

          <div
            className="glass-card glass-border-glow mt-8 p-2"
            style={
              {
                "--glow-color": "var(--color-secondary)",
              } as React.CSSProperties
            }
          >
            <div className="bg-surface/50 grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2">
              {/* Contact Info (Left) */}
              <div className="border-border/10 relative flex flex-col justify-between overflow-hidden border-b p-8 md:border-r md:border-b-0 lg:p-10">
                <div className="bg-secondary/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-2xl"></div>
                <div>
                  <h3 className="mb-2 text-2xl font-extrabold">
                    Let&apos;s Connect
                  </h3>
                  <p className="text-text-secondary mb-8">
                    My inbox is always open. Whether you have a question or just
                    want to say hi, I&apos;ll try my best to get back to you!
                  </p>

                  <div className="space-y-4">
                    <a
                      href={personal.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-surface flex items-center gap-3 rounded-xl p-3 transition-colors"
                    >
                      <span className="bg-secondary/10 text-secondary flex h-10 w-10 items-center justify-center rounded-full">
                        💼
                      </span>
                      <span className="font-bold">Connect on LinkedIn</span>
                    </a>
                    <a
                      href={personal.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-surface flex items-center gap-3 rounded-xl p-3 transition-colors"
                    >
                      <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                        🐙
                      </span>
                      <span className="font-bold">Follow on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form (Right) */}
              <div className="bg-surface/30 p-8 backdrop-blur-sm lg:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

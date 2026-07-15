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
      <section className="section relative overflow-hidden" id="hero">
        {/* Decorative shapes */}
        <HeroShapes />

        <div className="relative z-10 container">
          <div className="flex flex-col items-center gap-12 py-4 md:py-8 lg:flex-row lg:gap-16">
            {/* Hero Text Content */}
            <div className="order-2 flex-1 lg:order-1">
              <div className="max-w-3xl">
                {/* Greeting */}
                <div className="mb-6 md:mb-8">
                  <span className="inline-block border border-border/30 bg-surface/80 backdrop-blur-xl px-4 py-1.5 rounded-full text-lg font-black text-text shadow-md md:text-xl">
                    {landing.hero.greeting}
                  </span>
                </div>

                {/* Name - Single H1 for SEO */}
                <h1
                  className="mb-4 text-5xl md:text-7xl"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  <span className="glass-highlight">{landing.hero.name}</span>
                </h1>

                {/* Tagline */}
                <p
                  className="mb-6 text-2xl font-extrabold text-text md:text-3xl"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  {landing.hero.tagline}
                </p>

                {/* Description */}
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
                  {landing.hero.description}
                </p>

                {/* Role badges */}
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
                        className="glass-badge text-sm"
                        style={{
                          backgroundColor: colors[i % colors.length],
                          color: "#ffffff",
                        }}
                      >
                        {role}
                      </span>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={landing.hero.ctaPrimary.href}
                    className="glass-btn glass-btn-primary glass-btn-lg"
                    scroll={false}
                    id="hero-cta-primary"
                  >
                    {landing.hero.ctaPrimary.label}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    href={landing.hero.ctaSecondary.href}
                    className="glass-btn glass-btn-secondary glass-btn-lg"
                    id="hero-cta-secondary"
                  >
                    {landing.hero.ctaSecondary.label}
                  </a>
                </div>

                {/* Social strip */}
                <div className="mt-10 flex items-center gap-4">
                  <span className="text-sm font-bold tracking-wider text-text-muted uppercase">
                    Find me on
                  </span>
                  <div
                    className="h-px w-8 bg-border"
                    aria-hidden="true"
                  />
                  <a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
                    aria-label="Visit GitHub Profile"
                  >
                    GitHub
                  </a>
                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold underline decoration-tertiary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
                    aria-label="Visit LinkedIn Profile"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 w-full max-w-[320px] flex-shrink-0 lg:order-2 lg:max-w-[380px]">
              <div className="group relative">
                {/* Glassmorphism image container */}
                <div className="relative overflow-hidden rounded-3xl border border-border/20 bg-surface/60 backdrop-blur-xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src={
                      envConfig.profilePicUrl ||
                      "https://cdn.statically.io/gh/Priyanshu0007/CDN@main/profile.png"
                    }
                    alt={`Profile picture of ${landing.hero.name}`}
                    width={828}
                    height={1079}
                    className="h-auto w-full object-cover grayscale transition-[filter] duration-500 lg:hover:grayscale-0"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 380px, 450px"
                  />
                </div>

                {/* Floating badge over image */}
                <div className="absolute -right-4 -bottom-4 border border-primary/30 bg-primary/20 backdrop-blur-xl rounded-xl px-4 py-2 text-sm font-black shadow-md">
                  HI THERE!{" "}
                  <span role="img" aria-label="Waving hand">
                    👋
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section
        className="section border-y border-border/10 bg-surface"
        id="about"
      >
        <div className="container">
          <SectionHeading
            title={landing.about.heading}
            subtitle="A quick intro to who I am and what I do."
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Bio */}
            <div className="lg:col-span-3">
              <p className="mb-4 text-lg leading-relaxed">
                {landing.about.bio}
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                {landing.about.bioExtended}
              </p>
            </div>

            {/* Stats & Skills */}
            <div className="space-y-6 lg:col-span-2">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
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
                  <div
                    key={stat.label}
                    className="glass-card-flat p-4 text-center"
                  >
                    <div
                      className="mb-1 text-2xl font-extrabold md:text-3xl"
                      style={{
                        fontFamily:
                          "var(--font-heading), system-ui, sans-serif",
                      }}
                    >
                      <span className="glass-highlight" style={{ backgroundColor: stat.color }}>
                        {stat.value}
                      </span>
                    </div>
                    <div className="text-xs font-bold tracking-wider text-text-muted uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h3 className="mb-3 text-sm font-extrabold tracking-wider text-text-muted uppercase">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {landing.about.skills.map((skill) => (
                    <span
                      key={skill}
                      className="glass-badge glass-badge-outline text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
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
      <section
        className="section border-y border-border/10 bg-surface"
        id="latest-blogs"
      >
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
      <section
        className="section border-y border-border/10 bg-surface"
        id="beyond-code"
      >
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
      <section className="section" id="contact">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              title={landing.contact.heading}
              subtitle={landing.contact.subheading}
              accent="var(--color-secondary)"
              align="center"
            />

            {/* Contact buttons */}
            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* <a
                href={`mailto:${landing.contact.email}`}
                className="glass-btn glass-btn-accent glass-btn-lg w-full sm:w-auto"
                id="contact-email"
              >
                ✉️ Send Email
              </a> */}
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn-secondary glass-btn-lg w-full sm:w-auto"
                id="contact-linkedin"
              >
                <span role="img" aria-label="Briefcase" className="mr-1">
                  💼
                </span>{" "}
                Connect on LinkedIn
              </a>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn-secondary glass-btn-lg w-full sm:w-auto"
                id="contact-github"
              >
                <span role="img" aria-label="Octocat" className="mr-1">
                  🐙
                </span>{" "}
                GitHub Profile
              </a>
            </div>

            {/* Or divider */}
            <div className="my-8 flex items-center gap-4" aria-hidden="true">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm font-extrabold tracking-wider text-text-muted uppercase">
                Or drop a message
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Simple contact form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

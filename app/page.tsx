import Link from "next/link";
import Image from "next/image";
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

export default async function Home() {
  const landing = getLandingData();
  const personal = getPersonalData();
  const featuredProjects = await getFeaturedProjects();
  const allBlogs = await getAllBlogs();
  const blogs = allBlogs.slice(0, 3);

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="section relative overflow-hidden" id="hero">
        {/* Decorative shapes */}
        <HeroShapes />

        <div className="relative z-10 container">
          {/* Mobile-only Header (above image) */}
          <div className="mb-10 pt-4 text-center lg:hidden">
            <div className="mb-4">
              <span className="inline-block -rotate-2 transform border-[3px] border-[var(--color-text)] bg-[var(--color-text)] px-4 py-1.5 text-lg font-black text-[var(--color-surface)] shadow-[4px_4px_0px_var(--color-primary)]">
                {landing.hero.greeting}
              </span>
            </div>
            <h1
              className="text-5xl font-extrabold"
              style={{
                fontFamily: "var(--font-heading), system-ui, sans-serif",
              }}
            >
              <span className="neo-highlight">{landing.hero.name}</span>
            </h1>
          </div>

          <div className="flex flex-col items-center gap-12 py-4 md:py-8 lg:flex-row lg:gap-16">
            {/* Hero Text Content */}
            <div className="order-2 flex-1 lg:order-1">
              <div className="max-w-3xl">
                {/* Greeting (Hidden on mobile as it's now at the top) */}
                <div className="mb-6 hidden md:mb-8 lg:block">
                  <span className="inline-block -rotate-2 transform border-[3px] border-[var(--color-text)] bg-[var(--color-text)] px-4 py-1.5 text-lg font-black text-[var(--color-surface)] shadow-[4px_4px_0px_var(--color-primary)] md:text-xl">
                    {landing.hero.greeting}
                  </span>
                </div>

                {/* Name (Hidden on mobile as it's now at the top) */}
                <h1
                  className="mb-4 hidden text-5xl md:text-7xl lg:block"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  <span className="neo-highlight">{landing.hero.name}</span>
                </h1>

                {/* Tagline */}
                <p
                  className="mb-6 text-2xl font-extrabold text-[var(--color-text)] md:text-4xl"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  {landing.hero.tagline}
                </p>

                {/* Description */}
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
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
                        className="neo-badge text-sm"
                        style={{
                          backgroundColor: colors[i % colors.length],
                          color: i === 0 ? "var(--color-text)" : "#FFFFFF",
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
                    className="neo-btn neo-btn-primary neo-btn-lg"
                    transitionTypes={["nav-forward"]}
                    scroll={false}
                    id="hero-cta-primary"
                  >
                    {landing.hero.ctaPrimary.label} →
                  </Link>
                  <a
                    href={landing.hero.ctaSecondary.href}
                    className="neo-btn neo-btn-secondary neo-btn-lg"
                    id="hero-cta-secondary"
                  >
                    {landing.hero.ctaSecondary.label}
                  </a>
                </div>

                {/* Social strip */}
                <div className="mt-10 flex items-center gap-4">
                  <span className="text-sm font-bold tracking-wider text-[var(--color-text-muted)] uppercase">
                    Find me on
                  </span>
                  <div className="h-[2px] w-8 bg-[var(--color-border)]" />
                  <a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold underline decoration-[var(--color-primary)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-secondary)]"
                  >
                    GitHub
                  </a>
                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold underline decoration-[var(--color-tertiary)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-secondary)]"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 w-full max-w-[320px] flex-shrink-0 lg:order-2 lg:max-w-[380px]">
              <div className="group relative">
                {/* Background shadow box */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 border-[3px] border-[var(--color-text)] bg-[var(--color-secondary)] transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />

                {/* Image container */}
                <div className="relative overflow-hidden border-[3px] border-[var(--color-text)] bg-[var(--color-surface)]">
                  <Image
                    src={
                      envConfig.profilePicUrl ||
                      "https://cdn.statically.io/gh/Priyanshu0007/CDN@main/profile.png"
                    }
                    alt={landing.hero.name}
                    width={400}
                    height={400}
                    className="h-auto w-full object-cover grayscale transition-[filter] duration-500 lg:hover:grayscale-0"
                    priority
                    sizes="(max-width: 768px) 320px, 400px"
                  />
                </div>

                {/* Floating badge over image */}
                <div className="absolute -right-4 -bottom-4 rotate-3 border-[3px] border-[var(--color-text)] bg-[var(--color-primary)] px-4 py-2 text-sm font-black shadow-[4px_4px_0px_var(--color-text)]">
                  HI THERE! 👋
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section
        className="section border-y-[3px] border-[var(--color-border)] bg-[var(--color-surface)]"
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
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
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
                    className="neo-card-flat p-4 text-center"
                  >
                    <div
                      className="mb-1 text-2xl font-extrabold md:text-3xl"
                      style={{
                        color: stat.color,
                        fontFamily:
                          "var(--font-heading), system-ui, sans-serif",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold tracking-wider text-[var(--color-text-muted)] uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h4 className="mb-3 text-sm font-extrabold tracking-wider text-[var(--color-text-muted)] uppercase">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {landing.about.skills.map((skill) => (
                    <span
                      key={skill}
                      className="neo-badge neo-badge-outline text-xs"
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* View All CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="neo-btn neo-btn-primary neo-btn-lg"
              transitionTypes={["nav-forward"]}
              scroll={false}
              id="view-all-projects"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== LATEST BLOGS ===================== */}
      <section
        className="section border-y-[3px] border-[var(--color-border)] bg-[var(--color-surface)]"
        id="latest-blogs"
      >
        <div className="container">
          <SectionHeading
            title="Writing & Thoughts"
            subtitle="My latest articles on development, design, and software engineering."
            accent="var(--color-tertiary)"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>

          {/* View All CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/blogs"
              className="neo-btn neo-btn-primary neo-btn-lg"
              transitionTypes={["nav-forward"]}
              scroll={false}
              id="view-all-blogs"
            >
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TECH STACK MARQUEE ===================== */}
      <Marquee items={landing.techStack} />

      {/* ===================== BEYOND CODE ===================== */}
      <section
        className="section border-y-[3px] border-[var(--color-border)] bg-[var(--color-surface)]"
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
                className="neo-btn neo-btn-accent neo-btn-lg w-full sm:w-auto"
                id="contact-email"
              >
                ✉️ Send Email
              </a> */}
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-secondary neo-btn-lg w-full sm:w-auto"
                id="contact-linkedin"
              >
                💼 Connect on LinkedIn
              </a>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-secondary neo-btn-lg w-full sm:w-auto"
                id="contact-github"
              >
                🐙 GitHub Profile
              </a>
            </div>

            {/* Or divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-[3px] flex-1 bg-[var(--color-border)]" />
              <span className="text-sm font-extrabold tracking-wider text-[var(--color-text-muted)] uppercase">
                Or drop a message
              </span>
              <div className="h-[3px] flex-1 bg-[var(--color-border)]" />
            </div>

            {/* Simple contact form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

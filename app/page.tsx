import Link from "next/link";
import { ViewTransition } from "react";
import { getLandingData, getFeaturedProjects, getPersonalData } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import HobbyCard from "@/components/ui/HobbyCard";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  const landing = getLandingData();
  const personal = getPersonalData();
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section
        className="section relative overflow-hidden"
        id="hero"
      >
        {/* Decorative shapes */}
        <div className="absolute top-20 right-[10%] w-16 h-16 md:w-24 md:h-24 bg-[var(--color-primary)] border-[3px] border-[var(--color-border)] rotate-12 animate-float opacity-60" />
        <div className="absolute top-40 left-[5%] w-10 h-10 md:w-16 md:h-16 bg-[var(--color-secondary)] border-[3px] border-[var(--color-border)] rounded-full animate-float-delayed opacity-50" />
        <div className="absolute bottom-20 right-[20%] w-12 h-12 md:w-20 md:h-20 bg-[var(--color-tertiary)] border-[3px] border-[var(--color-border)] animate-wiggle opacity-40" />
        <div className="absolute bottom-40 left-[15%] w-8 h-8 bg-[var(--color-accent-green)] border-[3px] border-[var(--color-border)] rotate-45 animate-float opacity-50" />

        <div className="container relative z-10">
          <div className="max-w-4xl">
            {/* Greeting */}
            <p className="text-lg md:text-xl font-bold mb-3 text-[var(--color-text-secondary)]">
              {landing.hero.greeting}
            </p>

            {/* Name */}
            <h1
              className="mb-4"
              style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
            >
              <span className="neo-highlight">{landing.hero.name}</span>
            </h1>

            {/* Tagline */}
            <p
              className="text-2xl md:text-4xl font-extrabold mb-6 text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
            >
              {landing.hero.tagline}
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed text-[var(--color-text-secondary)]">
              {landing.hero.description}
            </p>

            {/* Role badges */}
            <div className="flex flex-wrap gap-2 mb-10">
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
                      color:
                        i === 0 ? "var(--color-text)" : "#FFFFFF",
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
              <span className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                Find me on
              </span>
              <div className="h-[2px] w-8 bg-[var(--color-border)]" />
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold hover:text-[var(--color-secondary)] transition-colors underline underline-offset-4 decoration-2 decoration-[var(--color-primary)]"
              >
                GitHub
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold hover:text-[var(--color-secondary)] transition-colors underline underline-offset-4 decoration-2 decoration-[var(--color-tertiary)]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section className="section bg-[var(--color-surface)] border-y-[3px] border-[var(--color-border)]" id="about">
        <div className="container">
          <SectionHeading
            title={landing.about.heading}
            subtitle="A quick intro to who I am and what I do."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Bio */}
            <div className="lg:col-span-3">
              <p className="text-lg leading-relaxed mb-4">
                {landing.about.bio}
              </p>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                {landing.about.bioExtended}
              </p>
            </div>

            {/* Stats & Skills */}
            <div className="lg:col-span-2 space-y-6">
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
                    className="neo-card-flat text-center p-4"
                  >
                    <div
                      className="text-2xl md:text-3xl font-extrabold mb-1"
                      style={{
                        color: stat.color,
                        fontFamily: "var(--font-heading), system-ui, sans-serif",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-extrabold mb-3 text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {landing.about.skills.map((skill) => (
                    <span key={skill} className="neo-badge neo-badge-outline text-xs">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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

      {/* ===================== TECH STACK MARQUEE ===================== */}
      <Marquee items={landing.techStack} />

      {/* ===================== BEYOND CODE ===================== */}
      <section className="section bg-[var(--color-surface)] border-y-[3px] border-[var(--color-border)]" id="beyond-code">
        <div className="container">
          <SectionHeading
            title={landing.beyondCode.heading}
            subtitle={landing.beyondCode.subheading}
            accent="var(--color-accent-purple)"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {landing.beyondCode.hobbies.map((hobby, i) => (
              <HobbyCard key={hobby.title} hobby={hobby} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section className="section" id="contact">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              title={landing.contact.heading}
              subtitle={landing.contact.subheading}
              accent="var(--color-secondary)"
              align="center"
            />

            {/* Contact buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href={`mailto:${landing.contact.email}`}
                className="neo-btn neo-btn-accent neo-btn-lg w-full sm:w-auto"
                id="contact-email"
              >
                ✉ Send Email
              </a>
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
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-[3px] bg-[var(--color-border)]" />
              <span className="font-extrabold text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
                Or drop a message
              </span>
              <div className="flex-1 h-[3px] bg-[var(--color-border)]" />
            </div>

            {/* Simple contact form */}
            <form className="max-w-xl mx-auto space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-bold uppercase tracking-wider mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    className="neo-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email-input"
                    className="block text-sm font-bold uppercase tracking-wider mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email-input"
                    name="email"
                    placeholder="your@email.com"
                    className="neo-input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-bold uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project or just say hi..."
                  className="neo-textarea"
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="neo-btn neo-btn-primary neo-btn-lg w-full"
                id="contact-submit"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

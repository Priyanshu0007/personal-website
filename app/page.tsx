import Link from "next/link";
import Image from "next/image";
import { getLandingData, getFeaturedProjects, getPersonalData, getAllBlogs } from "@/lib/data";
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
      <section
        className="section relative overflow-hidden"
        id="hero"
      >
        {/* Decorative shapes */}
        <HeroShapes />

        <div className="container relative z-10">
          {/* Mobile-only Header (above image) */}
          <div className="lg:hidden text-center mb-10 pt-4">
            <div className="mb-4">
              <span className="inline-block text-lg font-black px-4 py-1.5 text-[var(--color-surface)] bg-[var(--color-text)] border-[3px] border-[var(--color-text)] shadow-[4px_4px_0px_var(--color-primary)] transform -rotate-2">
                {landing.hero.greeting}
              </span>
            </div>
            <h1
              className="text-5xl font-extrabold"
              style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
            >
              <span className="neo-highlight">{landing.hero.name}</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-4 md:py-8">
            {/* Hero Text Content */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="max-w-3xl">
                {/* Greeting (Hidden on mobile as it's now at the top) */}
                <div className="hidden lg:block mb-6 md:mb-8">
                  <span className="inline-block text-lg md:text-xl font-black px-4 py-1.5 text-[var(--color-surface)] bg-[var(--color-text)] border-[3px] border-[var(--color-text)] shadow-[4px_4px_0px_var(--color-primary)] transform -rotate-2">
                    {landing.hero.greeting}
                  </span>
                </div>

                {/* Name (Hidden on mobile as it's now at the top) */}
                <h1
                  className="hidden lg:block mb-4 text-5xl md:text-7xl"
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
                <div className="flex flex-wrap gap-2 mb-10 max-w-2xl">
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

            {/* Hero Image */}
            <div className="w-full max-w-[320px] lg:max-w-[380px] order-1 lg:order-2 flex-shrink-0">
              <div className="relative group">
                {/* Background shadow box */}
                <div className="absolute inset-0 bg-[var(--color-secondary)] translate-x-4 translate-y-4 border-[3px] border-[var(--color-text)] transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                
                {/* Image container */}
                <div className="relative border-[3px] border-[var(--color-text)] bg-[var(--color-surface)] overflow-hidden">
                  <Image
                    src={envConfig.profilePicUrl || "https://cdn.statically.io/gh/Priyanshu0007/CDN@main/profile.png"}
                    alt={landing.hero.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover grayscale lg:hover:grayscale-0 transition-[filter] duration-500"
                    priority
                    sizes="(max-width: 768px) 320px, 400px"
                  />
                </div>
                
                {/* Floating badge over image */}
                <div className="absolute -bottom-4 -right-4 bg-[var(--color-primary)] border-[3px] border-[var(--color-text)] px-4 py-2 font-black text-sm shadow-[4px_4px_0px_var(--color-text)] rotate-3">
                  HI THERE! 👋
                </div>
              </div>
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

      {/* ===================== LATEST BLOGS ===================== */}
      <section className="section bg-[var(--color-surface)] border-y-[3px] border-[var(--color-border)]" id="latest-blogs">
        <div className="container">
          <SectionHeading
            title="Writing & Thoughts"
            subtitle="My latest articles on development, design, and software engineering."
            accent="var(--color-tertiary)"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-[3px] bg-[var(--color-border)]" />
              <span className="font-extrabold text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
                Or drop a message
              </span>
              <div className="flex-1 h-[3px] bg-[var(--color-border)]" />
            </div>

            {/* Simple contact form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="section" id="project-not-found">
      <div className="container py-20 text-center">
        <div className="mb-6 inline-block">
          <span className="text-primary text-8xl font-extrabold md:text-9xl">
            404
          </span>
        </div>
        <h1
          className="mb-4 text-2xl font-extrabold md:text-3xl"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          Project Not Found
        </h1>
        <p className="text-text-secondary mx-auto mb-8 max-w-md text-lg">
          The project you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/projects"
          className="glass-btn glass-btn-primary glass-btn-lg"
          id="not-found-back"
        >
          ← Browse All Projects
        </Link>
      </div>
    </section>
  );
}

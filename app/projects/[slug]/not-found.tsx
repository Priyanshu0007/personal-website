import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="section" id="project-not-found">
      <div className="container py-20 text-center">
        <div className="mb-6 inline-block">
          <span className="text-8xl font-extrabold text-primary md:text-9xl">
            404
          </span>
        </div>
        <h1
          className="mb-4 text-2xl font-extrabold md:text-4xl"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          Project Not Found
        </h1>
        <p className="mx-auto mb-8 max-w-md text-lg text-text-secondary">
          The project you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/projects"
          className="neo-btn neo-btn-primary neo-btn-lg"
          id="not-found-back"
        >
          ← Browse All Projects
        </Link>
      </div>
    </section>
  );
}

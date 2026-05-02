import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="section" id="project-not-found">
      <div className="container text-center py-20">
        <div className="inline-block mb-6">
          <span className="text-8xl md:text-9xl font-extrabold text-[var(--color-primary)]">
            404
          </span>
        </div>
        <h1
          className="text-2xl md:text-4xl font-extrabold mb-4"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          Project Not Found
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
          The project you're looking for doesn't exist or has been removed.
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

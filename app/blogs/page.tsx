import { Metadata } from "next";
import { getPersonalData, getAllBlogs } from "@/lib/data";
import BlogCard from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read my latest articles, tutorials, and thoughts on software engineering and design.",
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();
  const personal = getPersonalData();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        {/* Page Header */}
        <div className="mb-12 md:mb-16">
          <div className="mb-4 inline-block">
            <span className="neo-badge neo-badge-primary inline-block -rotate-2 transform px-4 py-1.5 text-sm md:text-base">
              Writing & Thoughts
            </span>
          </div>

          <h1
            className="mb-6 text-4xl font-black md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
          >
            My <span className="text-[var(--color-secondary)]">Blogs</span>
          </h1>

          <p className="max-w-2xl border-l-[4px] border-[var(--color-primary)] py-2 pl-6 text-xl leading-relaxed text-[var(--color-text-secondary)]">
            A collection of articles, tutorials, and my thoughts on front-end
            development, animations, and software engineering.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        ) : (
          <div className="neo-card bg-[var(--color-surface)] p-12 text-center">
            <div className="mb-4 text-4xl">✍️</div>
            <h3 className="mb-2 text-2xl font-black">No Articles Yet</h3>
            <p className="text-[var(--color-text-secondary)]">
              I&apos;m working on some exciting new content. Check back soon!
            </p>
          </div>
        )}

        {/* Links to platforms */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg font-bold">Find more of my writing on:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={personal.socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-secondary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 inline-block"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
              Medium
            </a>
            <a
              href={personal.socials.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-secondary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 inline-block"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
              Dev.to
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

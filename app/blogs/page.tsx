import { Metadata } from "next";
import { getPersonalData, getAllBlogs } from "@/lib/data";
import BlogCard from "@/components/ui/BlogCard";

// Revalidate every hour (3600 seconds) - ISR for incremental updates
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read my latest articles, tutorials, and thoughts on software engineering and design.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs | Priyanshu Gupta",
    description:
      "Read my latest articles, tutorials, and thoughts on software engineering and design.",
    type: "website",
    url: "https://priyanshugupta.in/blogs",
    images: [
      {
        url: "https://priyanshugupta.in/og-blogs.png",
        width: 1200,
        height: 630,
        alt: "Priyanshu Gupta's Blog Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Priyanshu Gupta",
    description:
      "Read my latest articles, tutorials, and thoughts on software engineering and design.",
    images: ["https://priyanshugupta.in/og-blogs.png"],
  },
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();
  const personal = getPersonalData();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: personal.seo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${personal.seo.siteUrl}/blogs`,
      },
    ],
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
            My <span className="text-secondary">Blogs</span>
          </h1>

          <p className="max-w-2xl border-l-4 border-primary py-2 pl-6 text-xl leading-relaxed text-text-secondary">
            A collection of articles, tutorials, and my thoughts on front-end
            development, animations, and software engineering.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} as="h2" />
            ))}
          </div>
        ) : (
          <div className="neo-card bg-surface p-12 text-center">
            <div className="mb-4 text-4xl" role="img" aria-label="Writing">
              ✍️
            </div>
            <h2 className="mb-2 text-2xl font-black">No Articles Yet</h2>
            <p className="text-text-secondary">
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
              aria-label="Visit my Medium profile"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 inline-block"
                aria-hidden="true"
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
              aria-label="Visit my Dev.to profile"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 inline-block"
                aria-hidden="true"
              >
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-1.52.02v1.81h2.55v1.36h-4.08V8.5h4V9.83zm4.7 4.95c-.65.46-1.58.65-2.26.46-.83-.23-1.05-.62-1.93-3.41l-.4-1.25H15.4l.65 1.63c.4 1 1 2.52 1.09 2.52.08 0 .28-.53.58-1.5.3-1 .85-2.67.85-2.65h1.54l-1.5 4.2z" />
              </svg>
              Dev.to
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

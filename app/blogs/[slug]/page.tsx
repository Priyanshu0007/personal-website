import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogById, getAllBlogs, getPersonalData } from "@/lib/data";
import BackButton from "@/components/ui/BackButton";
import BlogCard from "@/components/ui/BlogCard";
import { ExternalLink } from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/utils/constants";

// Revalidate every hour (3600 seconds) - ISR for incremental updates
export const revalidate = 3600;

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogById(slug);
  if (!blog) return { title: "Blog Not Found" };

  const personal = getPersonalData();
  const canonicalUrl = `${personal.seo.siteUrl}/blogs/${slug}`;

  return {
    title: blog.title,
    description: blog.description,
    keywords: [
      blog.title,
      blog.platform,
      "Priyanshu Gupta",
      "software engineering blog",
    ],
    openGraph: {
      title: `${blog.title} | Priyanshu Gupta`,
      description: blog.description,
      type: "article",
      url: canonicalUrl,
      publishedTime: blog.date,
      images: blog.thumbnail ? [{ url: blog.thumbnail }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Priyanshu Gupta`,
      description: blog.description,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogById(slug);

  if (!blog) {
    notFound();
  }

  const personal = getPersonalData();
  const allBlogs = await getAllBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

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
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${personal.seo.siteUrl}/blogs/${slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: blog.thumbnail ? [blog.thumbnail] : [personal.seo.ogImage],
    datePublished: blog.date,
    author: {
      "@type": "Person",
      name: personal.name,
      url: personal.seo.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: personal.name,
      url: personal.seo.siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${personal.seo.siteUrl}/blogs/${slug}`,
    },
    url: blog.url,
  };

  return (
    <article className="min-h-screen pt-24 pb-16 md:pt-32" id="blog-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="container">
        <BackButton />

        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="glass-badge bg-primary/20 text-primary text-xs font-semibold px-3 py-1">
                {blog.platform}
              </span>
              <time className="text-text-muted text-sm font-medium">
                {blog.date}
              </time>
            </div>

            <h1
              className="text-3xl font-black md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
            >
              {blog.title}
            </h1>

            <p className="text-text-secondary text-lg md:text-xl leading-relaxed border-l-4 border-secondary pl-4">
              {blog.description}
            </p>
          </header>

          {/* Thumbnail Preview Banner */}
          {blog.thumbnail && (
            <div className="glass-card mb-10 overflow-hidden p-0 relative aspect-video w-full rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={blog.thumbnail}
                alt={`Hero image for article: ${blog.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1000px"
                priority
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
              />
            </div>
          )}

          {/* Action CTA Box */}
          <div className="glass-card bg-surface/60 mb-16 p-8 rounded-2xl border border-white/10 text-center">
            <h2
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
            >
              Read Full Article on {blog.platform}
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-6 text-sm md:text-base">
              This article was published on {blog.platform}. Click below to view the full interactive publication, comment, and engage.
            </p>

            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-base"
              id="read-external-blog-btn"
            >
              <span>Read on {blog.platform}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <section className="border-t border-white/10 pt-12">
              <h2
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
              >
                More <span className="text-secondary">Articles</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((b, idx) => (
                  <BlogCard key={b.id} blog={b} index={idx} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

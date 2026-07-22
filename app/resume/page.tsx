import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import ResumeViewer from "./ResumeViewerWrapper";
import ResumeActions from "./ResumeActions";
import { envConfig } from "@/utils/envConfig";
import { getPersonalData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "View Priyanshu Gupta's professional experience, skills, and resume.",
  openGraph: {
    title: "Resume | Priyanshu Gupta",
    description:
      "View Priyanshu Gupta's professional experience, skills, and resume.",
    type: "website",
  },
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  const resumeUrl = envConfig.resumeUrl;
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
        name: "Resume",
        item: `${personal.seo.siteUrl}/resume`,
      },
    ],
  };

  return (
    <>
      <section className="section" id="resume">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="container">
          <SectionHeading
            title="My Resume"
            subtitle="My professional experience and technical skills."
            accent="var(--color-primary)"
            as="h1"
          />

          <ResumeActions resumeUrl={resumeUrl} />

          <div
            className="glass-card glass-border-glow animate-float-delayed bg-surface relative mx-auto mb-16 aspect-[1/1.414] w-full max-w-4xl overflow-hidden p-2 sm:p-4"
            style={
              { "--glow-color": "var(--color-primary)" } as React.CSSProperties
            }
          >
            <ResumeViewer resumeUrl={resumeUrl} />
          </div>

          <div className="border-border/20 mx-auto mt-12 max-w-3xl border-t pt-12 text-center">
            <SectionHeading
              title="Get in Touch"
              subtitle="Have a question or want to work together? Leave a message!"
              accent="var(--color-secondary)"
              align="center"
            />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

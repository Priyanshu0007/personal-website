import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import ResumeViewer from "./ResumeViewer";
import ResumeActions from "./ResumeActions";
import { envConfig } from "@/utils/envConfig";

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

  return (
    <>
      <section className="section" id="resume">
        <div className="container">
          <SectionHeading
            title="My Resume"
            subtitle="My professional experience and technical skills."
            accent="var(--color-primary)"
            as="h1"
          />

          <ResumeActions resumeUrl={resumeUrl} />

          <div className="neo-card-flat relative mx-auto mb-16 aspect-[1/1.414] w-full max-w-4xl overflow-hidden bg-[var(--color-surface)] p-2 sm:p-4">
            <ResumeViewer resumeUrl={resumeUrl} />
          </div>

          <div className="mx-auto mt-12 max-w-3xl border-t-[3px] border-[var(--color-border)] pt-12 text-center">
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

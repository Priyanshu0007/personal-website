import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { getPersonalData } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollPreserver from "@/components/ui/ScrollPreserver";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const personal = getPersonalData();

export const metadata: Metadata = {
  title: {
    default: personal.seo.title,
    template: personal.seo.titleTemplate,
  },
  description: personal.seo.description,
  keywords: personal.seo.keywords,
  authors: [{ name: personal.name, url: personal.seo.siteUrl }],
  creator: personal.name,
  publisher: personal.name,
  metadataBase: new URL(personal.seo.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personal.seo.siteUrl,
    siteName: personal.name,
    title: personal.seo.title,
    description: personal.seo.description,
    images: [
      {
        url: personal.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${personal.name} — ${personal.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: personal.seo.title,
    description: personal.seo.description,
    creator: personal.seo.twitterHandle,
    images: [personal.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here after registering
    // google: "your-google-verification-code",
  },
};

// JSON-LD Structured Data
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: personal.seo.siteUrl,
  jobTitle: personal.title,
  description: personal.seo.description,
  sameAs: [
    personal.socials.github,
    personal.socials.linkedin,
    personal.socials.portfolio,
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Full-Stack Development",
    "Mobile App Development",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: personal.location,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: personal.name,
  url: personal.seo.siteUrl,
  description: personal.seo.description,
  author: {
    "@type": "Person",
    name: personal.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <NoiseOverlay />
          <ScrollProgress />
          <ScrollPreserver />
          <Navbar
            name={personal.name}
            shortName={personal.shortName}
            navigation={personal.navigation}
            socials={personal.socials}
          />
          <main className="flex-1">{children}</main>
          <Footer name={personal.name} socials={personal.socials} />
        </ThemeProvider>
      </body>
    </html>
  );
}


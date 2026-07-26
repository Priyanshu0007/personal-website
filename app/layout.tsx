import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { getPersonalData } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientEnhancements from "@/components/layout/ClientEnhancements";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import MsClarity from "@/components/MsClarity";
import BackgroundOrbs from "@/components/ui/BackgroundOrbs";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const personal = getPersonalData();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: personal.name,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
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
  manifest: "/manifest.json",
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
    personal.socials.medium,
    personal.socials.devto,
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
      className={`${outfit.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.statically.io" />
        <link rel="dns-prefetch" href="https://cdn.statically.io" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${personal.name}'s Blog RSS Feed`}
          href="/rss.xml"
        />
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
        className="flex min-h-full flex-col antialiased"
        style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
      >
        <a
          href="#main-content"
          className="focus:border-border/30 focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:border focus:px-4 focus:py-2 focus:font-bold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundOrbs />
          <Navbar
            name={personal.name}
            shortName={personal.shortName}
            navigation={personal.navigation}
            socials={personal.socials}
          />
          <main className="flex-1 pb-[5.5rem] md:pb-0" id="main-content">
            {children}
          </main>
          <Footer name={personal.name} socials={personal.socials} />
          <ClientEnhancements />
          <FirebaseAnalytics />
          <MsClarity />
        </ThemeProvider>
      </body>
    </html>
  );
}

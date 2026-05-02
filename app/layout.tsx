import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import { getPersonalData } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const personal = getPersonalData();

export const metadata: Metadata = {
  title: {
    default: personal.seo.title,
    template: personal.seo.titleTemplate,
  },
  description: personal.seo.description,
  metadataBase: new URL(personal.seo.siteUrl),
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
        alt: personal.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: personal.seo.title,
    description: personal.seo.description,
    images: [personal.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${syne.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
      >
        <Navbar
          name={personal.name}
          shortName={personal.shortName}
          navigation={personal.navigation}
          socials={personal.socials}
        />
        <main className="flex-1">{children}</main>
        <Footer name={personal.name} socials={personal.socials} />
      </body>
    </html>
  );
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: "react-js" | "react-native" | "next-js" | "other";
  techStack: string[];
  images: string[];
  thumbnail: string;
  liveUrl: string | null;
  githubUrl: string | null;
  isFavorite: boolean;
  featured: boolean;
  createdAt: string;
  highlights: string[];
  hide: boolean;
}

export interface Social {
  github: string;
  linkedin: string;
  portfolio: string;
  medium: string;
  devto: string;
}

export interface Blog {
  id: string;
  title: string;
  url: string;
  platform: string;
  date: string;
  description: string;
  thumbnail?: string;
  hide: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SEOConfig {
  title: string;
  titleTemplate: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle: string;
  keywords: string[];
}

export interface PersonalData {
  name: string;
  shortName: string;
  title: string;
  email: string;
  location: string;
  resumeUrl: string;
  socials: Social;
  navigation: NavItem[];
  seo: SEOConfig;
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  roles: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface Hobby {
  emoji: string;
  title: string;
  description: string;
  color: string;
  tags?: string[];
}

export interface AboutData {
  heading: string;
  bio: string;
  bioExtended: string;
  skills: string[];
  experience: {
    years: string;
    projects: string;
    technologies: string;
  };
}

export interface BeyondCodeData {
  heading: string;
  subheading: string;
  hobbies: Hobby[];
}

export interface ContactData {
  heading: string;
  subheading: string;
  email: string;
}

export interface LandingData {
  hero: HeroData;
  about: AboutData;
  beyondCode: BeyondCodeData;
  techStack: string[];
  contact: ContactData;
}

export type ProjectCategory = "all" | "react-js" | "react-native" | "next-js";
export type SortOrder = "newest" | "oldest";

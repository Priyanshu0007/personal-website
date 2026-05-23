# ✦ Priyanshu Gupta — Personal Portfolio

**A modern, neobrutalist developer portfolio built with Next.js 16, featuring a headless CMS, full analytics stack, and OTP-gated admin panel.**

[![Production](https://img.shields.io/badge/🚀_Production-priyanshu0007.vercel.app-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://priyanshu0007.vercel.app)
[![Development](https://img.shields.io/badge/🔧_Development-priyanshu0099.vercel.app-f59e0b?style=for-the-badge&logo=vercel&logoColor=white)](https://priyanshu0099.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)

---

[![Home Page Light](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-home.png)](https://priyanshu0007.vercel.app)

*Light mode home page — neobrutalist design with bold typography and geometric accents*

---

[![Home Page Dark](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-dark-home.png)](https://priyanshu0007.vercel.app)

*Dark mode — same layout with a rich, high-contrast dark palette*

---

## 📋 Table of Contents

- [Live URLs](#-live-urls)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Database Schema](#-database-schema)
- [Admin Panel](#-admin-panel)
- [Analytics](#-analytics)
- [SEO & Performance](#-seo--performance)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Database Setup](#-database-setup)
- [Seeding Data](#-seeding-data)
- [Scripts Reference](#-scripts-reference)
- [Design System](#-design-system)

---

## 🌐 Live URLs

| Environment | URL | Purpose |
|-------------|-----|---------|
| 🟢 **Production** | [priyanshu0007.vercel.app](https://priyanshu0007.vercel.app) | Public-facing live site |
| 🟡 **Development** | [priyanshu0099.vercel.app](https://priyanshu0099.vercel.app) | Preview / staging deployments |

---

## 📸 Screenshots

### 🏠 Home Page
[![Home Page](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-home.png)](https://priyanshu0007.vercel.app)

### 🌙 Dark Mode
[![Dark Mode](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-dark-home.png)](https://priyanshu0007.vercel.app)

### 🗂️ Projects Page
[![Projects](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-projects.png)](https://priyanshu0007.vercel.app/projects)

### 📝 Blogs Page
[![Blogs](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-blogs.png)](https://priyanshu0007.vercel.app/blogs)

### 📄 Resume Page
[![Resume](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-resume.png)](https://priyanshu0007.vercel.app/resume)

### 🔐 Admin Dashboard
[![Admin](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-admin.png)](https://priyanshu0007.vercel.app/admin)


---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Role |
|------------|---------|------|
| [Next.js](https://nextjs.org) | `16.2.4` | Full-stack React framework (App Router) |
| [React](https://react.dev) | `19.2.4` | UI library |
| [TypeScript](https://typescriptlang.org) | `5` | Type-safe JavaScript |

### Styling

| Technology | Version | Role |
|------------|---------|------|
| [Tailwind CSS](https://tailwindcss.com) | `4` | Utility-first CSS framework |
| [Framer Motion](https://framer-motion.com) | `12.38.0` | Animations & micro-interactions |
| [Lucide React](https://lucide.dev) | `1.14.0` | Icon system |
| Google Fonts | — | `Bricolage Grotesque` (headings) + `DM Sans` (body) |

### Database & ORM

| Technology | Version | Role |
|------------|---------|------|
| [Drizzle ORM](https://orm.drizzle.team) | `0.45.2` | Type-safe SQL query builder |
| [Neon DB](https://neon.tech) | Serverless PostgreSQL | Production database |
| [@neondatabase/serverless](https://github.com/neondatabase/serverless) | `1.1.0` | Edge-compatible Neon HTTP driver |
| [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) | `0.31.10` | Schema migrations & Drizzle Studio |

### Authentication

| Technology | Version | Role |
|------------|---------|------|
| [NextAuth.js](https://next-auth.js.org) | `^4.24.14` | Session & OTP authentication |
| [Resend](https://resend.com) | `6.12.2` | Transactional email for OTP delivery |
| [Zod](https://zod.dev) | `4.4.3` | Schema validation for forms & env vars |

### Analytics & Monitoring

| Technology | Role |
|------------|------|
| [Firebase Analytics](https://firebase.google.com/products/analytics) | Event-level user behavior tracking |
| [Microsoft Clarity](https://clarity.microsoft.com) | Session recording & heatmaps |

### PDF Rendering

| Technology | Version | Role |
|------------|---------|------|
| [@embedpdf/core](https://www.npmjs.com/package/@embedpdf/core) | `2.14.2` | Headless PDF engine |
| [@embedpdf/engines](https://www.npmjs.com/package/@embedpdf/engines) | `2.14.2` | WASM PDF rendering |
| Various EmbedPDF plugins | `2.14.2` | Scroll, zoom, viewport, render, document manager |

### CDN & Assets

| Service | Purpose |
|---------|---------|
| [jsDelivr](https://www.jsdelivr.com) | `cdn.jsdelivr.net` — screenshots & profile assets |
| [Statically](https://statically.io) | `cdn.statically.io` — additional media |

---

## 🏗️ Architecture Overview

```
Browser
   │
   ▼
Vercel Edge Network
   │
   ├── Next.js App Router (SSR / SSG / ISR)
   │     ├── Server Components (data fetching, metadata)
   │     ├── Client Components (interactivity, animations)
   │     └── Server Actions (admin CRUD, contact form)
   │
   ├── NextAuth Middleware (protects /admin route)
   │
   ├── Neon Serverless PostgreSQL
   │     ├── projects table
   │     ├── blogs table
   │     ├── allowed_admins table
   │     └── otps table (short-lived, TTL-based)
   │
   ├── Resend API (OTP email delivery)
   ├── Firebase Analytics (event tracking)
   └── Microsoft Clarity (session recordings)
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **App Router** | Enables RSCs for zero-JS data fetching + fine-grained streaming |
| **Neon Serverless** | HTTP-based driver works at Vercel Edge with no cold-start overhead |
| **Drizzle ORM** | Fully type-safe, zero-runtime overhead — schemas inferred directly from TS |
| **OTP over passwords** | Passwordless admin login reduces attack surface; OTPs are single-use & expire |
| **jsDelivr CDN** | GitHub-backed CDN for assets; globally cached, free, pinned by commit SHA |
| **Server Actions** | Form submissions never hit a REST endpoint — mutations are co-located with UI |

---

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   ├── page.tsx                  # Home page (hero, skills, projects, contact)
│   ├── globals.css               # Design tokens, Tailwind base styles
│   ├── manifest.ts               # PWA manifest
│   ├── sitemap.ts                # Dynamic XML sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── projects/
│   │   ├── page.tsx              # Projects listing with filters
│   │   └── [slug]/page.tsx       # Individual project detail + carousel
│   ├── blogs/page.tsx            # Blog listing (external links)
│   ├── resume/page.tsx           # Headless PDF viewer
│   ├── uses/page.tsx             # /uses page (tools & gear)
│   ├── admin/
│   │   ├── page.tsx              # Protected admin dashboard
│   │   └── login/page.tsx        # OTP login flow
│   └── api/
│       ├── auth/[...nextauth]/   # NextAuth handler
│       ├── blogs/                # Blog CRUD API routes
│       ├── home/                 # Home data API
│       └── projects/             # Project CRUD API routes
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive nav with mobile drawer
│   │   ├── Footer.tsx            # Social links, navigation, theme
│   │   └── ClientEnhancements.tsx# Scroll progress bar
│   ├── ui/
│   │   ├── ProjectCard.tsx       # Project grid card
│   │   ├── BlogCard.tsx          # Blog link card
│   │   ├── ScreenshotCarousel.tsx# Image carousel for project detail
│   │   ├── ProjectFilters.tsx    # Category filter tabs
│   │   ├── ContactForm.tsx       # Contact form with server action
│   │   ├── ThemeToggle.tsx       # Light/dark mode toggle
│   │   ├── ThemeProvider.tsx     # next-themes wrapper
│   │   ├── SectionHeading.tsx    # Reusable section header
│   │   ├── HeroShapes.tsx        # Animated geometric decorations
│   │   ├── Marquee.tsx           # Horizontal scrolling ticker
│   │   ├── ScrollProgress.tsx    # Page scroll progress indicator
│   │   ├── ScrollPreserver.tsx   # Maintains scroll on navigation
│   │   ├── HobbyCard.tsx         # Hobby display card
│   │   └── BackButton.tsx        # Browser-aware back navigation
│   ├── admin/
│   │   ├── AdminDashboardClient.tsx # Admin CRUD dashboard
│   │   ├── ProjectForm.tsx       # Create/edit project form
│   │   ├── BlogForm.tsx          # Create/edit blog form
│   │   └── LogoutButton.tsx      # Session logout
│   ├── FirebaseAnalytics.tsx     # GA client component
│   └── MsClarity.tsx             # Clarity client component
│
├── actions/
│   ├── admin.ts                  # Server actions: CRUD for projects & blogs
│   └── contact.ts                # Server action: contact form → Resend
│
├── db/
│   ├── index.ts                  # Drizzle + Neon connection
│   └── schema.ts                 # Table definitions & enums
│
├── lib/
│   ├── data.ts                   # Data access layer (typed DB queries)
│   ├── analytics.ts              # Typed event registry + dual-tracking helper
│   └── firebase.ts               # Firebase SDK initialization
│
├── data/
│   ├── personal.json             # Personal info, nav, socials, SEO config
│   └── landing.json              # Home page static content
│
├── types/                        # TypeScript type definitions
├── utils/
│   ├── envConfig.ts              # Centralized env variable access
│   └── formatters.ts            # URL sanitizers and formatters
│
├── middleware.ts                 # NextAuth route protection for /admin
├── drizzle.config.ts             # Drizzle Kit configuration
├── next.config.ts                # Next.js config (image domains)
├── seed-portfolio.ts             # DB seed script
└── .env.example                  # Environment variable template
```

---

## 🗺️ Pages & Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSR | Home — hero, tech stack marquee, featured projects, contact |
| `/projects` | SSR | All projects with category filters |
| `/projects/[slug]` | SSG+ISR | Project detail with screenshot carousel |
| `/blogs` | SSR | Blog posts linking to external platforms |
| `/resume` | Static | Headless PDF viewer |
| `/uses` | Static | Tools, hardware, and setup |
| `/admin` | SSR (protected) | Content management dashboard |
| `/admin/login` | Static | OTP email login |
| `/api/auth/[...nextauth]` | API | NextAuth session endpoints |
| `/sitemap.xml` | Dynamic | Auto-generated XML sitemap |
| `/robots.txt` | Dynamic | Crawl rules |
| `/manifest.json` | Dynamic | PWA manifest |

---

## 🗄️ Database Schema

### `projects`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial` PK | Auto-increment primary key |
| `slug` | `varchar(255)` UNIQUE | URL-friendly identifier |
| `title` | `varchar(255)` | Project name |
| `description` | `text` | Short summary |
| `long_description` | `text` | Full description |
| `category` | `enum` | `react-js` \| `react-native` \| `next-js` \| `other` |
| `tech_stack` | `jsonb` | Array of technology strings |
| `images` | `jsonb` | Array of screenshot URLs |
| `thumbnail` | `text` | Cover image URL |
| `live_url` | `text` | Live demo link (nullable) |
| `github_url` | `text` | Source code link (nullable) |
| `is_favorite` | `boolean` | Starred/highlighted project |
| `featured` | `boolean` | Show on home page |
| `created_at` | `varchar(50)` | Human-readable date string |
| `highlights` | `jsonb` | Array of key feature strings |
| `hide` | `boolean` | Soft-delete / visibility toggle |

### `blogs`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `varchar(255)` PK | Manual string ID |
| `title` | `varchar(255)` | Blog post title |
| `url` | `text` | External link to the post |
| `platform` | `varchar(100)` | Publishing platform name |
| `date` | `varchar(50)` | Publication date string |
| `description` | `text` | Short description |
| `hide` | `boolean` | Soft-delete / visibility toggle |

### `allowed_admins`

| Column | Type | Description |
|--------|------|-------------|
| `email` | `varchar(255)` PK | Authorized admin email |
| `name` | `varchar(255)` | Display name |

### `otps`

| Column | Type | Description |
|--------|------|-------------|
| `email` | `varchar(255)` | Target email address |
| `code` | `varchar(6)` | One-time 6-digit code |
| `expires_at` | `timestamp` | Expiry time (short-lived) |

---

## 🔐 Admin Panel

The admin panel is a **protected content management system** accessible only at `/admin`.

### Auth Flow

```
User visits /admin
     │
     ▼
NextAuth middleware checks session
     │
  No session?
     │
     ▼
Redirect → /admin/login
     │
User enters email
     │
Server checks allowed_admins table
     │
  Email allowed?
     │
     ▼
Generate 6-digit OTP → Store in otps table → Send via Resend
     │
User enters OTP
     │
Verify OTP (not expired, matches)
     │
     ▼
Create NextAuth session → Redirect → /admin
```

### Admin Capabilities

| Feature | Description |
|---------|-------------|
| **Create Project** | Full form with slug, title, description, tech stack, images, links |
| **Edit Project** | Pre-populated form, inline save |
| **Delete Project** | Soft-delete via `hide` flag or hard delete |
| **Create Blog** | Add blog title, URL, platform, date, description |
| **Edit Blog** | Update any blog entry |
| **Delete Blog** | Remove blog from listing |
| **Mobile-First UI** | Full-screen forms on mobile with browser back-button support |

---

## 📊 Analytics

The portfolio runs a **dual-analytics** setup for complete behavioral insight:

### Firebase Analytics
- **What**: Google Analytics 4 event tracking via Firebase SDK
- **Events tracked**: Page views, project views, blog views, contact form submits, resume downloads, carousel interactions, social link clicks, theme toggles, error events
- **Config**: `lib/firebase.ts`, `lib/analytics.ts`, `components/FirebaseAnalytics.tsx`

### Microsoft Clarity
- **What**: Session recordings, scroll maps, click heatmaps
- **Events tracked**: Mirrors Firebase events as custom Clarity tags
- **Config**: `components/MsClarity.tsx`, env var `NEXT_PUBLIC_CLARITY_PROJECT_ID`

### Typed Event Registry

All events are centrally defined in `lib/analytics.ts`:

```typescript
export const AnalyticsEvents = {
  NAV_LINK_CLICK: "nav_link_click",
  PROJECT_VIEW: "project_view",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  RESUME_DOWNLOAD: "resume_download",
  // ... 15+ events total
} as const;
```

---

## 🔍 SEO & Performance

| Feature | Implementation |
|---------|---------------|
| **Title templates** | `%s — Priyanshu Gupta` pattern via Next.js metadata API |
| **OpenGraph** | Full OG images, title, description per page |
| **Twitter cards** | `summary_large_image` card type |
| **JSON-LD** | `Person` + `WebSite` structured data in root layout |
| **Dynamic sitemap** | `/sitemap.xml` — auto-includes all project slugs |
| **robots.txt** | `/robots.txt` — allows all crawlers |
| **Canonical URLs** | Set via `alternates.canonical` in metadata |
| **Semantic HTML** | Proper `<main>`, `<nav>`, `<article>`, `<section>` usage |
| **Skip to content** | Accessible keyboard shortcut link |
| **PWA manifest** | `/manifest.json` — installable web app |
| **Font optimization** | `next/font` with `display: swap` for zero layout shift |
| **Image optimization** | `next/image` with CDN remote patterns |
| **DNS prefetch** | `statically.io` prefetched in `<head>` |

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `RESEND_API_KEY` | ✅ | API key from [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | ✅ | Verified sender email (or `onboarding@resend.dev`) |
| `CONTACT_EMAIL_TO` | ✅ | Where contact form submissions are delivered |
| `NEXTAUTH_SECRET` | ✅ | Random secret for NextAuth session signing |
| `NEXT_PUBLIC_PROFILE_PIC_URL` | ✅ | CDN URL to your profile picture |
| `NEXT_PUBLIC_RESUME_URL` | ✅ | CDN URL to your resume PDF |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | ✅ | Microsoft Clarity project ID |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ | Firebase project API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ | Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | ✅ | Firebase measurement/GA ID |

> All environment variables are centrally accessed through `utils/envConfig.ts` — never use `process.env` directly in app code.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 20`
- [Bun](https://bun.sh) (recommended) or npm
- A [Neon](https://neon.tech) PostgreSQL database
- A [Resend](https://resend.com) account

### Installation

```bash
# Clone the repository
git clone https://github.com/Priyanshu0007/portfolio.git
cd portfolio

# Install dependencies
bun install
# or
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values in .env

# Run the development server
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🗄️ Database Setup

### 1. Push the schema to Neon

```bash
bun run db:push
# or
npm run db:push
```

### 2. Inspect with Drizzle Studio

```bash
bun run db:studio
# or
npm run db:studio
```

### 3. Add yourself as an admin

Run this SQL in Neon console or Drizzle Studio:

```sql
INSERT INTO allowed_admins (email, name)
VALUES ('you@example.com', 'Your Name');
```

---

## 🌱 Seeding Data

A seed script is provided to insert the portfolio project with all CDN-hosted screenshots:

```bash
# Uses .env for DATABASE_URL automatically
set -a; source .env; set +a; npx tsx seed-portfolio.ts
```

The script is **idempotent** — re-running it will update the existing entry rather than create a duplicate.

---

## 📜 Scripts Reference

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server at `localhost:3000` |
| `bun run build` | Create production build |
| `bun start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run format` | Run Prettier on all files |
| `bun run db:push` | Push Drizzle schema to database |
| `bun run db:studio` | Open Drizzle Studio (visual DB explorer) |
| `bun run analyze` | Build with bundle analyzer (`ANALYZE=true`) |

---

## 🎨 Design System

The portfolio follows a **neobrutalist** aesthetic — bold borders, raw geometry, strong contrast, and deliberate imperfection.

### Typography

| Token | Font | Usage |
|-------|------|-------|
| `--font-heading` | Bricolage Grotesque | Page titles, section headings |
| `--font-body` | DM Sans | Body text, UI elements |

### Color Philosophy

- **Light mode**: Warm off-whites, electric blue primary, sharp black borders
- **Dark mode**: Deep charcoal backgrounds, cyan primary, maintained contrast ratios (WCAG AA+)
- All color tokens are defined as CSS custom properties in `globals.css`

### Motion

- Framer Motion powers all page transitions, card hovers, and carousel animations
- Micro-animations on interactive elements (buttons, cards, toggles)
- Scroll-driven animations for section reveals

### Accessibility

- WCAG 2.1 AA compliant contrast ratios
- Skip-to-content keyboard shortcut
- Full ARIA labeling on interactive components
- Screen-reader-friendly markup throughout

---

## 📦 Image CDN

All portfolio assets are served from **jsDelivr** backed by the [`Priyanshu0007/CDN`](https://github.com/Priyanshu0007/CDN) GitHub repository.

| Asset | CDN URL |
|-------|---------|
| Profile picture | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@.../profile.png` |
| Resume PDF | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@.../priyanshugutpa.pdf` |
| Portfolio home screenshot | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-home.png` |
| Portfolio dark screenshot | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-dark-home.png` |
| Projects page screenshot | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-projects.png` |
| Blogs page screenshot | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-blogs.png` |
| Resume page screenshot | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-resume.png` |
| Admin dashboard screenshot | `cdn.jsdelivr.net/gh/Priyanshu0007/CDN@main/portfolio/portfolio-admin.png` |

---

---

**Built with ♥ by [Priyanshu Gupta](https://priyanshu0007.vercel.app)**

[![GitHub](https://img.shields.io/badge/GitHub-Priyanshu0007-181717?style=flat-square&logo=github)](https://github.com/Priyanshu0007)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-22c55e?style=flat-square&logo=vercel)](https://priyanshu0007.vercel.app)

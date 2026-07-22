<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Personal Portfolio Website — Agent Rules

## Project Overview

A personal portfolio/developer website built with **Next.js 16** (App Router), **React 19**, **TypeScript 5**, and **Tailwind CSS 4**. The site showcases projects, blogs, a resume viewer, and includes an admin dashboard for content management. Uses a **Glassmorphism (Apple-esque)** design system throughout.

---

## Technology Stack

| Layer           | Technology                                     |
| --------------- | ---------------------------------------------- |
| Framework       | Next.js 16 (App Router)                        |
| UI Library      | React 19                                       |
| Language        | TypeScript 5 (strict mode)                     |
| Styling         | Tailwind CSS 4 via `@tailwindcss/postcss`      |
| Animations      | Framer Motion 12                               |
| Database        | Neon PostgreSQL (serverless) via `drizzle-orm` |
| Auth            | NextAuth v4 (OTP-based email login)            |
| PDF Viewer      | `@embedpdf` (core, engines, plugins)           |
| Email           | Resend SDK                                     |
| Validation      | Zod 4                                          |
| Icons           | Lucide React                                   |
| Analytics       | Firebase Analytics + Microsoft Clarity         |
| Theme           | `next-themes` (light/dark, class-based)        |
| Fonts           | Bricolage Grotesque (headings), DM Sans (body) |
| Package Manager | npm (with bun.lock also present)               |
| Linting         | ESLint 9 (flat config) + `eslint-config-next`  |
| Formatting      | Prettier 3 + `prettier-plugin-tailwindcss`     |

---

## Project Architecture

```
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (fonts, SEO, JSON-LD, providers)
│   ├── page.tsx            # Landing page (hero, about, projects, blogs, contact)
│   ├── globals.css         # Design system tokens + all global styles
│   ├── admin/              # Protected admin dashboard (NextAuth middleware)
│   │   ├── login/          # OTP-based login page
│   │   └── page.tsx        # Admin dashboard (CRUD for projects & blogs)
│   ├── api/                # API Route Handlers
│   │   ├── auth/           # NextAuth [...nextauth] + OTP send endpoint
│   │   ├── blogs/          # GET blogs endpoint
│   │   ├── home/           # GET landing page data
│   │   └── projects/       # GET projects + GET project by slug
│   ├── blogs/              # Blog listing page
│   ├── projects/           # Projects listing + [slug] detail pages
│   ├── resume/             # Resume/PDF viewer page (`@embedpdf` engine & viewer)
│   │   ├── ResumeActions.tsx
│   │   ├── ResumeViewer.tsx
│   │   └── ResumeViewerWrapper.tsx
│   ├── uses/               # Uses/tools page
│   ├── robots.ts           # Dynamic robots.txt generation
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── manifest.ts         # PWA manifest
├── actions/                # Server Actions (mutations)
│   ├── admin.ts            # CRUD for projects & blogs (Zod-validated)
│   └── contact.ts          # Contact form submission via Resend
├── components/
│   ├── layout/             # Navbar (shrink on scroll, mobile tabs), Footer, ClientEnhancements
│   ├── ui/                 # Reusable UI: glass cards, MediaGallery, BackgroundOrbs, HeroShapes, etc.
│   ├── admin/              # Admin-specific: dashboard, forms
│   ├── FirebaseAnalytics.tsx
│   └── MsClarity.tsx
├── data/                   # Static JSON data files
│   ├── landing.json        # Hero, about, beyondCode, techStack, contact
│   └── personal.json       # Name, socials, navigation, SEO config
├── db/
│   ├── schema.ts           # Drizzle ORM schema (projects, blogs, allowedAdmins, otps)
│   └── index.ts            # Neon DB connection singleton
├── lib/
│   ├── auth.ts             # NextAuth configuration & options
│   ├── data.ts             # Data-fetching functions (DB queries + static data)
│   ├── analytics.ts        # Unified analytics helper (Firebase + Clarity)
│   └── firebase.ts         # Firebase client initialization
├── types/
│   └── index.ts            # All TypeScript interfaces & type aliases
├── utils/
│   ├── envConfig.ts        # Centralized environment variable access
│   └── formatters.ts       # URL cleaning utilities
├── public/                 # Static assets (SVGs, custom cursors, service worker)
├── drizzle.config.ts       # Drizzle Kit configuration
├── middleware.ts            # NextAuth route protection for /admin
└── next.config.ts          # Next.js config (image remote patterns)
```

---

## Critical Conventions & Rules

### 1. TypeScript Strictness

- **Strict mode is ON** with extra checks: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`.
- Always handle `undefined` from indexed access (arrays, objects).
- Never use `any` — use `unknown` and narrow with type guards, or define proper types in `types/index.ts`.
- All shared types go in `types/index.ts`. Keep interfaces co-located only if they are truly component-private.

### 2. Path Aliases

- Use `@/*` for all imports (maps to project root). Example: `import { db } from "@/db"`.
- Never use relative paths like `../../`.

### 3. Styling — Tailwind CSS 4 + Glassmorphism Design System

- This project uses **Tailwind CSS 4** with the `@tailwindcss/postcss` plugin — NOT `tailwind.config.js`. Configuration lives in `app/globals.css` via the `@theme` directive.
- The design language is **Glassmorphism (Apple-esque)**: translucent surface layers (`var(--color-surface)`), soft backdrop blurs (`backdrop-filter: blur(24px)`), thin borders (`1px solid var(--color-border)`), soft glowing shadows, and sleek pill shapes.
- **Design tokens** are defined as CSS custom properties in `app/globals.css` under `@theme` and `:root`.
- **Dark mode** is class-based (`.dark` class). Dark theme tokens override light tokens seamlessly.
- Custom cursors are used (SVG files in `/public`).
- Use existing design tokens (`--color-primary`, `--shadow-md`, `--color-border`, etc.) rather than inventing ad-hoc values.
- Common utility classes: `.glass-btn`, `.glass-btn-primary`, `.glass-btn-secondary`, `.glass-card`, `.glass-card-interactive`, `.glass-panel`, `.glass-input`, `.glass-textarea` — check `globals.css` before creating new utility classes.

### 4. Component Patterns

- **Server Components by default** — use `"use client"` only when necessary (event handlers, hooks, browser APIs).
- Client components that need `"use client"` should be as small as possible, wrapping minimal interactivity.
- Use Framer Motion for animations — key established patterns include dynamic scroll-responsive navbar shrinking (desktop & mobile) and interactive active-tab indicator physics (`motion.div`).
- Lucide React for icons — do NOT add other icon libraries.
- PDF rendering on `/resume` uses `@embedpdf` engine integration.
- Use `next/image` for all images (with `remotePatterns` configured in `next.config.ts` for `cdn.jsdelivr.net`, `cdn.statically.io`, `images.unsplash.com`).
- Use `next/link` for all internal navigation.

### 5. Data Flow

- **Static data** (personal info, landing page content) → JSON files in `data/` → accessed via `lib/data.ts` helper functions (`getPersonalData()`, `getLandingData()`).
- **Dynamic data** (projects, blogs) → Neon PostgreSQL → Drizzle ORM queries in `lib/data.ts`.
- **Mutations** → Server Actions in `actions/` directory (validated with Zod schemas).
- Always call `revalidatePath()` after mutations to bust the cache for affected routes.
- All environment variables are accessed through `utils/envConfig.ts` — never read `process.env` directly in components.

### 6. Server Actions

- All server actions are in the `actions/` directory with `"use server"` directive.
- Every action must validate inputs with **Zod** before processing.
- Return structured results: `{ success: boolean; error: string | null }` or `{ error: fieldErrors }`.
- Contact form uses `sendContactEmail` with `useActionState` pattern (prev state + FormData).
- Admin CRUD operations: `createProject`, `updateProject`, `deleteProject`, `createBlog`, `updateBlog`, `deleteBlog`, `toggleProjectVisibility`, `toggleBlogVisibility`.

### 7. Database (Drizzle ORM + Neon)

- Schema is defined in `db/schema.ts` using Drizzle's PostgreSQL helpers.
- Tables: `projects`, `blogs`, `allowedAdmins`, `otps`.
- The `projects.category` field uses a PostgreSQL enum: `"react-js" | "react-native" | "next-js" | "other"`.
- JSON arrays (`techStack`, `images`, `highlights`) are stored as `jsonb` columns typed with `.$type<string[]>()`.
- DB connection singleton is in `db/index.ts`.
- Use `drizzle-kit push` (`npm run db:push`) to sync schema changes — no migration files.
- For the `images` and `thumbnail` fields, always clean URLs with `cleanUrl()`/`cleanUrls()` from `utils/formatters.ts`.

### 8. Authentication

- NextAuth v4 with a custom OTP (One-Time Password) email flow.
- `middleware.ts` protects `/admin` routes via `withAuth`.
- Admin access is restricted to emails in the `allowedAdmins` database table.
- OTPs are stored in the `otps` table with expiration timestamps.

### 9. Analytics

- **Dual tracking**: Firebase Analytics + Microsoft Clarity.
- All analytics events are defined in `lib/analytics.ts` → `AnalyticsEvents` const object.
- Use `trackUserAction(eventName, params)` for all tracking — never call Firebase/Clarity APIs directly.
- Analytics components (`FirebaseAnalytics`, `MsClarity`) are client components loaded in the root layout.

### 10. SEO

- Comprehensive metadata is configured in `app/layout.tsx` (Open Graph, Twitter Cards, robots, canonical URLs).
- JSON-LD structured data (`Person`, `WebSite`) is embedded in the root layout `<head>`.
- Dynamic `robots.ts` and `sitemap.ts` are present — update the sitemap when adding new routes.
- `manifest.ts` provides PWA metadata.
- Every new page must export proper `metadata` with title and description.

### 11. Error Handling

- `app/error.tsx` provides a global error boundary — maintain this pattern.
- `app/not-found.tsx` provides a custom 404 page.
- Individual route segments (e.g., `blogs/`, `projects/`) have their own `error.tsx` and `loading.tsx`.
- Always provide `loading.tsx` skeletons for new route segments that fetch data.

---

## Code Style & Formatting

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- **Double quotes** for strings (not single quotes).
- **Semicolons** required.
- **Trailing commas** in ES5 positions (objects, arrays).
- **2-space indentation**, no tabs.
- Tailwind classes are auto-sorted by the Prettier plugin.

### ESLint

- Flat config format (`eslint.config.mjs`).
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Run `npm run lint` to check. Fix all lint errors before committing.

---

## Commands Reference

| Command             | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start development server       |
| `npm run build`     | Production build               |
| `npm run start`     | Start production server        |
| `npm run lint`      | Run ESLint                     |
| `npm run format`    | Run Prettier on all files      |
| `npm run db:push`   | Push Drizzle schema to Neon DB |
| `npm run db:studio` | Open Drizzle Studio (DB GUI)   |
| `npm run analyze`   | Build with bundle analyzer     |

---

## Environment Variables

All env vars are accessed via `utils/envConfig.ts`. See `.env.example` for the full list:

- **Email**: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL_TO`
- **Public URLs**: `NEXT_PUBLIC_PROFILE_PIC_URL`, `NEXT_PUBLIC_RESUME_URL`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- **Database**: `DATABASE_URL` (Neon PostgreSQL connection string)
- **Firebase**: `NEXT_PUBLIC_FIREBASE_*` (7 config values)
- **Auth**: `NEXTAUTH_SECRET`

> **IMPORTANT**: Never hardcode secrets. Never commit `.env`. Always add new env vars to both `utils/envConfig.ts` AND `.env.example`.

---

## Do's and Don'ts

### ✅ Do

- Read `node_modules/next/dist/docs/` before using any Next.js API you're unsure about.
- Use the `@/*` path alias for all imports.
- Add types to `types/index.ts` for any shared data shapes.
- Use `envConfig` from `utils/envConfig.ts` for all environment variables.
- Use `trackUserAction()` for analytics events; add new event keys to `AnalyticsEvents`.
- Use Framer Motion `motion` components for animations.
- Validate all user input with Zod schemas in server actions.
- Call `revalidatePath()` after any data mutation.
- Provide `loading.tsx` and `error.tsx` for new route segments.
- Export `metadata` from every page for SEO.
- Use `cleanUrl()`/`cleanUrls()` when processing user-submitted URLs.
- Test with `npm run build` — it must pass without errors.
- Run `npm run lint` and `npm run format` before finalizing changes.

### ❌ Don't

- Don't use `tailwind.config.js` — this project uses Tailwind CSS 4 with `@theme` in CSS.
- Don't read `process.env` directly — use `utils/envConfig.ts`.
- Don't add new icon libraries — use `lucide-react`.
- Don't add new font families — use the existing `Bricolage Grotesque` (headings) and `DM Sans` (body).
- Don't use inline styles for theming — use the design tokens from `globals.css`.
- Don't create API routes for operations that should be Server Actions (mutations).
- Don't use `pages/` directory — this is an App Router project only.
- Don't skip Zod validation on server-side inputs.
- Don't use `useEffect` for data fetching — use Server Components or Server Actions.
- Don't commit `.env` files or hardcode secrets.
- Don't add dependencies without a strong reason — this project keeps deps minimal.

---

## Adding New Features Checklist

1. **New Page**: Create under `app/`, export `metadata`, add `loading.tsx` + `error.tsx`, update `sitemap.ts`.
2. **New Component**: Place in `components/ui/` (reusable) or `components/layout/` (structural). Prefer Server Components.
3. **New Data Model**: Add schema to `db/schema.ts`, create types in `types/index.ts`, add queries to `lib/data.ts`, run `npm run db:push`.
4. **New Server Action**: Create in `actions/`, add Zod schema, call `revalidatePath()`, return structured result.
5. **New API Route**: Create `route.ts` in `app/api/`, handle errors properly, return `NextResponse.json()`.
6. **New Env Var**: Add to `.env`, `.env.example`, and `utils/envConfig.ts`.
7. **New Analytics Event**: Add event key to `AnalyticsEvents` in `lib/analytics.ts`, call via `trackUserAction()`.

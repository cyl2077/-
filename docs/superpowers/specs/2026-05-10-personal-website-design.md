# Personal Website Design Spec

**Date:** 2026-05-10
**Type:** Full-stack developer portfolio + blog
**Stack:** Next.js (App Router) + Tailwind CSS + TypeScript

---

## Overview

A personal website combining a portfolio and blog, built with Next.js static generation (SSG). Projects and blog posts are authored as Markdown files. Modern studio aesthetic — light-toned, glassmorphism cards, refined typography, smooth micro-interactions.

## Pages

1. **Home** (`/`) — Hero section with name/title, skill tags, featured projects, intro text
2. **Projects** (`/projects`) — Grid of project cards; `/projects/[slug]` — individual project detail
3. **Blog** (`/blog`) — Article list with tag filtering; `/blog/[slug]` — article detail
4. **About** (`/about`) — Timeline of experience, education, personal bio
5. **Contact** (`/contact`) — Contact form (name, email, message), social links

## Visual Style

- **Color**: Warm white background (`#fafaf9`), white cards with soft shadows, deep gray text (`#1a1a1a`), accent color muted sage green (`#6b8f71`) for links/buttons/hover
- **Typography**: Large hero heading (`text-5xl`), generous section spacing (`py-24` level), clean hierarchy
- **Cards**: Subtle border + soft shadow, hover lifts with shadow deepening
- **Micro-interactions**: Fade-in on scroll, link underline left-to-right transition, theme toggle button
- **Dark mode**: Supported via `next-themes`, respecting system preference

## Architecture

```
/
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer + theme provider)
│   ├── page.tsx            # Home
│   ├── projects/
│   │   ├── page.tsx        # Project list (grid)
│   │   └── [slug]/page.tsx # Project detail
│   ├── blog/
│   │   ├── page.tsx        # Blog list + tag filter
│   │   └── [slug]/page.tsx # Blog post
│   ├── about/page.tsx      # About
│   └── contact/page.tsx    # Contact
├── components/
│   ├── ui/                 # Card, Button, Tag, Container, Section
│   ├── layout/             # Header, Footer, ThemeToggle
│   └── sections/           # Hero, FeaturedProjects, SkillTags, etc.
├── content/
│   ├── projects/           # Project markdown files (*.md)
│   └── blog/               # Blog markdown files (*.md)
├── lib/
│   ├── projects.ts         # Parse project MD files
│   └── blog.ts             # Parse blog MD files
└── public/images/          # Static images (project screenshots, avatar)
```

## Data Flow

- **Projects & Blog**: Static generation via `generateStaticParams`. Build-time MD reading with `gray-matter` + `remark` for frontmatter parsing and markdown rendering.
- **Contact form**: Client-side React state, validates inputs, POST to API route `/api/contact` (initial version logs to console or sends to email service; can be wired later).
- **Theme**: `next-themes` with `ThemeProvider` in root layout, toggle in Header, persisted to localStorage.

## Key Components

| Component | Description |
|-----------|-------------|
| Header | Sticky top bar, nav links, theme toggle. Blur backdrop on scroll. |
| Hero | Full-width intro: name, role title, tagline, CTA button. |
| ProjectCard | Screenshot thumbnail, title, description, tech stack tags, external/demo links. |
| BlogCard | Date, reading time, title, excerpt, tag chips. |
| TagFilter | Multi-select tag chips for filtering blog posts or projects. |
| Timeline | Vertical timeline for About page experience/education. |
| ContactForm | Name, email, message fields with validation and submit state. |
| Footer | Copyright, social icon links (GitHub, LinkedIn, etc.). |

## Content Schema

### Project frontmatter
```yaml
---
title: string
description: string
tech: string[]
image: string        # path relative to /public
demoUrl?: string
repoUrl?: string
order: number        # display priority
---
```

### Blog post frontmatter
```yaml
---
title: string
date: YYYY-MM-DD
tags: string[]
description: string  # for SEO and preview card
---
```

## Dependencies

- `next` (App Router)
- `tailwindcss` + `@tailwindcss/typography`
- `next-themes` — dark/light mode
- `gray-matter` — frontmatter parsing
- `remark` + `remark-html` — markdown to HTML
- `framer-motion` — scroll-triggered animations (optional, keep lightweight)
- `lucide-react` — icon set

## Deployment

- Static export (`next build` + `next export`) deployable to Vercel, Netlify, or GitHub Pages
- Vercel preferred for easiest Next.js support

## Out of Scope

- Headless CMS integration
- Database/user auth
- Comments system
- Analytics (can be added trivially with Vercel Analytics later)

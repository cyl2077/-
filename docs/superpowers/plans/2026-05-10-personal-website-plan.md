# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack developer portfolio + blog website with Next.js App Router, Tailwind CSS, and Markdown-based content.

**Architecture:** Next.js 15 App Router with static generation. Content (projects, blog posts) authored as Markdown files parsed at build time via gray-matter + remark. Dark/light theme via next-themes. Modern studio aesthetic with glassmorphism cards and scroll-triggered animations.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, next-themes, gray-matter, remark, framer-motion, lucide-react

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "personal-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-themes": "^0.4.4",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.1",
    "remark-html": "^16.0.1",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "tailwindcss": "^3.4.17",
    "@tailwindcss/typography": "^0.5.16",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd d:/111 && npm install`
Expected: packages install successfully

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#6b8f71",
          light: "#8dae92",
          dark: "#4f6d55",
        },
        warm: {
          DEFAULT: "#fafaf9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [typography],
};

export default config;
```

- [ ] **Step 6: Create postcss.config.mjs**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 7: Create globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-warm text-gray-900 antialiased;
  }

  .dark body {
    @apply bg-gray-950 text-gray-100;
  }
}
```

- [ ] **Step 8: Create root layout**

Path: `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Your Name — Full-Stack Developer",
    template: "%s | Your Name",
  },
  description: "Personal website of a full-stack developer. Portfolio, blog, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

<!-- Placeholder: ThemeProvider, Header, Footer will be created in later tasks -->

- [ ] **Step 9: Create placeholder home page**

Path: `app/page.tsx`

```tsx
export default function Home() {
  return <div>Hello World</div>;
}
```

- [ ] **Step 10: Verify dev server starts**

Run: `cd d:/111 && npm run dev`
Expected: Next.js starts on http://localhost:3000
Stop the server after confirming.

- [ ] **Step 11: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: scaffold Next.js project with Tailwind CSS"
```

---

### Task 2: Theme & Styling Foundation

**Files:**
- Create: `components/layout/ThemeProvider.tsx`, `components/layout/ThemeToggle.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create ThemeProvider**

Path: `components/layout/ThemeProvider.tsx`

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 2: Create ThemeToggle button**

Path: `components/layout/ThemeToggle.tsx`

```tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
```

- [ ] **Step 3: Update globals.css with refined styles**

Path: `app/globals.css`
Replace the `@layer base` block:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-stone-50 text-stone-900 antialiased transition-colors;
  }

  .dark body {
    @apply bg-stone-950 text-stone-100;
  }

  ::selection {
    @apply bg-accent/20;
  }
}

@layer components {
  .link-underline {
    @apply relative inline-block;
  }

  .link-underline::after {
    content: "";
    @apply absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent transition-all duration-300;
  }

  .link-underline:hover::after {
    @apply w-full;
  }
}
```

- [ ] **Step 4: Add Inter font via CDN in layout**

Modify: `app/layout.tsx`
Add inside `<head>`:

```tsx
// Add this link element inside the <head> (wrap in next/head or add to the returned JSX before <body>)
// Since we're using App Router, add this to the layout's <head> via metadata is not possible for link tags.
// Instead, create a fallback approach with next/font:

// Replace the layout.tsx entirely:
```

Full replacement for `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Your Name — Full-Stack Developer",
    template: "%s | Your Name",
  },
  description:
    "Personal website of a full-stack developer. Portfolio, blog, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Update tailwind.config.ts fontFamily**

Path: `tailwind.config.ts`
Update the fontFamily section:

```typescript
fontFamily: {
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
  mono: ["var(--font-mono)", "monospace"],
},
```

- [ ] **Step 6: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add theme provider, toggle, and font setup"
```

---

### Task 3: Layout Components

**Files:**
- Create: `components/layout/Header.tsx`, `components/layout/Footer.tsx`
- Create: `components/ui/Container.tsx`, `components/ui/Section.tsx`

- [ ] **Step 1: Create Container component**

Path: `components/ui/Container.tsx`

```tsx
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create Section component**

Path: `components/ui/Section.tsx`

```tsx
import { cn } from "@/lib/utils";

export default function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24", className)}>
      {children}
    </section>
  );
}
```

- [ ] **Step 3: Create utils helper**

Path: `lib/utils.ts`

```tsx
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 4: Create Header**

Path: `components/layout/Header.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-stone-950/80"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight hover:text-accent transition-colors"
          >
            Your Name
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors link-underline ${
                  pathname === href
                    ? "text-accent font-medium"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-stone-200 py-4 dark:border-stone-800 md:hidden">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2 text-sm transition-colors ${
                  pathname === href
                    ? "text-accent font-medium"
                    : "text-stone-600 dark:text-stone-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
```

- [ ] **Step 5: Create Footer**

Path: `components/layout/Footer.tsx`

```tsx
import Container from "@/components/ui/Container";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/your-username", icon: Github, label: "GitHub" },
  {
    href: "https://linkedin.com/in/your-username",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:your@email.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-12 dark:border-stone-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-accent transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 6: Verify layout renders**

Run: `cd d:/111 && npm run dev`
Open http://localhost:3000 — you should see the header, footer, and "Hello World" body.
Stop the server after confirming.

- [ ] **Step 7: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add layout components - Header, Footer, Container, Section"
```

---

### Task 4: UI Primitives

**Files:**
- Create: `components/ui/Card.tsx`, `components/ui/Button.tsx`, `components/ui/Tag.tsx`

- [ ] **Step 1: Create Card component**

Path: `components/ui/Card.tsx`

```tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-stone-900/50",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create Button component**

Path: `components/ui/Button.tsx`

```tsx
import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200";

const variantClasses = {
  primary:
    "bg-accent text-white hover:bg-accent-dark shadow-sm hover:shadow-md",
  secondary:
    "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700",
  ghost:
    "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Create Tag component**

Path: `components/ui/Tag.tsx`

```tsx
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Tag({
  children,
  active,
  onClick,
  className,
}: TagProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-accent text-white"
          : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
        onClick && "cursor-pointer hover:bg-accent/20",
        className
      )}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 4: Verify components export cleanly**

Run: `cd d:/111 && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add UI primitives - Card, Button, Tag"
```

---

### Task 5: Types & Content Library

**Files:**
- Create: `lib/types.ts`, `lib/projects.ts`, `lib/blog.ts`

- [ ] **Step 1: Create shared types**

Path: `lib/types.ts`

```typescript
export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  order: number;
  contentHtml: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  contentHtml: string;
  readingTime: number;
}
```

- [ ] **Step 2: Create projects lib**

Path: `lib/projects.ts`

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project } from "@/lib/types";

const projectsDir = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<Omit<Project, "contentHtml">[]> {
  if (!fs.existsSync(projectsDir)) return [];

  const filenames = fs.readdirSync(projectsDir);
  const projects = filenames
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(projectsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        tech: data.tech || [],
        image: data.image || "",
        demoUrl: data.demoUrl || undefined,
        repoUrl: data.repoUrl || undefined,
        order: data.order || 999,
        contentHtml: "",
      };
    })
    .sort((a, b) => a.order - b.order);

  return projects;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const filePath = path.join(projectsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    tech: data.tech || [],
    image: data.image || "",
    demoUrl: data.demoUrl || undefined,
    repoUrl: data.repoUrl || undefined,
    order: data.order || 999,
    contentHtml: processed.toString(),
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
```

- [ ] **Step 3: Create blog lib**

Path: `lib/blog.ts`

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { BlogPost } from "@/lib/types";

const blogDir = path.join(process.cwd(), "content/blog");

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

export async function getAllBlogPosts(): Promise<
  Omit<BlogPost, "contentHtml">[]
> {
  if (!fs.existsSync(blogDir)) return [];

  const filenames = fs.readdirSync(blogDir);
  const posts = filenames
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        tags: data.tags || [],
        description: data.description || "",
        readingTime: calculateReadingTime(content),
        contentHtml: "",
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return posts;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    tags: data.tags || [],
    description: data.description || "",
    readingTime: calculateReadingTime(content),
    contentHtml: processed.toString(),
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogTags(
  posts: Omit<BlogPost, "contentHtml">[]
): string[] {
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
```

- [ ] **Step 4: Verify compilation**

Run: `cd d:/111 && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add types and content parsing library"
```

---

### Task 6: Home Page Sections

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/SkillTags.tsx`, `components/sections/FeaturedProjects.tsx`, `components/sections/ProjectCard.tsx`, `components/sections/BlogCard.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Hero section**

Path: `components/sections/Hero.tsx`

```tsx
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pb-24 pt-32 md:pt-40">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-sm text-accent">Hi, I&apos;m</p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Your Name
          </h1>
          <h2 className="mb-6 text-xl text-stone-500 dark:text-stone-400 md:text-2xl">
            Full-stack developer crafting thoughtful digital experiences
          </h2>
          <p className="mb-8 max-w-lg text-stone-600 dark:text-stone-400">
            I build fast, accessible, and beautiful web applications. Currently
            focused on the React ecosystem and backend architecture.
          </p>
          <div className="flex gap-4">
            <Button href="/projects">
              View Projects <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create SkillTags section**

Path: `components/sections/SkillTags.tsx`

```tsx
"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { motion } from "framer-motion";

const skills = [
  "TypeScript", "React", "Next.js", "Node.js", "Python",
  "PostgreSQL", "Docker", "AWS", "GraphQL", "Tailwind CSS",
  "Prisma", "Redis",
];

export default function SkillTags() {
  return (
    <Section className="border-t border-stone-200 dark:border-stone-800">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-bold">
          Technologies I work with
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Tag>{skill}</Tag>
            </motion.span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Create ProjectCard**

Path: `components/sections/ProjectCard.tsx`

```tsx
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  slug: string;
  demoUrl?: string;
  repoUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  slug,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  return (
    <Card>
      <div className="flex h-full flex-col">
        <Link
          href={`/projects/${slug}`}
          className="mb-3 text-lg font-semibold hover:text-accent transition-colors"
        >
          {title}
        </Link>
        <p className="mb-4 flex-1 text-sm text-stone-600 dark:text-stone-400">
          {description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="flex gap-3 text-sm">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-stone-500 hover:text-accent transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
```

- [ ] **Step 4: Create FeaturedProjects section**

Path: `components/sections/FeaturedProjects.tsx`

```tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/sections/ProjectCard";
import { ArrowRight } from "lucide-react";
import { getAllProjects } from "@/lib/projects";

export default async function FeaturedProjects() {
  const projects = await getAllProjects();
  const featured = projects.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <Section id="projects" className="bg-stone-100/50 dark:bg-stone-900/50">
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              A selection of recent work
            </p>
          </div>
          <Button href="/projects" variant="ghost">
            View All <ArrowRight size={16} />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: Create BlogCard**

Path: `components/sections/BlogCard.tsx`

```tsx
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime: number;
}

export default function BlogCard({
  title,
  description,
  date,
  tags,
  slug,
  readingTime,
}: BlogCardProps) {
  return (
    <Card>
      <Link
        href={`/blog/${slug}`}
        className="mb-2 text-lg font-semibold hover:text-accent transition-colors"
      >
        {title}
      </Link>
      <div className="mb-2 flex items-center gap-3 text-xs text-stone-500">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>{readingTime} min read</span>
      </div>
      <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Card>
  );
}
```

- [ ] **Step 6: Assemble home page**

Path: `app/page.tsx`
Replace placeholder content:

```tsx
import Hero from "@/components/sections/Hero";
import SkillTags from "@/components/sections/SkillTags";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/sections/BlogCard";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getAllBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Hero />
      <SkillTags />
      <FeaturedProjects />

      {recentPosts.length > 0 && (
        <Section id="blog">
          <Container>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold">Latest Posts</h2>
                <p className="mt-2 text-stone-600 dark:text-stone-400">
                  Thoughts on development and design
                </p>
              </div>
              <Button href="/blog" variant="ghost">
                View All <ArrowRight size={16} />
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
```

- [ ] **Step 7: Verify compilation**

Run: `cd d:/111 && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 8: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add home page with Hero, Skills, FeaturedProjects, and Blog preview"
```

---

### Task 7: Projects Pages

**Files:**
- Create: `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create projects list page**

Path: `app/projects/page.tsx`

```tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/sections/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects I've built",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Things I&apos;ve built and contributed to
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="py-12 text-center text-stone-500">
            No projects yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Create project detail page — static params**

Path: `app/projects/[slug]/page.tsx`

```tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import {
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/lib/projects";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Section>
      <Container>
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <article className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
          <p className="mb-6 text-lg text-stone-600 dark:text-stone-400">
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mb-8 flex gap-4">
            {project.demoUrl && (
              <Button href={project.demoUrl}>
                <ExternalLink size={16} /> Live Demo
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="secondary">
                <Github size={16} /> Source Code
              </Button>
            )}
          </div>

          <div
            className="prose prose-stone max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        </article>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Verify compilation**

Run: `cd d:/111 && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add projects list and detail pages"
```

---

### Task 8: Blog Pages

**Files:**
- Create: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `components/sections/TagFilter.tsx`

- [ ] **Step 1: Create TagFilter component**

Path: `components/sections/TagFilter.tsx`

```tsx
"use client";

import Tag from "@/components/ui/Tag";
import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
}

export default function TagFilter({ tags, selectedTags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (tags.length === 0) return null;

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll("tag");

    if (current.includes(tag)) {
      params.delete("tag");
      current.filter((t) => t !== tag).forEach((t) => params.append("tag", t));
    } else {
      params.append("tag", tag);
    }

    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Tag
        active={selectedTags.length === 0}
        onClick={() => router.push("/blog")}
      >
        All
      </Tag>
      {tags.map((tag) => (
        <Tag
          key={tag}
          active={selectedTags.includes(tag)}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create blog list page**

Path: `app/blog/page.tsx`

```tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/sections/BlogCard";
import TagFilter from "@/components/sections/TagFilter";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on development, design, and technology",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const { tag } = await searchParams;
  const allPosts = await getAllBlogPosts();
  const allTags = getAllBlogTags(allPosts);

  const selectedTags = tag
    ? Array.isArray(tag)
      ? tag
      : [tag]
    : [];

  const filteredPosts =
    selectedTags.length > 0
      ? allPosts.filter((p) =>
          selectedTags.some((t) => p.tags.includes(t))
        )
      : allPosts;

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Thoughts on development, design, and technology
          </p>
        </div>

        <div className="mb-8">
          <TagFilter tags={allTags} selectedTags={selectedTags} />
        </div>

        {filteredPosts.length === 0 ? (
          <p className="py-12 text-center text-stone-500">
            No posts matching these tags.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Create blog detail page**

Path: `app/blog/[slug]/page.tsx`

```tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section>
      <Container>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <article className="mx-auto max-w-2xl">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-stone-500">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>{post.readingTime} min read</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag}`}>
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
          </header>

          <div
            className="prose prose-stone max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Verify compilation**

Run: `cd d:/111 && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add blog pages with tag filtering"
```

---

### Task 9: About & Contact Pages

**Files:**
- Create: `app/about/page.tsx`, `components/sections/Timeline.tsx`
- Create: `app/contact/page.tsx`, `components/sections/ContactForm.tsx`, `app/api/contact/route.ts`

- [ ] **Step 1: Create Timeline component**

Path: `components/sections/Timeline.tsx`

```tsx
import Card from "@/components/ui/Card";

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  title: string;
}

export default function Timeline({ items, title }: TimelineProps) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      <div className="relative border-l border-stone-300 dark:border-stone-700">
        {items.map((item, i) => (
          <div key={i} className="mb-8 ml-6">
            <div className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-white dark:bg-stone-950" />
            <Card className="!p-5" hover={false}>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-accent">{item.organization}</p>
              <p className="mb-2 text-xs text-stone-500">{item.period}</p>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                {item.description}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create About page**

Path: `app/about/page.tsx`

```tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Timeline from "@/components/sections/Timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "My background, experience, and what drives me",
};

const experience = [
  {
    title: "Senior Full-Stack Developer",
    organization: "Tech Company",
    period: "2023 — Present",
    description:
      "Leading frontend architecture and building internal tools. Migrated legacy systems to Next.js, improving performance by 40%.",
  },
  {
    title: "Full-Stack Developer",
    organization: "Startup Inc.",
    period: "2021 — 2023",
    description:
      "Built core product features across the stack. Designed REST APIs and implemented real-time collaboration features.",
  },
];

const education = [
  {
    title: "B.S. Computer Science",
    organization: "University Name",
    period: "2017 — 2021",
    description:
      "Focus on software engineering and distributed systems. Dean's list.",
  },
];

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">About Me</h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="prose prose-stone dark:prose-invert">
              <p>
                I&apos;m a full-stack developer passionate about building tools
                that make people more productive. I care deeply about
                performance, accessibility, and clean architecture.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me reading about
                systems design, contributing to open source, or exploring the
                outdoors.
              </p>
            </div>
          </div>

          <div className="space-y-12 lg:col-span-3">
            <Timeline items={experience} title="Experience" />
            <Timeline items={education} title="Education" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Create ContactForm**

Path: `components/sections/ContactForm.tsx`

```tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
        <CheckCircle className="h-12 w-12 text-accent" />
        <h3 className="text-xl font-semibold">Message sent!</h3>
        <p className="text-stone-600 dark:text-stone-400">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-stone-700 dark:bg-stone-800"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-stone-700 dark:bg-stone-800"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full resize-y rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-stone-700 dark:bg-stone-800"
          placeholder="What would you like to talk about?"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
```

- [ ] **Step 4: Create Contact page**

Path: `app/contact/page.tsx`

```tsx
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/sections/ContactForm";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — I'd love to hear from you",
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Have a question or want to work together? Get in touch.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Reach me at</h3>
              <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <a
                  href="mailto:your@email.com"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Mail size={16} /> your@email.com
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> Your Location
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Elsewhere</h3>
              <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: Create API route for contact form**

Path: `app/api/contact/route.ts`

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // In production, replace with actual email service (Resend, SendGrid, etc.)
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 6: Verify compilation**

Run: `cd d:/111 && npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 7: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add about, contact pages, and contact API route"
```

---

### Task 10: Sample Content & Final Polish

**Files:**
- Create: `content/projects/example-project.md`, `content/blog/hello-world.md`
- Create: `public/images/` directory

- [ ] **Step 1: Create sample project MD**

Path: `content/projects/example-project.md`

```markdown
---
title: E-Commerce Platform
description: A full-stack e-commerce platform with real-time inventory, Stripe payments, and an admin dashboard.
tech:
  - Next.js
  - TypeScript
  - PostgreSQL
  - Prisma
  - Stripe
image: /images/project-placeholder.png
demoUrl: https://example.com
repoUrl: https://github.com/example/repo
order: 1
---

## Overview

Built a complete e-commerce solution from the ground up.

### Key Features

- **Product catalog** with search, filtering, and pagination
- **Shopping cart** with real-time inventory validation
- **Stripe checkout** with webhook integration
- **Admin dashboard** for order and inventory management

### Architecture

The app uses Next.js App Router for the frontend, with a PostgreSQL database managed through Prisma ORM. API routes handle authentication, cart operations, and Stripe webhooks.
```

- [ ] **Step 2: Create sample blog post MD**

Path: `content/blog/hello-world.md`

```markdown
---
title: Building a Personal Website with Next.js and Tailwind
date: 2026-05-01
tags:
  - Next.js
  - Tailwind CSS
  - Web Development
description: How I built this personal website from scratch using modern tools and why the simplest approach is often the best one.
---

## Why Build a Personal Website?

In an era of social media profiles and link-in-bio pages, a personal website still matters. It's a space you control completely — your content, your design, your voice.

## The Stack

I chose **Next.js** for static generation and **Tailwind CSS** for styling. Here's why:

1. **Next.js SSG** gives me fast page loads and great SEO out of the box
2. **Tailwind CSS** lets me iterate on design without context-switching to CSS files
3. **Markdown** for content means I can write posts in my editor

## Keeping It Simple

The temptation is always to over-engineer. CMS, database, authentication — all before the first post is written. I resisted. Content lives in Markdown files, the build output is static HTML, and deployment is a single command.

Sometimes the best stack is the one you actually ship.
```

- [ ] **Step 3: Create images directory with placeholder**

Run: `mkdir -p "d:/111/public/images"`

Create a simple placeholder SVG at `public/images/project-placeholder.png` — or skip for now since we reference it in the sample project. Update the sample project to not require an image if we skip it.

Modify: `content/projects/example-project.md`
Change `image: /images/project-placeholder.png` to `image: ""`

- [ ] **Step 4: Build the project**

Run: `cd d:/111 && npm run build`
Expected: Successful static build with no errors. Pages should be pre-rendered.

- [ ] **Step 5: Start dev server and verify all pages**

Run: `cd d:/111 && npm run dev`
Verify each page loads correctly:

1. http://localhost:3000 — Home page with Hero, Skills, Featured Projects, Blog preview
2. http://localhost:3000/projects — Project grid with sample project
3. http://localhost:3000/projects/example-project — Project detail with markdown content
4. http://localhost:3000/blog — Blog list with sample post and tag filtering
5. http://localhost:3000/blog/hello-world — Blog post detail
6. http://localhost:3000/about — About page with timeline
7. http://localhost:3000/contact — Contact page with form

Also verify:
- Theme toggle works (light/dark/system)
- Header becomes sticky with blur backdrop on scroll
- Mobile responsive — hamburger menu appears at small widths
- Contact form submits and shows success state

Stop server after verification.

- [ ] **Step 6: Commit**

```bash
cd d:/111 && git add -A && git commit -m "feat: add sample content and finalize all pages"
```

---

## Plan Self-Review

**1. Spec coverage:**
- Home page with Hero, skill tags, featured projects, blog preview ✓ (Task 6)
- Projects list + detail ✓ (Task 7)
- Blog list with tag filtering + detail ✓ (Task 8)
- About page with timeline ✓ (Task 9)
- Contact page with form + API route ✓ (Task 9)
- Dark/light theme ✓ (Task 2)
- Layout (Header, Footer) ✓ (Task 3)
- UI primitives (Card, Button, Tag) ✓ (Task 4)
- Content parsing library ✓ (Task 5)
- Sample content ✓ (Task 10)
- Micro-interactions (scroll fade-in, card hover, link underline) ✓ (Tasks 2, 4, 6)

**2. Placeholder scan:** No TBD, TODO, or vague instructions. All code is complete.

**3. Type consistency:**
- Project/BlogPost types consistent across lib, pages, and components ✓
- Component props match usage in parent components ✓
- `cn()` helper used consistently everywhere ✓

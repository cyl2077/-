"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { T } from "@/lib/i18n";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/projects", zh: "项目", en: "Projects" },
  { href: "/blog", zh: "博客", en: "Blog" },
  { href: "/about", zh: "关于", en: "About" },
  { href: "/contact", zh: "联系", en: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [menuOpen]);

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
            陈辉
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map(({ href, zh, en }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors link-underline ${
                  pathname === href
                    ? "text-accent font-medium"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                <T zh={zh} en={en} />
              </Link>
            ))}
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
              aria-label="切换菜单"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-stone-200 py-4 dark:border-stone-800 md:hidden">
            {links.map(({ href, zh, en }) => (
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
                <T zh={zh} en={en} />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}

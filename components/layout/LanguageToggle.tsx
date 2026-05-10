"use client";

import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "zh" ? "en" : "zh")}
      className="rounded-lg px-2 py-1 text-xs font-medium text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
      aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
    >
      {lang === "zh" ? "EN" : "中"}
    </button>
  );
}

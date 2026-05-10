"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Lang = "zh" | "en";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "zh", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "zh") {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LangContext);
}

export function T({ zh, en }: { zh: string; en: string }) {
  const { lang } = useLanguage();
  return <>{lang === "zh" ? zh : en}</>;
}

"use client";
import { useLanguage } from "@/lib/i18n";

export default function LocaleDate({ date }: { date: string }) {
  const { lang } = useLanguage();
  const locale = lang === "zh" ? "zh-CN" : "en-US";
  return (
    <time dateTime={date}>
      {new Date(date).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
}

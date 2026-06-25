"use client";

import { useLanguage } from "@/components/providers/language-provider";

export function SkipLink() {
  const { locale } = useLanguage();
  const label = locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content";
  return (
    <a
      href="#main"
      className="sr-only z-[60] rounded-lg bg-brand px-4 py-2 font-semibold text-white shadow-cta focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
    >
      {label}
    </a>
  );
}

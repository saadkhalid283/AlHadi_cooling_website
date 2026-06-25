"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function LangToggle() {
  const { t, toggleLocale } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.common.langLabel}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-brand-ink transition-colors hover:border-brand hover:text-brand"
    >
      <Languages className="h-4 w-4" aria-hidden />
      <span>{t.common.langLabel}</span>
    </button>
  );
}

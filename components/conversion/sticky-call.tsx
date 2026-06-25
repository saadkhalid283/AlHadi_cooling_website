"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { site } from "@/lib/site";

/** Mobile-only sticky conversion bar pinned to the bottom of the viewport. */
export function StickyCall() {
  const { t, locale } = useLanguage();
  const message =
    locale === "ar"
      ? "مرحبًا، أحتاج خدمة صيانة تكييف."
      : "Hi, I need an AC / appliance service.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-border bg-border sm:hidden">
      <a
        href={site.telHref}
        className="flex items-center justify-center gap-2 bg-brand py-3.5 text-sm font-semibold text-white"
      >
        <Phone className="h-4 w-4" aria-hidden />
        {t.cta.call}
      </a>
      <a
        href={site.whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-whatsapp py-3.5 text-sm font-semibold text-white"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        {t.cta.whatsapp}
      </a>
    </div>
  );
}

"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { site } from "@/lib/site";

export function FloatingWhatsApp() {
  const { t, locale } = useLanguage();
  const message =
    locale === "ar"
      ? "مرحبًا، أحتاج خدمة صيانة تكييف."
      : "Hi, I need an AC / appliance service.";

  return (
    <a
      href={site.whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.messageUs}
      className="fixed bottom-5 z-50 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 active:scale-95 sm:grid ltr:right-5 rtl:left-5"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}

"use client";

import { Home, Phone } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { LogoMark } from "@/components/brand/logo";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";

export default function NotFound() {
  const { locale } = useLanguage();
  const copy =
    locale === "ar"
      ? {
          title: "الصفحة غير موجودة",
          desc: "عذرًا، الصفحة التي تبحث عنها غير متوفرة. لنعد بك إلى الصفحة الرئيسية.",
          home: "العودة للرئيسية",
        }
      : {
          title: "Page not found",
          desc: "Sorry, the page you are looking for is not available. Let us get you back home.",
          home: "Back to home",
        };

  return (
    <main className="grid min-h-[80vh] place-items-center bg-[radial-gradient(90%_70%_at_50%_-10%,hsl(var(--brand-sky-soft))_0%,#ffffff_60%)] px-6">
      <div className="text-center">
        <LogoMark size={56} className="mx-auto" />
        <p className="mt-6 text-7xl font-extrabold tracking-tight text-brand">
          404
        </p>
        <h1 className="mt-2 text-2xl text-brand-ink">{copy.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-brand-muted">{copy.desc}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton href="/" variant="call">
            <Home className="h-5 w-5" aria-hidden />
            {copy.home}
          </CtaButton>
          <CtaButton href={site.telHref} variant="outline">
            <Phone className="h-5 w-5" aria-hidden />
            {site.phoneDisplay}
          </CtaButton>
        </div>
      </div>
    </main>
  );
}

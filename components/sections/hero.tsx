"use client";

import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  BadgeCheck,
  MapPin,
  Wrench,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";

/**
 * Cinematic full-bleed hero: immersive photography behind the message, a
 * gradient scrim for drama + legibility, and a glass trust bar at the foot.
 * Above-the-fold content paints from static HTML (CSS entrance, LCP-safe).
 */
export function Hero() {
  const { t, locale } = useLanguage();
  const waMsg =
    locale === "ar"
      ? "مرحبًا، أحتاج خدمة صيانة/إصلاح. هل يمكنكم المساعدة؟"
      : "Hi AlHadi Cooling, I need an AC / appliance service. Can you help?";

  const trust = [
    { icon: BadgeCheck, label: t.hero.stats.years },
    { icon: Wrench, label: t.hero.stats.jobs },
    { icon: MapPin, label: t.hero.stats.area },
    { icon: ShieldCheck, label: t.hero.stats.guarantee },
  ];

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[88vh] flex-col overflow-hidden"
    >
      {/* Background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-bg.webp"
        alt={
          locale === "ar"
            ? "غرفة معيشة فاخرة في جدة يبرّدها مكيف هواء، مع إطلالة على أفق المدينة"
            : "A cool, comfortable Jeddah living room kept fresh by air conditioning, with a sea-view skyline"
        }
        width={1800}
        height={1200}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]"
      />
      {/* Scrims: heavy on the text side, fading to reveal the AC, plus a foot darken */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep via-brand-deep/85 to-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-deep/90 via-transparent to-brand-deep/30"
      />

      {/* Content */}
      <div className="container-page flex flex-1 items-center py-16 lg:py-24">
        <div className="max-w-2xl text-white">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-semibold backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-warm" />
            </span>
            {t.hero.badge}
          </span>

          <h1
            className="mt-5 animate-fade-up text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]"
            style={{ animationDelay: "0.06s" }}
          >
            {t.hero.titleLead}{" "}
            <span className="bg-gradient-to-r from-white to-sky bg-clip-text text-transparent">
              {t.hero.titleAccent}
            </span>
          </h1>

          <p
            className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-white/85"
            style={{ animationDelay: "0.12s" }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.18s" }}
          >
            <CtaButton
              href={site.telHref}
              variant="light"
              className="px-6 py-3.5 text-base"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {t.cta.call}
            </CtaButton>
            <CtaButton
              href={site.whatsappHref(waMsg)}
              variant="whatsapp"
              className="px-6 py-3.5 text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {t.cta.whatsapp}
            </CtaButton>
          </div>

          <div
            className="mt-5 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            style={{ animationDelay: "0.24s" }}
          >
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              <Clock className="h-4 w-4 text-sky" aria-hidden />
              {t.hero.responseNote}
            </span>
            <a
              href={site.telHref}
              className="font-bold text-sky transition-colors hover:text-white"
              dir="ltr"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Glass trust bar */}
      <div className="relative border-t border-white/15 bg-white/[0.07] backdrop-blur">
        <ul className="container-page grid grid-cols-2 gap-y-4 py-5 sm:grid-cols-4 sm:divide-x sm:divide-white/15 rtl:sm:divide-x-reverse">
          {trust.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 px-2 text-sm font-medium text-white sm:justify-center sm:px-4"
            >
              <Icon className="h-5 w-5 shrink-0 text-sky" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { Phone, MessageCircle, ShieldCheck, Timer, BadgeCheck, Award } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { CtaButton } from "@/components/ui/cta-button";
import { ApplianceRail } from "@/components/sections/appliance-rail";
import { site } from "@/lib/site";

/**
 * Full-bleed hero.
 *
 * The scrim is directional, not a flat wash: heavy behind the copy, clearing
 * to almost nothing over the technician and the three appliances, because that
 * half of the photo is the argument (one team covers AC, refrigeration and
 * laundry). In RTL the photo is mirrored so the appliances always land on the
 * side opposite the text instead of being covered by it.
 *
 * Hierarchy is symptom -> promise: the customer recognises their own fault
 * first, then reads what we do about it in the largest type on the page.
 */
export function Hero() {
  const { t, locale } = useLanguage();
  const waMsg =
    locale === "ar"
      ? "مرحبًا، أحتاج خدمة صيانة/إصلاح. هل يمكنكم المساعدة؟"
      : "Hi AlHadi Cooling, I need an AC / appliance service. Can you help?";

  // Credential strip. "Certified" leads because it is the claim a nervous
  // customer weighs first when letting a stranger open their appliance.
  const proof = [
    { icon: BadgeCheck, value: t.hero.certifiedValue },
    { icon: Timer, value: t.hero.responseValue },
    { icon: Award, value: t.hero.experienceValue },
  ];

  return (
    <section id="hero" className="relative isolate bg-brand-ink">
      <div className="relative flex min-h-[32rem] flex-col justify-center overflow-hidden lg:min-h-[42rem]">
        {/* Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-appliances.webp"
          alt={t.hero.imageAlt}
          width={1672}
          height={941}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center] lg:object-center rtl:[transform:scaleX(-1)]"
        />

        {/* Scrim A — mobile: bottom-weighted so stacked copy stays legible. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink via-brand-ink/80 to-brand-ink/45 lg:hidden"
        />
        {/* Scrim B — desktop: directional, clearing over the appliances. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden lg:block ltr:bg-[linear-gradient(90deg,hsl(var(--brand-ink))_0%,hsl(var(--brand-ink)/0.94)_32%,hsl(var(--brand-ink)/0.62)_50%,transparent_72%)] rtl:bg-[linear-gradient(270deg,hsl(var(--brand-ink))_0%,hsl(var(--brand-ink)/0.94)_32%,hsl(var(--brand-ink)/0.62)_50%,transparent_72%)]"
        />
        {/* Scrim C — grounds the photo into the rail below. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-brand-ink/70 to-transparent"
        />

        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl lg:max-w-[37rem]">
            {/* Duplicated by the header strip on lg+, so show it only below that. */}
            <p className="flex animate-fade-up items-center gap-2.5 text-sm font-semibold text-white lg:hidden">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-whatsapp" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-whatsapp" />
              </span>
              {t.hero.status}
            </p>

            <h1 className="mt-6 lg:mt-0">
              {/* Symptoms first: recognition before persuasion. */}
              <span className="block space-y-1.5">
                {t.hero.problems.map((p, i) => (
                  <span
                    key={p}
                    className="flex animate-fade-up items-center gap-2.5 text-[1.1rem] font-bold leading-snug text-white/90 sm:text-[1.4rem]"
                    style={{ animationDelay: `${0.04 + i * 0.05}s` }}
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                    />
                    {p}
                  </span>
                ))}
              </span>
              <span
                className="display mt-4 block animate-fade-up text-[2rem] text-white sm:text-[2.8rem] lg:text-[3.3rem]"
                style={{ animationDelay: "0.2s" }}
              >
                {t.hero.titleSolve}
              </span>
            </h1>

            <p
              className="mt-5 max-w-lg animate-fade-up text-[0.98rem] leading-relaxed text-white/80 sm:text-[1.02rem]"
              style={{ animationDelay: "0.24s" }}
            >
              {t.hero.subtitle}
            </p>

            <div
              className="mt-7 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.28s" }}
            >
              <CtaButton
                href={site.telHref}
                variant="ember"
                className="px-6 py-4 text-base"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {t.cta.call}
                <span dir="ltr" className="font-extrabold">
                  {site.phoneDisplay}
                </span>
              </CtaButton>
              <CtaButton
                href={site.whatsappHref(waMsg)}
                variant="whatsapp"
                className="px-6 py-4 text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {t.cta.whatsapp}
              </CtaButton>
            </div>

            {/* Price anxiety stalls more leads than anything else. Answer it at the fold. */}
            <p
              className="mt-5 flex max-w-lg animate-fade-up items-start gap-2.5 text-sm leading-relaxed text-white/75"
              style={{ animationDelay: "0.32s" }}
            >
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                aria-hidden
              />
              {t.hero.priceNote}
            </p>

            {/* Credential badges. Icon + claim only: at this size a second
                line of explanation is unreadable, and the detail lives in
                the Why Us section. */}
            <ul
              className="mt-7 grid animate-fade-up grid-cols-1 gap-2 border-t border-white/15 pt-5 sm:grid-cols-3"
              style={{ animationDelay: "0.36s" }}
            >
              {proof.map(({ icon: Icon, value }) => (
                <li
                  key={value}
                  className="flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-3 py-2.5"
                >
                  <Icon
                    className="h-[18px] w-[18px] shrink-0 text-sky"
                    aria-hidden
                  />
                  <span className="text-[0.8rem] font-bold leading-tight text-white">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Appliance rail: one "we do AC" becomes three booking intents ── */}
      <ApplianceRail />
    </section>
  );
}

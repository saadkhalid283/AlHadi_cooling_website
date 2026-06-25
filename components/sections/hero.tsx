"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CalendarCheck,
  BadgeCheck,
  MapPin,
  Wrench,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { CtaButton } from "@/components/ui/cta-button";
import { LogoMark } from "@/components/brand/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Entrance for above-the-fold content uses CSS (`animate-fade-up`) so it paints
 * instantly in the static HTML - no JS gating the LCP element. Framer Motion is
 * reserved for the non-critical floating cards' continuous micro-motion.
 */
export function Hero() {
  const { t, locale } = useLanguage();
  const reduce = useReducedMotion();
  const waMsg =
    locale === "ar"
      ? "مرحبًا، أحتاج خدمة صيانة/إصلاح. هل يمكنكم المساعدة؟"
      : "Hi AlHadi Cooling, I need an AC / appliance service. Can you help?";

  const stats = [
    { icon: BadgeCheck, label: t.hero.stats.years },
    { icon: Wrench, label: t.hero.stats.jobs },
    { icon: MapPin, label: t.hero.stats.area },
    { icon: ShieldCheck, label: t.hero.stats.guarantee },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden scroll-mt-20 bg-[radial-gradient(90%_70%_at_50%_-10%,hsl(var(--brand-sky-soft))_0%,#ffffff_60%)]"
    >
      <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        {/* Content */}
        <div className="max-w-xl">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-warm/25 bg-warm/10 px-3.5 py-1.5 text-sm font-semibold text-warm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-warm" />
            </span>
            {t.hero.badge}
          </span>

          <h1
            className="mt-5 animate-fade-up text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]"
            style={{ animationDelay: "0.06s" }}
          >
            {t.hero.titleLead}{" "}
            <span className="bg-gradient-to-l from-cyan to-brand bg-clip-text text-transparent">
              {t.hero.titleAccent}
            </span>
          </h1>

          <p
            className="mt-5 animate-fade-up text-lg leading-relaxed text-brand-muted"
            style={{ animationDelay: "0.12s" }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="mt-7 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.18s" }}
          >
            <CtaButton
              href={site.telHref}
              variant="call"
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
            className="mt-4 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-muted"
            style={{ animationDelay: "0.24s" }}
          >
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-ink">
              <Clock className="h-4 w-4 text-brand" aria-hidden />
              {t.hero.responseNote}
            </span>
            <a
              href={site.telHref}
              className="font-bold text-brand transition-colors hover:text-brand-ink"
              dir="ltr"
            >
              {site.phoneDisplay}
            </a>
          </div>

          <ul
            className="mt-8 grid animate-fade-up grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-6 sm:max-w-lg"
            style={{ animationDelay: "0.3s" }}
          >
            {stats.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm font-medium text-brand-ink"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <HeroVisual reduce={!!reduce} />
      </div>
    </section>
  );
}

function HeroVisual({ reduce }: { reduce: boolean }) {
  const { t, locale } = useLanguage();
  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -9, 0] },
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <div
      className="relative mx-auto w-full max-w-sm animate-fade-up lg:max-w-none"
      style={{ animationDelay: "0.16s" }}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-white/30"
        style={{
          backgroundImage:
            "linear-gradient(155deg,#0e3a5c 0%,#0c4f86 52%,#0a6bb8 100%)",
        }}
      >
        {/* Image slot - drop a real technician photo at /images/hero.jpg to layer it here. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_15%,rgba(255,255,255,0.18),transparent_60%)]"
        />
        <LogoMark
          size={420}
          tone="mono"
          className="pointer-events-none absolute -bottom-20 opacity-[0.08] ltr:-right-24 rtl:-left-24"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.12] px-3 py-1.5 text-sm font-semibold ring-1 ring-white/20 backdrop-blur">
            <LogoMark size={20} tone="mono" />
            {site.name[locale]}
          </span>

          <div className="text-center">
            <p className="text-6xl font-extrabold leading-none tracking-tight">
              {t.hero.panel.jobsValue}
            </p>
            <p className="mt-2 text-sm text-white/80">{t.hero.panel.jobsLabel}</p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-white/15 rounded-2xl bg-white/10 py-3 text-center ring-1 ring-white/15 backdrop-blur rtl:divide-x-reverse">
            <PanelStat value="16+" label={locale === "ar" ? "سنة" : "Years"} />
            <PanelStat value="2K+" label={locale === "ar" ? "مهمة" : "Jobs"} />
            <PanelStat
              value="24/7"
              label={locale === "ar" ? "طوارئ" : "Emergency"}
            />
          </div>
        </div>
      </div>

      {/* Floating proof cards - Framer Motion (non-critical micro-motion) */}
      <FloatCard
        {...float(0)}
        icon={CalendarCheck}
        title={t.hero.panel.sameDay}
        className="-top-4 ltr:-left-4 rtl:-right-4"
      />
      <FloatCard
        {...float(1.2)}
        icon={ShieldCheck}
        title={t.hero.panel.guarantee}
        className="-bottom-5 ltr:-right-4 rtl:-left-4"
      />
    </div>
  );
}

function PanelStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-2">
      <p className="text-xl font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-xs text-white/75">{label}</p>
    </div>
  );
}

function FloatCard({
  icon: Icon,
  title,
  className,
  ...motionProps
}: {
  icon: typeof ShieldCheck;
  title: string;
  className?: string;
} & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      {...motionProps}
      className={cn(
        "absolute z-10 flex items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-3 shadow-card ring-1 ring-black/5 backdrop-blur",
        className,
      )}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-soft text-brand">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="text-sm font-bold leading-tight text-brand-ink">{title}</p>
    </motion.div>
  );
}

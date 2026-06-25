"use client";

import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Navigation,
  Siren,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";

export function Contact() {
  const { t, locale } = useLanguage();
  const c = t.contact;
  const waMsg =
    locale === "ar"
      ? "مرحبًا، أرغب بحجز خدمة أو الاستفسار."
      : "Hi AlHadi Cooling, I'd like to book a service or ask a question.";

  return (
    <section id="contact" className="section scroll-mt-20 bg-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={c.eyebrow}
            title={c.title}
            subtitle={c.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: contact details */}
          <Reveal className="flex flex-col gap-4">
            {/* Emergency highlight */}
            <div className="flex items-start gap-4 rounded-2xl border border-warm/30 bg-warm/10 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-warm/15 text-warm">
                <Siren className="h-6 w-6" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="font-bold text-brand-ink">{c.emergencyTitle}</p>
                <p className="mt-0.5 text-sm text-brand-muted">
                  {c.emergencySubtitle}
                </p>
                <CtaButton
                  href={site.telHref}
                  variant="call"
                  className="mt-3"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {t.cta.call}
                </CtaButton>
              </div>
            </div>

            {/* Primary actions */}
            <div className="grid gap-3 sm:grid-cols-2">
              <ActionCard
                href={site.telHref}
                icon={Phone}
                label={c.labels.phone}
                value={site.phoneDisplay}
                tone="call"
              />
              <ActionCard
                href={site.whatsappHref(waMsg)}
                icon={MessageCircle}
                label={c.labels.whatsapp}
                value={site.phoneDisplay}
                tone="whatsapp"
                external
              />
            </div>

            {/* Info rows */}
            <InfoCard
              href={site.emailHref}
              icon={Mail}
              label={c.labels.email}
              value={site.email}
            />
            <InfoCard
              href={site.mapDirectionsHref}
              icon={MapPin}
              label={c.labels.address}
              value={site.address[locale]}
              action={c.labels.directions}
              external
            />
            <InfoCard
              icon={Clock}
              label={c.labels.hours}
              value={site.hours[locale]}
              note={site.emergency[locale]}
            />
          </Reveal>

          {/* Right: map */}
          <Reveal delay={0.1} className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-2xl border border-border shadow-card">
              <div className="aspect-[4/3] w-full lg:aspect-auto lg:h-[460px]">
                <iframe
                  src={site.mapEmbedSrc}
                  title={c.labels.mapTitle}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
            <CtaButton
              href={site.mapDirectionsHref}
              variant="outline"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              {c.labels.directions}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ActionCard({
  href,
  icon: Icon,
  label,
  value,
  tone,
  external,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  tone: "call" | "whatsapp";
  external?: boolean;
}) {
  const ext = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...ext}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40"
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${
          tone === "whatsapp" ? "bg-whatsapp" : "bg-brand"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-brand-muted">{label}</span>
        <span className="block font-bold text-brand-ink" dir="ltr">
          {value}
        </span>
      </span>
    </a>
  );
}

function InfoCard({
  href,
  icon: Icon,
  label,
  value,
  note,
  action,
  external,
}: {
  href?: string;
  icon: LucideIcon;
  label: string;
  value: string;
  note?: string;
  action?: string;
  external?: boolean;
}) {
  const ext = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-soft text-brand">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-brand-muted">{label}</span>
        <span className="block font-medium text-brand-ink">{value}</span>
        {note && (
          <span className="mt-1 inline-block text-xs font-semibold text-warm">
            {note}
          </span>
        )}
        {action && (
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand">
            {action}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </span>
        )}
      </span>
    </>
  );

  const base =
    "flex items-start gap-3 rounded-2xl border border-border bg-white p-5 shadow-card";

  return href ? (
    <a
      href={href}
      {...ext}
      className={`${base} group transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40`}
    >
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}

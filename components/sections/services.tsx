"use client";

import {
  AirVent,
  Wrench,
  Settings2,
  Gauge,
  Fan,
  Refrigerator,
  WashingMachine,
  Snowflake,
  GlassWater,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [
  AirVent, // 0 AC Installation
  Wrench, // 1 AC Repair
  Settings2, // 2 AC Maintenance
  Gauge, // 3 AC Gas Refill
  Fan, // 4 Duct Cleaning
  Refrigerator, // 5 Refrigerator Repair
  WashingMachine, // 6 Washing Machine Repair
  Snowflake, // 7 Freezer Repair
  GlassWater, // 8 Water Cooler Repair
];

type Variant = "dark" | "soft" | "plain";

// Bento order + emphasis: AC Repair (dark hero tile) and AC Installation (soft
// wide tile) lead, the rest follow as compact tiles.
const ORDER = [1, 0, 2, 3, 4, 5, 6, 7, 8];
const FEATURE: Record<number, Variant> = { 1: "dark", 0: "soft" };

export function Services() {
  const { t, locale } = useLanguage();
  const bookLabel = locale === "ar" ? "احجز عبر واتساب" : "Book on WhatsApp";

  const bookMsg = (service: string) =>
    locale === "ar"
      ? `أرغب بحجز خدمة: ${service}. هل يمكنكم إفادتي بالموعد والسعر؟`
      : `I'd like to book: ${service}. Could you share availability and pricing?`;

  const generalMsg =
    locale === "ar"
      ? "مرحبًا، لدي استفسار عن خدمة غير مذكورة. هل يمكنكم المساعدة؟"
      : "Hi, I have a question about a service that isn't listed. Can you help?";

  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ORDER.map((idx, pos) => {
            const item = t.services.items[idx];
            const Icon = ICONS[idx] ?? Wrench;
            const variant: Variant = FEATURE[idx] ?? "plain";
            const isFeature = variant !== "plain";
            return (
              <Reveal
                as="article"
                key={item.title}
                delay={(pos % 4) * 0.05}
                className={cn(
                  "group",
                  isFeature ? "col-span-2" : "col-span-1",
                )}
              >
                <ServiceTile
                  variant={variant}
                  Icon={Icon}
                  title={item.title}
                  desc={item.desc}
                  href={site.whatsappHref(bookMsg(item.title))}
                  bookLabel={bookLabel}
                />
              </Reveal>
            );
          })}

          {/* "Not listed" CTA tile fills the final grid slot */}
          <Reveal className="col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-dashed border-brand/30 bg-sky-soft/50 p-5">
              <p className="text-sm font-semibold text-brand-ink">
                {t.services.more.text}
              </p>
              <CtaButton
                href={site.whatsappHref(generalMsg)}
                variant="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t.services.more.cta}
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceTile({
  variant,
  Icon,
  title,
  desc,
  href,
  bookLabel,
}: {
  variant: Variant;
  Icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  bookLabel: string;
}) {
  const dark = variant === "dark";
  const soft = variant === "soft";
  const isFeature = dark || soft;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-5 shadow-card transition-all duration-200 hover:-translate-y-1 sm:p-6",
        dark && "border-transparent text-white",
        soft && "border-brand/10 bg-sky-soft",
        variant === "plain" && "border-border bg-white hover:border-brand/40",
        soft && "hover:border-brand/30",
      )}
      style={
        dark
          ? {
              backgroundImage:
                "linear-gradient(155deg,#0e3a5c 0%,#0c4f86 55%,#0a6bb8 100%)",
            }
          : undefined
      }
    >
      <span
        className={cn(
          "grid place-items-center rounded-xl transition-colors duration-200",
          isFeature ? "h-12 w-12" : "h-11 w-11",
          dark
            ? "bg-white/15 text-white"
            : "bg-sky-soft text-brand group-hover:bg-brand group-hover:text-white",
          soft && "bg-white",
        )}
      >
        <Icon className={isFeature ? "h-6 w-6" : "h-5 w-5"} aria-hidden />
      </span>

      <h3
        className={cn(
          "mt-4 font-bold",
          isFeature ? "text-xl" : "text-base",
          dark ? "text-white" : "text-brand-ink",
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "mt-2 flex-1 leading-relaxed",
          isFeature ? "text-sm" : "text-[13px]",
          dark ? "text-white/80" : "text-brand-muted",
        )}
      >
        {desc}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${bookLabel}: ${title}`}
        className={cn(
          "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
          dark ? "text-white hover:text-sky" : "text-brand hover:text-brand-ink",
        )}
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        {bookLabel}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          aria-hidden
        />
      </a>
    </div>
  );
}

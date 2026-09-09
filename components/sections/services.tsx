"use client";

import {
  AirVent,
  Refrigerator,
  WashingMachine,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";

/**
 * Services grouped by appliance family rather than laid out as one flat grid.
 *
 * The previous bento gave AC two feature tiles and buried refrigeration and
 * laundry among seven equal squares, which told a fridge customer this is an
 * AC company. Three columns of equal weight, each led by a real job photo,
 * says the opposite.
 *
 * Indexes map into t.services.items so the footer keeps its flat list.
 */
const CATEGORIES: {
  icon: LucideIcon;
  photo: string;
  itemIndexes: number[];
}[] = [
  { icon: AirVent, photo: "/images/work-install.webp", itemIndexes: [1, 0, 2, 3, 4] },
  { icon: Refrigerator, photo: "/images/work-fridge.webp", itemIndexes: [5, 7, 8] },
  { icon: WashingMachine, photo: "/images/work-washer.webp", itemIndexes: [6] },
];

export function Services() {
  const { t, locale } = useLanguage();

  const bookMsg = (service: string) =>
    locale === "ar"
      ? `أرغب بحجز خدمة: ${service}. هل يمكنكم إفادتي بالموعد والسعر؟`
      : `I'd like to book: ${service}. Could you share availability and pricing?`;

  const generalMsg =
    locale === "ar"
      ? "مرحبًا، لدي استفسار عن خدمة غير مذكورة. هل يمكنكم المساعدة؟"
      : "Hi, I have a question about a service that isn't listed. Can you help?";

  return (
    <section id="services" className="section scroll-mt-24 bg-paper">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CATEGORIES.map((cat, ci) => {
            const meta = t.services.categories[ci];
            const Icon = cat.icon;
            return (
              <Reveal
                as="article"
                key={meta.name}
                delay={ci * 0.07}
                className="flex h-full"
              >
                <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-white">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.photo}
                      alt=""
                      width={520}
                      height={280}
                      loading="lazy"
                      className="h-40 w-full object-cover"
                    />
                    <span className="absolute bottom-0 flex items-center gap-2 rounded-tl-lg bg-white px-3.5 py-2.5 text-brand ltr:right-0 ltr:rounded-tl-lg rtl:left-0 rtl:rounded-tl-none rtl:rounded-tr-lg">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="display text-xl text-brand-ink">
                      {meta.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
                      {meta.tagline}
                    </p>

                    <ul className="mt-5 flex-1 divide-y divide-border border-y border-border">
                      {cat.itemIndexes.map((idx) => {
                        const item = t.services.items[idx];
                        if (!item) return null;
                        return (
                          <li key={item.title}>
                            <a
                              href={site.whatsappHref(bookMsg(item.title))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between gap-3 py-3 text-sm font-semibold text-brand-ink transition-colors hover:text-brand"
                            >
                              {item.title}
                              <ArrowRight
                                className="h-4 w-4 shrink-0 text-sky opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                                aria-hidden
                              />
                            </a>
                          </li>
                        );
                      })}
                    </ul>

                    <CtaButton
                      href={site.whatsappHref(bookMsg(meta.name))}
                      variant="outline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      {t.cta.bookNow}
                    </CtaButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-dashed border-brand/35 bg-sky-soft px-6 py-5 sm:flex-row">
            <p className="text-sm font-semibold text-brand-ink">
              {t.services.more.text}
            </p>
            <CtaButton
              href={site.whatsappHref(generalMsg)}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t.services.more.cta}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

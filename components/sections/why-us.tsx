"use client";

import {
  Zap,
  Users,
  Tag,
  ShieldCheck,
  Cog,
  MapPin,
  Phone,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";

const ICONS: LucideIcon[] = [Zap, Users, Tag, ShieldCheck, Cog, MapPin];

export function WhyUs() {
  const { t, locale } = useLanguage();
  const waMsg =
    locale === "ar"
      ? "مرحبًا، أرغب بالحصول على عرض سعر مجاني."
      : "Hi AlHadi Cooling, I'd like a free quote please.";

  return (
    <section
      id="why-us"
      className="section scroll-mt-20 bg-sky-soft/40"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t.why.eyebrow}
            title={t.why.title}
            subtitle={t.why.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <Reveal
                as="article"
                key={item.title}
                delay={(i % 3) * 0.06}
                className="group h-full"
              >
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-brand-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-brand-muted">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Proof stats band + CTA */}
        <Reveal className="mt-14">
          <div
            className="overflow-hidden rounded-3xl p-8 text-white lg:p-12"
            style={{
              backgroundImage:
                "linear-gradient(135deg,#0e3a5c 0%,#0a2740 55%,#0c4f86 100%)",
            }}
          >
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {t.why.stats.map((s) => (
                <div key={s.label} className="text-center lg:text-start">
                  <p className="text-3xl font-extrabold leading-none sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-white/75">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold">{t.why.cta.title}</p>
                <p className="mt-1 text-sm text-white/75">
                  {t.why.cta.subtitle}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <CtaButton href={site.telHref} variant="call" className="px-6">
                  <Phone className="h-5 w-5" aria-hidden />
                  {t.cta.call}
                </CtaButton>
                <CtaButton
                  href={site.whatsappHref(waMsg)}
                  variant="whatsapp"
                  className="px-6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {t.cta.getQuote}
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

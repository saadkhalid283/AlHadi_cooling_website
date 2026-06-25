"use client";

import { useState } from "react";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(0);
  const waMsg =
    locale === "ar"
      ? "مرحبًا، لدي سؤال قبل الحجز."
      : "Hi AlHadi Cooling, I have a question before booking.";

  return (
    <section id="faq" className="section scroll-mt-20 bg-sky-soft/40">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        {/* Left: heading + help card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow={t.faq.eyebrow}
              title={t.faq.title}
              subtitle={t.faq.subtitle}
              align="start"
            />
          </Reveal>
          <Reveal className="mt-8" delay={0.1}>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <p className="font-bold text-brand-ink">{t.faq.help.title}</p>
              <p className="mt-1 text-sm text-brand-muted">
                {t.faq.help.subtitle}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <CtaButton href={site.telHref} variant="call" className="flex-1">
                  <Phone className="h-4 w-4" aria-hidden />
                  {t.cta.call}
                </CtaButton>
                <CtaButton
                  href={site.whatsappHref(waMsg)}
                  variant="whatsapp"
                  className="flex-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t.cta.whatsapp}
                </CtaButton>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: accordion */}
        <Reveal as="ul" className="flex flex-col gap-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-card"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start text-base font-bold text-brand-ink transition-colors hover:text-brand"
                  >
                    {item.q}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-brand transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-brand-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

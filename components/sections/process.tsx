"use client";

import { MessageCircle, Receipt, Truck, BadgeCheck, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const ICONS: LucideIcon[] = [MessageCircle, Receipt, Truck, BadgeCheck];

/**
 * The objection this section removes: "what am I actually signing up for if I
 * call?" Stating the price step explicitly is the whole point — it is the
 * single biggest reason a home-services lead goes cold.
 *
 * Rendered as a numbered rail on a dark band so the page has one section that
 * is not another grid of white cards.
 */
export function Process() {
  const { t } = useLanguage();

  return (
    <section className="section scroll-mt-24 bg-brand-ink">
      <div className="container-page">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow !text-sky before:!bg-sky/50">
              {t.process.eyebrow}
            </span>
            <h2 className="display mt-3 text-[2rem] text-white sm:text-[2.6rem]">
              {t.process.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
              {t.process.subtitle}
            </p>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => {
            const Icon = ICONS[i] ?? MessageCircle;
            return (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.06}
                className="bg-brand-ink"
              >
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-sky">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="display text-3xl leading-none text-white/20"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

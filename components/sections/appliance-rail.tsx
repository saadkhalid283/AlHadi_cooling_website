"use client";

import {
  AirVent,
  Refrigerator,
  WashingMachine,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { site } from "@/lib/site";

const ICONS: LucideIcon[] = [AirVent, Refrigerator, WashingMachine];

/**
 * Three equal-weight entry points sitting at the fold.
 *
 * The old hero sold "AC" and buried refrigeration and laundry in a 9-item
 * services grid, so those leads never saw themselves on the page. Each card
 * here is a WhatsApp deep link carrying its own appliance context, so the
 * customer's first message already says what is broken.
 */
export function ApplianceRail() {
  const { t, locale } = useLanguage();

  return (
    <div className="relative border-y border-sky-line bg-paper-alt">
      <div className="container-page py-8 lg:py-10">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.14em] text-brand-muted rtl:tracking-normal rtl:text-base">
          {t.hero.appliances.heading}
        </h2>

        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {t.hero.appliances.items.map((item, i) => {
            const Icon = ICONS[i] ?? AirVent;
            return (
              <li key={item.label}>
                <a
                  href={site.whatsappHref(item.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-lg border border-border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lift focus-visible:-translate-y-0.5 focus-visible:border-brand"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-sky-soft text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-[22px] w-[22px]" aria-hidden />
                    </span>
                    <span className="text-[0.95rem] font-bold leading-tight text-brand-ink">
                      {item.label}
                    </span>
                  </span>

                  {/* Symptoms, not service names — people search by what they see. */}
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.symptoms.map((s) => (
                      <li
                        key={s}
                        className="rounded border border-ember-soft bg-ember-soft px-2 py-1 text-[0.7rem] font-semibold text-ember-ink"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                    {t.hero.appliances.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      aria-hidden
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

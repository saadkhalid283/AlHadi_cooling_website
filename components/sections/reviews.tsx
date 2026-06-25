"use client";

import type { CSSProperties } from "react";
import { Star, Quote, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Review = {
  rating: number;
  text: string;
  name: string;
  meta: string;
};

/**
 * Placeholder testimonials (swap for real ones before launch). No fake
 * "verified" badges or invented aggregate counts, per the agreed approach.
 * Displayed as a "Wall of Love": two CSS marquee rows scrolling opposite
 * ways, paused on hover/focus, disabled for reduced-motion.
 */
export function Reviews() {
  const { t, locale } = useLanguage();
  const waMsg =
    locale === "ar"
      ? "مرحبًا، أرغب بحجز خدمة. هل يمكنكم المساعدة؟"
      : "Hi AlHadi Cooling, I'd like to book a service. Can you help?";

  const items = t.reviews.items as Review[];
  const rowTwo = [...items].reverse();

  return (
    <section id="reviews" className="section scroll-mt-20 overflow-hidden">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t.reviews.eyebrow}
            title={t.reviews.title}
            subtitle={t.reviews.subtitle}
          />
        </Reveal>
      </div>

      <div
        className="mt-12 flex flex-col gap-5"
        role="region"
        aria-label={t.reviews.eyebrow}
      >
        <MarqueeRow items={items} duration="18s" />
        <MarqueeRow items={rowTwo} duration="22s" reverse />
      </div>

      <div className="container-page">
        <Reveal className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <p className="font-semibold text-brand-ink">{t.reviews.ctaText}</p>
          <CtaButton
            href={site.whatsappHref(waMsg)}
            variant="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            {t.cta.bookNow}
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: Review[];
  duration: string;
  reverse?: boolean;
}) {
  const group = (hidden: boolean) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((review, i) => (
        <ReviewCard key={`${hidden ? "b" : "a"}-${review.name}-${i}`} review={review} />
      ))}
    </div>
  );

  return (
    <div className="marquee" style={{ "--duration": duration } as CSSProperties}>
      <div className={cn("marquee__track", reverse && "marquee__track--reverse")}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-border bg-white p-6 shadow-card sm:w-[360px]">
      <Quote className="h-7 w-7 text-sky" aria-hidden />
      <div
        className="mt-3 flex gap-0.5 text-amber-400"
        aria-label={`${review.rating} / 5`}
      >
        {Array.from({ length: 5 }).map((_, s) => (
          <Star
            key={s}
            className="h-4 w-4"
            fill={s < review.rating ? "currentColor" : "none"}
            strokeWidth={s < review.rating ? 0 : 1.5}
            aria-hidden
          />
        ))}
      </div>

      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-ink">
        {review.text}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand">
          {review.name.trim().charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-bold text-brand-ink">
            {review.name}
          </span>
          <span className="block text-xs text-brand-muted">{review.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

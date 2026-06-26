"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

// Order matches t.gallery.captions.
const PHOTOS = [
  "/images/work-maintenance.webp",
  "/images/work-gasrefill.webp",
  "/images/work-install.webp",
  "/images/work-fridge.webp",
  "/images/work-washer.webp",
];

export function WorkGallery() {
  const { t } = useLanguage();
  const items = PHOTOS.map((src, i) => ({
    src,
    caption: t.gallery.captions[i] ?? "",
  }));

  const group = (hidden: boolean) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <figure
          key={`${hidden ? "b" : "a"}-${i}`}
          className="relative w-[280px] shrink-0 overflow-hidden rounded-2xl shadow-card ring-1 ring-black/5 sm:w-[340px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.caption}
            width={340}
            height={224}
            loading="lazy"
            className="h-52 w-full object-cover sm:h-56"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent"
          />
          <figcaption className="absolute bottom-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-ink shadow-sm backdrop-blur ltr:left-3 rtl:right-3">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <section className="section scroll-mt-20 overflow-hidden">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            subtitle={t.gallery.subtitle}
          />
        </Reveal>
      </div>

      <div
        className="mt-10 marquee"
        style={{ "--duration": "36s" } as CSSProperties}
      >
        <div className="marquee__track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}

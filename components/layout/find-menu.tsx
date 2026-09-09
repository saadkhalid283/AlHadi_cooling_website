"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Search, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { CtaButton } from "@/components/ui/cta-button";
import { buildIndex, search, type SearchEntry } from "@/lib/search";
import { site } from "@/lib/site";

/**
 * Mobile find-menu.
 *
 * The site had no mobile navigation at all — the primary nav is desktop-only —
 * so scrolling was the only way to reach any section. This is that missing menu,
 * with a filter field on top: tap the list, or type to narrow it. Typing is
 * matched through lib/search so "fridge", "ثلاجة" and "Refrigerator Repair" all
 * land on the same entry.
 */
export function FindMenu() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Sections + services + FAQ questions, all pointing at an anchor on the page.
  const entries = useMemo<SearchEntry[]>(() => {
    const sections: SearchEntry[] = [
      { label: t.nav.services, target: "services", group: t.menu.groups.sections },
      { label: t.nav.whyUs, target: "why-us", group: t.menu.groups.sections },
      { label: t.nav.reviews, target: "reviews", group: t.menu.groups.sections },
      { label: t.nav.faq, target: "faq", group: t.menu.groups.sections },
      { label: t.nav.contact, target: "contact", group: t.menu.groups.sections },
    ];
    const services: SearchEntry[] = t.services.items.map((s) => ({
      label: s.title,
      hint: s.desc,
      target: "services",
      group: t.menu.groups.services,
    }));
    const questions: SearchEntry[] = t.faq.items.map((f) => ({
      label: f.q,
      hint: f.a,
      target: "faq",
      group: t.menu.groups.questions,
    }));
    return [...sections, ...services, ...questions];
  }, [t]);

  const index = useMemo(() => buildIndex(entries), [entries]);
  const results = useMemo(() => search(index, query), [index, query]);

  // Group results in a stable order for rendering.
  const grouped = useMemo(() => {
    const order = [
      t.menu.groups.sections,
      t.menu.groups.services,
      t.menu.groups.questions,
    ];
    return order
      .map((g) => ({ group: g, items: results.filter((r) => r.group === g) }))
      .filter((g) => g.items.length > 0);
  }, [results, t]);

  // Lock background scroll and move focus into the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(id);
    };
  }, [open]);

  // Escape closes; Tab cycles within the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function go(target: string) {
    setOpen(false);
    setQuery("");
    // Let the panel unmount and the scroll lock lift before scrolling.
    window.setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      // Offset by the live sticky-header height rather than trusting each
      // section's scroll-mt, so the heading never lands under the header.
      const header = document.querySelector("header");
      const offset = header ? header.getBoundingClientRect().height + 12 : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduce ? "auto" : "smooth",
      });
    }, 80);
  }

  const waMsg =
    locale === "ar"
      ? "مرحبًا، أحتاج خدمة صيانة/إصلاح. هل يمكنكم المساعدة؟"
      : "Hi AlHadi Cooling, I need an AC / appliance service. Can you help?";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-2.5 text-sm font-bold text-brand-ink transition-colors hover:border-brand lg:hidden"
      >
        <Menu className="h-[18px] w-[18px]" aria-hidden />
        <span className="sr-only sm:not-sr-only">{t.menu.open}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-brand-ink/60"
            onClick={close}
            aria-hidden
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.menu.title}
            className="absolute inset-x-0 top-0 flex flex-col rounded-b-lg bg-paper shadow-lift"
          >
            {/* Filter */}
            <div className="flex items-center gap-2 border-b border-border p-3">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-steel ltr:left-3 rtl:right-3"
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.menu.placeholder}
                  aria-label={t.menu.title}
                  className="w-full rounded-md border border-border bg-white py-3 text-[0.95rem] text-brand-ink outline-none transition-colors placeholder:text-steel focus:border-brand ltr:pl-10 ltr:pr-3 rtl:pr-10 rtl:pl-3"
                />
              </div>
              <button
                type="button"
                onClick={close}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border bg-white text-brand-ink transition-colors hover:border-brand"
                aria-label={t.menu.close}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[62vh] overflow-y-auto overscroll-contain p-3">
              <p aria-live="polite" className="sr-only">
                {results.length}
              </p>

              {grouped.length === 0 ? (
                <div className="px-2 py-8 text-center">
                  <p className="text-sm text-brand-muted">{t.menu.noResults}</p>
                  <CtaButton
                    href={site.whatsappHref(waMsg)}
                    variant="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {t.cta.whatsapp}
                  </CtaButton>
                </div>
              ) : (
                grouped.map(({ group, items }) => (
                  <section key={group} className="mb-4 last:mb-0">
                    <h2 className="px-2 pb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-muted rtl:tracking-normal rtl:text-xs">
                      {group}
                    </h2>
                    <ul className="overflow-hidden rounded-md border border-border bg-white">
                      {items.map((item) => (
                        <li
                          key={`${item.group}-${item.label}`}
                          className="border-b border-border last:border-b-0"
                        >
                          <button
                            type="button"
                            onClick={() => go(item.target)}
                            className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-start transition-colors hover:bg-sky-soft"
                          >
                            <span className="text-[0.9rem] font-semibold leading-snug text-brand-ink">
                              {item.label}
                            </span>
                            <ArrowRight
                              className="h-4 w-4 shrink-0 text-sky rtl:rotate-180"
                              aria-hidden
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))
              )}
            </div>

            {/* Always-available actions, so the menu never dead-ends */}
            <div className="grid grid-cols-2 gap-2 border-t border-border p-3">
              <CtaButton href={site.telHref} variant="ember" className="w-full">
                <Phone className="h-4 w-4" aria-hidden />
                {t.cta.call}
              </CtaButton>
              <CtaButton
                href={site.whatsappHref(waMsg)}
                variant="whatsapp"
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t.cta.whatsapp}
              </CtaButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

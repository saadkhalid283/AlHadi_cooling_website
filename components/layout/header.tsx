"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { LangToggle } from "@/components/lang-toggle";
import { CtaButton } from "@/components/ui/cta-button";
import { Logo } from "@/components/brand/logo";
import { FindMenu } from "@/components/layout/find-menu";
import { site } from "@/lib/site";

export function Header() {
  const { t, locale } = useLanguage();

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#why-us", label: t.nav.whyUs },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur-sm">
      {/* Availability strip: the number is the product for a 24/7 trade. */}
      <div className="hidden border-b border-sky-line bg-brand-ink text-white lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[0.78rem]">
          <p className="flex items-center gap-2 font-medium text-white/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-whatsapp" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-whatsapp" />
            </span>
            {t.hero.status}
          </p>
          <a
            href={site.telHref}
            className="font-bold tracking-wide text-white transition-colors hover:text-sky"
            dir="ltr"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="container-page flex h-[68px] items-center justify-between gap-4">
        <a href="#top" aria-label={site.name[locale]}>
          <Logo markSize={34} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm font-semibold text-brand-ink transition-colors after:absolute after:-bottom-1.5 after:h-[2px] after:w-0 after:bg-brand after:transition-[width] after:duration-200 hover:text-brand hover:after:w-full ltr:after:left-0 rtl:after:right-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <FindMenu />
          <LangToggle />
          <CtaButton
            href={site.whatsappHref()}
            variant="whatsapp"
            className="hidden sm:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t.cta.whatsapp}
          </CtaButton>
          <CtaButton href={site.telHref} variant="ember">
            <Phone className="h-4 w-4" aria-hidden />
            {t.cta.call}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}

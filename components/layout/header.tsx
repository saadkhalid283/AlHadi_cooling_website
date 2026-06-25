"use client";

import { Phone } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { LangToggle } from "@/components/lang-toggle";
import { CtaButton } from "@/components/ui/cta-button";
import { Logo } from "@/components/brand/logo";
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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label={site.name[locale]}>
          <Logo markSize={34} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-brand-ink transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <CtaButton
            href={site.telHref}
            variant="call"
            className="hidden sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {t.cta.call}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}

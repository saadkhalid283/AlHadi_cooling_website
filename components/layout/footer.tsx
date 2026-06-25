"use client";

import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { LogoMark } from "@/components/brand/logo";
import { site } from "@/lib/site";

export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();
  const word =
    locale === "ar"
      ? { primary: "الهادي", secondary: "للتبريد" }
      : { primary: "AlHadi", secondary: "Cooling" };

  const waMsg =
    locale === "ar"
      ? "مرحبًا، أرغب بحجز خدمة."
      : "Hi AlHadi Cooling, I'd like to book a service.";

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#why-us", label: t.nav.whyUs },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-brand-deep text-white/70">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <span className="inline-flex items-center gap-2.5 text-white">
              <LogoMark size={36} tone="mono" />
              <span className="text-lg font-extrabold tracking-tight">
                {word.primary} <span className="text-sky">{word.secondary}</span>
              </span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {site.tagline[locale]}. {t.contact.emergencySubtitle}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              {locale === "ar" ? "روابط سريعة" : "Quick links"}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-sky"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.nav.services}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {t.services.items.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="transition-colors hover:text-sky"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.nav.contact}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.telHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-sky"
                >
                  <Phone className="h-4 w-4 shrink-0 text-sky" aria-hidden />
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-sky"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-sky" aria-hidden />
                  {t.cta.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-sky"
                >
                  <Mail className="h-4 w-4 shrink-0 text-sky" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden />
                <span>{site.address[locale]}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden />
                <span>{site.hours[locale]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs text-white/50">
          © {year} {site.name[locale]}. {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </div>
      </div>
    </footer>
  );
}

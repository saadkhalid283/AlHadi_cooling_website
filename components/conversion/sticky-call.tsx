"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Phone-only floating Call / WhatsApp bar.
 *
 * It stays out of the way while the hero's own Call and WhatsApp buttons are
 * on screen (otherwise the first screen shows the same two actions twice) and
 * slides in once those have scrolled away, so the actions are always one tap
 * away without crowding the opening view.
 */
export function StickyCall() {
  const { t, locale } = useLanguage();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-ctas");
    if (!target || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      // Show only once the hero buttons have left the top of the screen.
      setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const message =
    locale === "ar"
      ? "مرحبًا، أحتاج خدمة صيانة/إصلاح. هل يمكنكم المساعدة؟"
      : "Hi AlHadi Cooling, I need an AC / appliance service. Can you help?";

  return (
    <div
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-2 gap-2 rounded-xl border border-white/60 bg-paper/90 p-1.5 shadow-lift backdrop-blur-md transition-[transform,opacity] duration-300 ease-out sm:hidden",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0",
      )}
    >
      <a
        href={site.telHref}
        tabIndex={shown ? undefined : -1}
        className="cta-ringer cta-ringer-call flex items-center justify-center gap-2 rounded-lg bg-ember-cta py-3 text-[0.95rem] font-bold text-white active:brightness-95"
      >
        <Phone className="cta-ringer-icon h-[18px] w-[18px]" aria-hidden />
        {t.cta.call}
      </a>
      <a
        href={site.whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={shown ? undefined : -1}
        className="cta-ringer cta-ringer-wa flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 text-[0.95rem] font-bold text-white active:brightness-95"
      >
        <WhatsAppIcon className="cta-ringer-icon h-[18px] w-[18px]" aria-hidden />
        {t.cta.whatsapp}
      </a>
    </div>
  );
}

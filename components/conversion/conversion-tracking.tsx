"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CALL_CONVERSION_SEND_TO = "AW-18342747744/U4f0CMrfudccEOC8wKpE";
const WHATSAPP_CONVERSION_SEND_TO = "AW-18342747744/cWgxCJiOutccEOC8wKpE";

function isWhatsAppHref(href: string) {
  const value = href.toLowerCase();
  return (
    value.includes("wa.me") ||
    value.includes("api.whatsapp.com") ||
    value.startsWith("whatsapp://") ||
    value.includes("whatsapp")
  );
}

/**
 * Single delegated click listener for the whole site: tracks tel: and
 * WhatsApp link clicks as Google Ads conversions without touching each
 * call/WhatsApp button individually, and without blocking navigation.
 */
export function ConversionTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        window.gtag?.("event", "conversion", { send_to: CALL_CONVERSION_SEND_TO });
      } else if (isWhatsAppHref(href)) {
        window.gtag?.("event", "conversion", { send_to: WHATSAPP_CONVERSION_SEND_TO });
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}

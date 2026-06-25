"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * Original AlHadi Cooling mark: a 6-arm snowflake (cooling) built from a
 * single arm rotated six times, set in a rounded gradient badge.
 * `tone="mono"` renders flat in currentColor (e.g. footer on dark).
 */
export function LogoMark({
  size = 36,
  tone = "color",
  className,
}: {
  size?: number;
  tone?: "color" | "mono";
  className?: string;
}) {
  const uid = tone === "color" ? "lg-grad" : "lg-mono";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-hidden="true"
      className={className}
    >
      {tone === "color" && (
        <defs>
          <linearGradient id={uid} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(201 90% 44%)" />
            <stop offset="1" stopColor="hsl(205 74% 24%)" />
          </linearGradient>
        </defs>
      )}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="13"
        fill={tone === "color" ? `url(#${uid})` : "currentColor"}
      />
      <g
        stroke={tone === "color" ? "#fff" : "hsl(0 0% 100% / 0.96)"}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 24 24)`}>
            <line x1="24" y1="24" x2="24" y2="9.5" />
            <line x1="24" y1="13.5" x2="27.6" y2="10.2" />
            <line x1="24" y1="13.5" x2="20.4" y2="10.2" />
          </g>
        ))}
      </g>
      <circle cx="24" cy="24" r="2.6" fill={tone === "color" ? "hsl(189 84% 60%)" : "#fff"} />
    </svg>
  );
}

/** Full lockup: mark + two-tone wordmark, locale-aware. */
export function Logo({
  className,
  markSize = 36,
  showWordmark = true,
}: {
  className?: string;
  markSize?: number;
  showWordmark?: boolean;
}) {
  const { locale } = useLanguage();
  const word =
    locale === "ar"
      ? { primary: "الهادي", secondary: "للتبريد" }
      : { primary: "AlHadi", secondary: "Cooling" };

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} />
      {showWordmark && (
        <span className="text-lg font-extrabold leading-none tracking-tight">
          <span className="text-brand-ink">{word.primary}</span>{" "}
          <span className="text-brand">{word.secondary}</span>
        </span>
      )}
    </span>
  );
}

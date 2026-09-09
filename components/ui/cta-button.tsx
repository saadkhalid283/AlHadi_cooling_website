"use client";

import { cn } from "@/lib/utils";

type Variant = "call" | "whatsapp" | "outline" | "light" | "ember";

/**
 * Buttons sit on a 2px hard bottom edge rather than a blurred drop shadow —
 * it reads as a physical, pressable control and keeps the UI from looking
 * like a generic soft-shadow template. Pressing removes the edge.
 */
const variants: Record<Variant, string> = {
  call: "bg-brand text-white shadow-cta hover:brightness-[1.08] active:translate-y-[2px] active:shadow-none",
  ember:
    "bg-ember-cta text-white shadow-ember hover:brightness-[1.08] active:translate-y-[2px] active:shadow-none",
  whatsapp:
    "bg-whatsapp text-white hover:brightness-[1.08] active:translate-y-[2px] active:shadow-none [box-shadow:0_2px_0_#157A3E]",
  outline:
    "border border-border bg-white text-brand-ink hover:border-brand hover:text-brand active:translate-y-[1px]",
  light:
    "bg-white text-brand-ink shadow-card hover:bg-sky-soft active:translate-y-[1px]",
};

export function CtaButton({
  href,
  variant = "call",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md px-5 py-3 text-sm font-bold transition-[filter,transform,box-shadow,background-color,border-color] duration-150",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

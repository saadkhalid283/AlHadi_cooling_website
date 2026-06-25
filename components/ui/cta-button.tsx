"use client";

import { cn } from "@/lib/utils";

type Variant = "call" | "whatsapp" | "outline";

const variants: Record<Variant, string> = {
  call: "bg-brand text-white shadow-cta hover:brightness-110",
  whatsapp: "bg-whatsapp text-white shadow-cta hover:brightness-110",
  outline:
    "border border-border bg-white text-brand-ink hover:border-brand hover:text-brand",
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
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

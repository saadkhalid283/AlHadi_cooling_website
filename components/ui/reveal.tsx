"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-into-view reveal. Renders VISIBLE in static HTML (resilient to no-JS
 * and good for SEO); only after mount does it arm the hidden state and animate
 * in on intersection. Respects prefers-reduced-motion (stays visible, no motion).
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !shown;
  const style: CSSProperties = {
    opacity: hidden ? 0 : 1,
    transform: hidden ? "translateY(18px)" : "none",
    transition: armed ? "opacity .6s ease, transform .6s ease" : undefined,
    transitionDelay: armed ? `${delay}s` : undefined,
    willChange: armed ? "opacity, transform" : undefined,
  };

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

import { cn } from "@/lib/utils";

/** Shared section header: eyebrow + title + subtitle. Reused across sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-sm font-bold uppercase tracking-wider text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-3xl sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-brand-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

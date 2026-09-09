import { cn } from "@/lib/utils";

/**
 * Shared section header. The `align` prop exists so sections can break the
 * centered rhythm — six identically centered headings in a row is the single
 * biggest reason a page reads as machine-generated.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
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
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl text-start",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="display mt-3 text-[2rem] sm:text-[2.6rem]">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-brand-muted",
            align === "start" && "max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center rounded-full border border-primary/15 bg-primary-soft/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary",
            align === "center" && "mx-auto"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl",
          eyebrow ? "mt-4" : "mt-0"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

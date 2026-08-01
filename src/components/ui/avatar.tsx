import { cn, initials } from "@/lib/utils";

export function Avatar({
  src,
  name,
  className,
  size = "md",
}: {
  src?: string | null;
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl",
  };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover ring-2 ring-white shadow-sm",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary-soft font-semibold text-primary ring-2 ring-white shadow-sm",
        sizes[size],
        className
      )}
    >
      {initials(name || "?")}
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showTagline = false,
  href = "/",
}: {
  className?: string;
  showTagline?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-bold shadow-sm shadow-primary/30">
        R
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-slate-900">
          Reclu
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
            by ProgramBI
          </span>
        )}
      </span>
    </Link>
  );
}

import Link from "next/link";
import {
  BarChart3,
  Bug,
  Cloud,
  Code2,
  Headphones,
  Layers,
  Megaphone,
  Palette,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  BarChart3,
  Palette,
  Cloud,
  Bug,
  Layers,
  Smartphone,
  Sparkles,
  Megaphone,
  Headphones,
};

export function HomeCategories() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {CATEGORIES.map((cat) => {
        const Icon = ICON_MAP[cat.icon] ?? Code2;
        return (
          <Link
            key={cat.slug}
            href={`/empleos?categoria=${cat.slug}`}
            className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
          >
            <span className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/[0.04] transition group-hover:bg-primary/[0.08]" />
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/25">
              <Icon className="h-5 w-5" />
            </span>
            <span className="mt-3.5 text-sm font-semibold text-slate-800 transition-colors group-hover:text-primary">
              {cat.name}
            </span>
            <span className="mt-1 text-xs text-muted-foreground transition group-hover:text-primary/70">
              Ver vacantes →
            </span>
          </Link>
        );
      })}
    </div>
  );
}

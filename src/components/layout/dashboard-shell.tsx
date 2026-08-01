import Link from "next/link";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { LucideIcon, LogOut } from "lucide-react";

export function DashboardShell({
  children,
  nav,
  title,
  subtitle,
  homeHref,
  roleLabel,
}: {
  children: React.ReactNode;
  nav: { href: string; label: string; icon: LucideIcon; active?: boolean }[];
  title?: string;
  subtitle?: string;
  homeHref: string;
  roleLabel: string;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
          <div className="flex h-16 items-center border-b border-border px-5">
            <Logo href={homeHref} showTagline />
          </div>
          <div className="px-3 py-4">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {roleLabel}
            </p>
            <nav className="space-y-0.5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary-soft text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="absolute bottom-0 hidden w-64 border-t border-border p-3 lg:block">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Volver al sitio
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 sm:px-6 lg:px-8">
            <div>
              {title && (
                <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <Logo href={homeHref} />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-white lg:hidden">
        {nav.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium",
              item.active ? "text-primary" : "text-slate-500"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

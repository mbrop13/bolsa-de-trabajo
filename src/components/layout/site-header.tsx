"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, Search, X } from "lucide-react";

const nav = [
  { href: "/empleos", label: "Empleos" },
  { href: "/empresas", label: "Empresas" },
  { href: "/precios", label: "Precios" },
  { href: "/faq", label: "Ayuda" },
];

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenus = useCallback(() => {
    setOpen(false);
    setSearchOpen(false);
  }, []);

  useEffect(() => {
    closeMenus();
  }, [pathname, closeMenus]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      setScrolled(y > 12);

      // Always show near top or when mobile menus are open
      if (y < 48) {
        setHidden(false);
      } else if (!open && !searchOpen) {
        if (delta > 6 && y > 80) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/empleos?q=${encodeURIComponent(query)}` : "/empleos");
    closeMenus();
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-out will-change-transform",
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div
        className={cn(
          "border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300",
          scrolled || open || searchOpen
            ? "border-border/80 bg-white/90 shadow-sm shadow-slate-900/[0.04] backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md"
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          {/* Left: logo + nav */}
          <div className="flex min-w-0 items-center gap-8 lg:gap-10">
            <Logo showTagline className="shrink-0" />
            <nav
              className="hidden items-center gap-0.5 md:flex"
              aria-label="Principal"
            >
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary-soft text-primary"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: search + actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <form
              onSubmit={submitSearch}
              className="relative hidden w-48 lg:block xl:w-60"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar empleos..."
                className={cn(
                  "h-9 rounded-full border-slate-200/90 bg-slate-50/90 pl-9 pr-3 text-sm transition",
                  "focus-visible:border-primary/30 focus-visible:bg-white focus-visible:ring-primary/20"
                )}
                aria-label="Buscar empleos"
              />
            </form>

            <button
              type="button"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border text-slate-600 transition lg:hidden",
                searchOpen
                  ? "border-primary/30 bg-primary-soft text-primary"
                  : "border-border/80 bg-white hover:bg-slate-50"
              )}
              aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((v) => !v);
                setOpen(false);
              }}
            >
              {searchOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>

            <div className="mx-0.5 hidden h-5 w-px bg-slate-200 sm:block" />

            <Link href="/auth/login" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full font-medium text-slate-700"
              >
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/auth/registro" className="hidden sm:block">
              <Button
                size="sm"
                className="rounded-full font-medium shadow-sm shadow-primary/20"
              >
                Crear cuenta
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>

            <button
              type="button"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition md:hidden",
                open
                  ? "border-primary/30 bg-primary-soft text-primary"
                  : "border-border/80 bg-white text-slate-600 hover:bg-slate-50"
              )}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => {
                setOpen((v) => !v);
                setSearchOpen(false);
                setHidden(false);
              }}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile search panel */}
        <div
          className={cn(
            "overflow-hidden border-t border-border/70 bg-white transition-all duration-300 lg:hidden",
            searchOpen ? "max-h-24 opacity-100" : "max-h-0 border-t-0 opacity-0"
          )}
        >
          <div className="container-page py-3">
            <form onSubmit={submitSearch} className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                autoFocus={searchOpen}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cargo, empresa, skill..."
                className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10"
                aria-label="Buscar empleos"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-slate-900/20 backdrop-blur-[2px] transition-opacity duration-300 md:hidden sm:top-[4.25rem]",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
        onClick={closeMenus}
      />

      <div
        className={cn(
          "absolute inset-x-0 top-full z-50 border-b border-border/80 bg-white shadow-xl shadow-slate-900/10 transition-all duration-300 md:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        )}
      >
        <nav
          className="container-page flex flex-col gap-1 py-4"
          aria-label="Menú móvil"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 flex flex-col gap-2 border-t border-border/80 pt-4 sm:hidden">
            <Link href="/auth/login" onClick={closeMenus}>
              <Button variant="outline" className="w-full rounded-xl">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/auth/registro" onClick={closeMenus}>
              <Button className="w-full rounded-xl shadow-sm shadow-primary/20">
                Crear cuenta
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";

const nav = [
  { href: "/empleos", label: "Empleos" },
  { href: "/empresas", label: "Empresas" },
  { href: "/precios", label: "Precios" },
  { href: "/faq", label: "Ayuda" },
];

export function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/empleos?q=${encodeURIComponent(query)}` : "/empleos");
    setSearchOpen(false);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/95 backdrop-blur-md">
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Logo showTagline />
          <nav className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <form
            onSubmit={submitSearch}
            className="relative hidden w-52 lg:block xl:w-64"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar empleos..."
              className="h-9 border-slate-200 bg-slate-50/80 pl-9 text-sm focus-visible:bg-white"
              aria-label="Buscar empleos"
            />
          </form>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-slate-600 lg:hidden"
            aria-label="Buscar"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-4 w-4" />
          </button>
          <Link href="/auth/login" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="font-medium">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/auth/registro" className="hidden sm:block">
            <Button size="sm" className="font-medium shadow-sm shadow-primary/20">
              Crear cuenta
            </Button>
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-white px-4 py-3 lg:hidden">
          <form onSubmit={submitSearch} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar cargo, empresa..."
              className="pl-9"
            />
          </form>
        </div>
      )}

      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="container-page flex flex-col gap-0.5 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/auth/registro" onClick={() => setOpen(false)}>
                <Button className="w-full">Crear cuenta</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

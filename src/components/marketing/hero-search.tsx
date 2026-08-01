"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SHORTCUTS = [
  { label: "React", href: "/empleos?q=React" },
  { label: "Remoto", href: "/empleos?modalidad=remote" },
  { label: "Junior", href: "/empleos?seniority=junior" },
  { label: "Data", href: "/empleos?categoria=data-analytics" },
  { label: "Python", href: "/empleos?q=Python" },
];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/empleos?q=${encodeURIComponent(query)}` : "/empleos");
  }

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={submit}
        className="group relative flex flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/[0.03] transition focus-within:border-primary/40 focus-within:shadow-primary/10 sm:flex-row sm:items-center sm:gap-0 sm:p-1.5"
      >
        <div className="relative flex flex-1 items-center">
          <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400 sm:left-4" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cargo, skill o tecnología..."
            className="h-12 w-full rounded-xl bg-transparent pl-11 pr-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 sm:h-11 sm:pl-12"
            aria-label="Buscar empleos"
          />
        </div>
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />
        <div className="relative flex items-center px-1 sm:min-w-[9.5rem]">
          <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400 sm:left-3" />
          <span className="flex h-10 items-center pl-9 text-sm text-slate-500 sm:h-11">
            Todas · Remoto
          </span>
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-11 w-full shrink-0 rounded-xl px-5 shadow-md shadow-primary/25 sm:w-auto"
        >
          Buscar
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-400">Popular:</span>
        {SHORTCUTS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => router.push(s.href)}
            className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-primary/35 hover:bg-primary-soft hover:text-primary"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

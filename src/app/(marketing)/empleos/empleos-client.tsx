"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { JobCard } from "@/components/jobs/job-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { JobCardSkeleton } from "@/components/ui/skeleton";
import { useRecluStore } from "@/lib/store/reclu-store";
import { demoCategories } from "@/lib/demo-data";
import { SENIORITY, MODALITIES, labelOf } from "@/lib/constants";
import { Briefcase, Search, X } from "lucide-react";
import Link from "next/link";

export function EmpleosClient() {
  const store = useRecluStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [categoria, setCategoria] = useState(
    searchParams.get("categoria") || ""
  );
  const [seniority, setSeniority] = useState(
    searchParams.get("seniority") || ""
  );
  const [modalidad, setModalidad] = useState(
    searchParams.get("modalidad") || ""
  );

  // debounce search
  const [debouncedQ, setDebouncedQ] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategoria(searchParams.get("categoria") || "");
    setSeniority(searchParams.get("seniority") || "");
    setModalidad(searchParams.get("modalidad") || "");
  }, [searchParams]);

  const jobs = useMemo(
    () =>
      store.getPublishedJobs({
        q: debouncedQ || undefined,
        category: categoria || undefined,
        seniority: seniority || undefined,
        modality: modalidad || undefined,
      }),
    [store, debouncedQ, categoria, seniority, modalidad]
  );

  function syncUrl(next: {
    q?: string;
    categoria?: string;
    seniority?: string;
    modalidad?: string;
  }) {
    const params = new URLSearchParams();
    const qq = next.q ?? q;
    const c = next.categoria ?? categoria;
    const s = next.seniority ?? seniority;
    const m = next.modalidad ?? modalidad;
    if (qq) params.set("q", qq);
    if (c) params.set("categoria", c);
    if (s) params.set("seniority", s);
    if (m) params.set("modalidad", m);
    const qs = params.toString();
    router.replace(qs ? `/empleos?${qs}` : "/empleos", { scroll: false });
  }

  function clearAll() {
    setQ("");
    setCategoria("");
    setSeniority("");
    setModalidad("");
    router.replace("/empleos", { scroll: false });
  }

  const chips: { key: string; label: string; clear: () => void }[] = [];
  if (debouncedQ)
    chips.push({
      key: "q",
      label: `“${debouncedQ}”`,
      clear: () => {
        setQ("");
        syncUrl({ q: "" });
      },
    });
  if (categoria)
    chips.push({
      key: "cat",
      label:
        demoCategories.find((c) => c.slug === categoria)?.name || categoria,
      clear: () => {
        setCategoria("");
        syncUrl({ categoria: "" });
      },
    });
  if (seniority)
    chips.push({
      key: "sen",
      label: labelOf(SENIORITY, seniority),
      clear: () => {
        setSeniority("");
        syncUrl({ seniority: "" });
      },
    });
  if (modalidad)
    chips.push({
      key: "mod",
      label: labelOf(MODALITIES, modalidad),
      clear: () => {
        setModalidad("");
        syncUrl({ modalidad: "" });
      },
    });

  return (
    <div className="bg-surface min-h-[70vh]">
      <div className="relative overflow-hidden border-b border-border bg-hero">
        <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="container-page relative py-12 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Bolsa de trabajo
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explora oportunidades de empleo
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            {store.ready ? (
              <>
                <span className="font-semibold text-slate-800">
                  {jobs.length} vacantes
                </span>{" "}
                de empresas verificadas. Filtra por categoría, seniority y
                modalidad — con salarios visibles cuando la empresa los publica.
              </>
            ) : (
              "Cargando vacantes…"
            )}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                }}
                onBlur={() => syncUrl({ q })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") syncUrl({ q });
                }}
                placeholder="Buscar cargo, empresa o skill..."
                className="pl-9"
              />
            </div>
            <Select
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                syncUrl({ categoria: e.target.value });
              }}
            >
              <option value="">Todas las categorías</option>
              {demoCategories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Select
              value={seniority}
              onChange={(e) => {
                setSeniority(e.target.value);
                syncUrl({ seniority: e.target.value });
              }}
            >
              <option value="">Seniority</option>
              {SENIORITY.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
            <Select
              value={modalidad}
              onChange={(e) => {
                setModalidad(e.target.value);
                syncUrl({ modalidad: e.target.value });
              }}
            >
              <option value="">Modalidad</option>
              {MODALITIES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </Select>
          </div>

          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.clear}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary hover:bg-primary-soft-2"
                >
                  {c.label}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Limpiar todo
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container-page py-8">
        {!store.ready ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No hay vacantes con esos filtros"
            description="Prueba quitando filtros o vuelve más tarde."
            action={
              <Button variant="outline" onClick={clearAll}>
                Limpiar filtros
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          ¿Eres empresa?{" "}
          <Link
            href="/empresa/vacantes/nueva"
            className="text-primary hover:underline"
          >
            Publica una vacante
          </Link>
        </p>
      </div>
    </div>
  );
}

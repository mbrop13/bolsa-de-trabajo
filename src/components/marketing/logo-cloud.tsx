import Link from "next/link";
import { demoCompanies } from "@/lib/demo-data";

const AVATAR_TONES = [
  "from-sky-500 to-primary",
  "from-violet-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-cyan-500 to-blue-500",
];

export function LogoCloud() {
  const companies = demoCompanies.filter((c) => c.status === "approved");

  return (
    <section className="border-b border-border/80 bg-slate-50/60 py-12 sm:py-14">
      <div className="container-page">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Empresas verificadas publican en Reclu
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {companies.map((c, i) => (
            <Link
              key={c.id}
              href={`/empresas/${c.slug}`}
              className="group flex items-center gap-2.5 rounded-2xl border border-border/80 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white shadow-sm ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
              >
                {c.name.charAt(0)}
              </span>
              <span className="text-sm font-semibold text-slate-700 transition group-hover:text-primary">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

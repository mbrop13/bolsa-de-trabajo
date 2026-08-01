import Link from "next/link";
import { demoCompanies } from "@/lib/demo-data";

export function LogoCloud() {
  const companies = demoCompanies.filter((c) => c.status === "approved");

  return (
    <div className="border-y border-border bg-white py-10">
      <div className="container-page">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Empresas verificadas publican en Reclu
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {companies.map((c) => (
            <Link
              key={c.id}
              href={`/empresas/${c.slug}`}
              className="rounded-full border border-border bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

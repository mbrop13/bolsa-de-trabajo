"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DemoBanner } from "@/components/layout/demo-banner";
import {
  Briefcase,
  Building2,
  Home,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const store = useRecluStore();
  const companyId = store.ready
    ? store.getActiveCompanyId()
    : DEMO_SESSION.companyId;
  const newApps = store.ready
    ? store
        .getApplicationsForCompany(companyId)
        .filter((a) => a.status === "submitted").length
    : 0;
  const unread = store.ready
    ? store.getUnreadCount({ companyId })
    : 0;

  const nav = [
    {
      href: "/empresa",
      label: "Inicio",
      icon: Home,
      active: pathname === "/empresa",
    },
    {
      href: "/empresa/vacantes",
      label: "Vacantes",
      icon: Briefcase,
      active: pathname.startsWith("/empresa/vacantes"),
    },
    {
      href: "/empresa/candidatos",
      label: "Talento",
      icon: Users,
      active: pathname.startsWith("/empresa/candidatos"),
    },
    {
      href: "/empresa/mensajes",
      label: unread ? `Chat (${unread})` : "Chat",
      icon: MessageCircle,
      active: pathname.startsWith("/empresa/mensajes"),
    },
    {
      href: "/empresa/perfil",
      label: "Perfil",
      icon: Building2,
      active: pathname.startsWith("/empresa/perfil"),
    },
    {
      href: "/empresa/ajustes",
      label: "Ajustes",
      icon: Settings,
      active: pathname.startsWith("/empresa/ajustes"),
    },
  ];

  return (
    <>
      <DemoBanner />
      <DashboardShell
        nav={nav}
        homeHref="/empresa"
        roleLabel={
          newApps > 0 ? `Empresa · ${newApps} nuevas` : "Empresa"
        }
        title={nav.find((n) => n.active)?.label?.replace(/ \(\d+\)/, "")}
      >
        {children}
      </DashboardShell>
    </>
  );
}

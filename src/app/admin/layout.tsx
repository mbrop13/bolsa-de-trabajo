"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DemoBanner } from "@/components/layout/demo-banner";
import {
  Building2,
  Briefcase,
  Home,
  LayoutDashboard,
  Users,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const nav = [
    {
      href: "/admin",
      label: "Overview",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      href: "/admin/empresas",
      label: "Empresas",
      icon: Building2,
      active: pathname.startsWith("/admin/empresas"),
    },
    {
      href: "/admin/vacantes",
      label: "Vacantes",
      icon: Briefcase,
      active: pathname.startsWith("/admin/vacantes"),
    },
    {
      href: "/admin/usuarios",
      label: "Usuarios",
      icon: Users,
      active: pathname.startsWith("/admin/usuarios"),
    },
    {
      href: "/",
      label: "Sitio",
      icon: Home,
      active: false,
    },
  ];

  return (
    <>
      <DemoBanner />
      <DashboardShell
        nav={nav}
        homeHref="/admin"
        roleLabel="Admin ProgramBI"
        title={nav.find((n) => n.active)?.label || "Admin"}
      >
        {children}
      </DashboardShell>
    </>
  );
}

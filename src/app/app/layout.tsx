"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DemoBanner } from "@/components/layout/demo-banner";
import {
  Bookmark,
  Briefcase,
  Home,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const store = useRecluStore();
  const unread = store.ready
    ? store.getUnreadCount({ candidateId: DEMO_SESSION.candidateId })
    : 0;

  const nav = [
    { href: "/app", label: "Inicio", icon: Home, active: pathname === "/app" },
    {
      href: "/app/perfil",
      label: "Mi perfil",
      icon: User,
      active: pathname.startsWith("/app/perfil"),
    },
    {
      href: "/app/postulaciones",
      label: "Postulaciones",
      icon: Briefcase,
      active: pathname.startsWith("/app/postulaciones"),
    },
    {
      href: "/app/mensajes",
      label: unread ? `Chat (${unread})` : "Chat",
      icon: MessageCircle,
      active: pathname.startsWith("/app/mensajes"),
    },
    {
      href: "/app/guardados",
      label: "Guardados",
      icon: Bookmark,
      active: pathname.startsWith("/app/guardados"),
    },
    {
      href: "/app/ajustes",
      label: "Ajustes",
      icon: Settings,
      active: pathname.startsWith("/app/ajustes"),
    },
  ];

  return (
    <>
      <DemoBanner />
      <DashboardShell
        nav={nav}
        homeHref="/app"
        roleLabel="Candidato"
        title={nav.find((n) => n.active)?.label?.replace(/ \(\d+\)/, "")}
      >
        {children}
      </DashboardShell>
    </>
  );
}

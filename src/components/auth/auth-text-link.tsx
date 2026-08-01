"use client";

import {
  useAuthModal,
  type AuthMode,
  type AuthRole,
} from "./auth-modal-provider";
import { cn } from "@/lib/utils";

/** Link de texto que abre el modal de auth (para footers, etc.) */
export function AuthTextLink({
  mode = "login",
  role,
  children,
  className,
}: {
  mode?: AuthMode;
  role?: AuthRole;
  children: React.ReactNode;
  className?: string;
}) {
  const { openAuth } = useAuthModal();
  return (
    <button
      type="button"
      onClick={() => openAuth({ mode, role })}
      className={cn("hover:text-primary", className)}
    >
      {children}
    </button>
  );
}

"use client";

import type { ReactNode } from "react";
import { AuthModalProviderInner } from "./auth-modal-context";
import { AuthModal } from "./auth-modal";

export function AuthModalProvider({ children }: { children: ReactNode }) {
  return (
    <AuthModalProviderInner>
      {children}
      <AuthModal />
    </AuthModalProviderInner>
  );
}

export { useAuthModal } from "./auth-modal-context";
export type { AuthMode, AuthRole, OpenAuthOptions } from "./auth-modal-context";

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** login | register (candidato) | company (registro empresa extendido) */
export type AuthMode = "login" | "register" | "company";
export type AuthRole = "candidate" | "company";

export type OpenAuthOptions = {
  mode?: AuthMode;
  /** Atajo: role company abre el formulario de empresa */
  role?: AuthRole;
};

type AuthModalContextValue = {
  open: boolean;
  mode: AuthMode;
  openAuth: (options?: OpenAuthOptions) => void;
  closeAuth: () => void;
  setMode: (mode: AuthMode) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProviderInner({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const openAuth = useCallback((options?: OpenAuthOptions) => {
    if (options?.role === "company") {
      setMode("company");
    } else if (options?.mode === "register" && options?.role === "candidate") {
      setMode("register");
    } else if (options?.mode) {
      // Map legacy mode+role
      if (options.mode === "register" && !options.role) {
        setMode("register");
      } else {
        setMode(options.mode);
      }
    } else {
      setMode("login");
    }
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      mode,
      openAuth,
      closeAuth,
      setMode,
    }),
    [open, mode, openAuth, closeAuth]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}

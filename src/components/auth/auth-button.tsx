"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  useAuthModal,
  type AuthMode,
  type AuthRole,
} from "./auth-modal-provider";

type AuthButtonProps = ButtonProps & {
  mode?: AuthMode;
  role?: AuthRole;
};

/** Botón que abre el popup de login/registro */
export function AuthButton({
  mode = "login",
  role,
  onClick,
  children,
  ...props
}: AuthButtonProps) {
  const { openAuth } = useAuthModal();

  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        openAuth({ mode, role });
      }}
    >
      {children}
    </Button>
  );
}

import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Registro empresa" };

export default function RegistroEmpresaPage() {
  return (
    <RegisterForm
      role="company"
      title="Registrar empresa"
      description="Tu cuenta quedará pendiente de aprobación por el equipo Reclu"
      demoHref="/empresa"
    />
  );
}

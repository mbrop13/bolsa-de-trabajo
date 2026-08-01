import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Registro candidato" };

export default function RegistroCandidatoPage() {
  return (
    <RegisterForm
      role="candidate"
      title="Crear perfil de candidato"
      description="Construye un perfil profesional y empieza a postular"
      demoHref="/app"
    />
  );
}

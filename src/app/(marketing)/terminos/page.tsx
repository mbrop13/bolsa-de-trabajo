export const metadata = { title: "Términos" };

export default function TerminosPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="text-3xl font-bold">Términos de uso</h1>
      <p className="mt-4 text-muted-foreground">Última actualización: julio 2026</p>
      <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
        <p>
          Al usar Reclu aceptas publicar información veraz en perfiles y
          vacantes. ProgramBI puede suspender cuentas por abuso, spam o
          contenido engañoso.
        </p>
        <p>
          Las empresas deben ser aprobadas antes de publicar empleos. Reclu no
          garantiza la contratación ni es parte de la relación laboral entre
          candidato y empresa.
        </p>
        <p>
          El servicio se ofrece “tal cual” durante el lanzamiento. Las
          condiciones de planes de pago se publicarán cuando existan.
        </p>
      </div>
    </div>
  );
}

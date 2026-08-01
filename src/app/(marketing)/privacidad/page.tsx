export const metadata = { title: "Privacidad" };

export default function PrivacidadPage() {
  return (
    <div className="container-page prose prose-slate max-w-3xl py-16">
      <h1 className="text-3xl font-bold">Política de privacidad</h1>
      <p className="mt-4 text-muted-foreground">
        Última actualización: julio 2026
      </p>
      <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
        <p>
          Reclu (operado por ProgramBI) trata datos personales para operar la
          bolsa de trabajo: cuentas, perfiles profesionales, CVs y
          postulaciones.
        </p>
        <p>
          Los candidatos controlan la visibilidad de su perfil. Las empresas
          solo acceden a datos de postulantes de sus vacantes o perfiles
          públicos según la configuración del usuario.
        </p>
        <p>
          No vendemos datos personales. Usamos proveedores de infraestructura
          (hosting, base de datos, almacenamiento) bajo contratos de
          procesamiento.
        </p>
        <p>
          Para ejercer derechos de acceso, rectificación o eliminación,
          contacta a privacidad@programbi.com (ajusta este correo en producción).
        </p>
      </div>
    </div>
  );
}

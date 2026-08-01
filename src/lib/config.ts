/**
 * Configuración de entorno de la plataforma.
 * Separar "datos locales" de "UI de desarrollo/demo".
 */

function hasSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      key &&
      !url.includes("your-project") &&
      !url.includes("placeholder")
  );
}

/** Estamos en build/runtime de producción (Vercel o NODE_ENV). */
export function isProductionRuntime() {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
  );
}

/**
 * ¿Usar store local / seed? (sin Supabase real).
 * En producción sin keys la app sigue funcionando con datos de ejemplo,
 * pero sin chrome de "demo".
 */
export function usesLocalData() {
  if (process.env.NEXT_PUBLIC_FORCE_LOCAL_DATA === "true") return true;
  if (process.env.NEXT_PUBLIC_FORCE_LOCAL_DATA === "false") return false;
  return !hasSupabaseEnv();
}

/**
 * Banner, botones "demo", reset, toasts "modo demo".
 * Solo en desarrollo local o si se fuerza explícitamente.
 */
export function showDevChrome() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return true;
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "false") return false;
  // Nunca en producción Vercel
  if (isProductionRuntime()) return false;
  return process.env.NODE_ENV === "development";
}

/**
 * Early access: se registran candidatos y empresas primero.
 * Las vacantes públicas / postulaciones se abren en el lanzamiento completo.
 * Las empresas SÍ pueden explorar talento desde su panel.
 *
 * Desactivar con NEXT_PUBLIC_EARLY_ACCESS=false
 */
export function isEarlyAccess() {
  if (process.env.NEXT_PUBLIC_EARLY_ACCESS === "false") return false;
  if (process.env.NEXT_PUBLIC_EARLY_ACCESS === "true") return true;
  // Por defecto activo hasta el lanzamiento completo
  return true;
}

/** Compat: nombre histórico usado en el código. */
export const DEMO_MODE = usesLocalData();

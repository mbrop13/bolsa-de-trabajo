import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware ligero para Edge (Vercel).
 * No importamos @supabase/ssr aquí: en Next.js 16 un fallo de bundle
 * del middleware puede devolver 404 en TODA la app en Vercel.
 *
 * Cuando configures Supabase, el refresh de sesión puede hacerse en
 * Server Components / layout con createClient() de @/lib/supabase/server.
 * Opcionalmente se puede reintroducir updateSession solo si las env existen
 * y se verifica en un preview deployment.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Excluir assets estáticos de Next.
     * Matcher simple y compatible con el Edge de Vercel.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

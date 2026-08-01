# Reclu — Bolsa de trabajo by ProgramBI

Bolsa de trabajo tech profesional para Latinoamérica.  
Stack: **Next.js · Supabase · Vercel**. Diseño modo claro con acento `#1890ff`.

## Qué incluye

| Rol | Capacidad |
|-----|-----------|
| **Candidato** | Perfil profesional detallado, postulaciones, guardados, badge ProgramBI |
| **Empresa** | Perfil, vacantes, inbox/pipeline (aprobación admin previa) |
| **Admin** | Aprobar/rechazar empresas, moderar vacantes, métricas |
| **Público** | Landing, empleos con filtros, directorio empresas, perfiles talento |

Sin Supabase configurado, la app corre en **modo demo** con datos de ejemplo.

## Inicio rápido (demo local)

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Accesos demo desde el banner o `/auth/login`:

- `/app` — panel candidato  
- `/empresa` — panel empresa  
- `/admin` — panel admin  

## Producción: Supabase + Vercel

### 1. Proyecto Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. SQL Editor → pega y ejecuta  
   `supabase/migrations/001_initial_schema.sql`
3. Storage → crea buckets:
   - `avatars` (público)
   - `company-logos` (público)
   - `resumes` (privado)
4. Authentication → Email habilitado (y Google OAuth si lo deseas).
5. Copia URL y anon key.

### 2. Variables de entorno

Copia `.env.example` → `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

### 3. Primer admin

1. Regístrate en la app (candidato o cualquier rol).
2. En Supabase SQL:

```sql
update public.profiles
set role = 'admin'
where email = 'tu-email@programbi.com';
```

### 4. Deploy Vercel

1. Sube el repo a GitHub.
2. Importa en Vercel.
3. Añade las mismas env vars.
4. Domain personalizado opcional.
5. En Supabase Auth → URL configuration:
   - Site URL: `https://tu-dominio.com`
   - Redirect: `https://tu-dominio.com/auth/callback`

## Estructura

```
src/app/
  (marketing)/     Landing, empleos, empresas, legales
  auth/            Login, registro, recuperar
  app/             Panel candidato
  empresa/         Panel empresa
  admin/           Panel admin
src/components/    UI + layout + jobs
src/lib/           constants, demo-data, supabase, utils
supabase/migrations/
```

## Flujos clave (implementados)

### 1. Publicar vacantes (empresa)
1. Empresa debe estar **aprobada** (`/admin/empresas`).
2. `/empresa/vacantes/nueva` → borrador o **Publicar ahora**.
3. La vacante aparece en `/empleos` y en el detalle con CTA de postulación.
4. Desde la lista: publicar, cerrar, reabrir, editar, inbox.

### 2. Postular (candidato)
1. Abrir vacante en `/empleos/[slug]` → **Postularme**.
2. Mensaje de presentación + snapshot de perfil/CV.
3. Una postulación activa por vacante (sin duplicados).
4. Seguimiento en `/app/postulaciones` (estados + retirar).
5. Guardar vacantes con **Guardar** → `/app/guardados`.

### 3. Contactar talento (empresa)
1. Solo empresas **aprobadas**.
2. Desde `/empresa/candidatos`, perfil `/talento/[username]` o inbox de postulaciones → **Contactar**.
3. Asunto + mensaje + vacante opcional.
4. Candidato ve y responde en `/app/mensajes`.
5. Empresa ve hilo en `/empresa/mensajes`.

### 4. Moderación
- Admin aprueba/rechaza/suspende empresas.
- Empresas no aprobadas no publican ni contactan.

### Persistencia
- **Demo:** `localStorage` (`reclu-production-store-v1`) — flujos completos en el navegador.
- **Producción:** migraciones SQL + RLS en `supabase/migrations/` (incl. `002_contacts_and_applications.sql`).

## Calidad producto (v premium)

- **Chat multi-mensaje** empresa ↔ candidato (`/app/mensajes`, `/empresa/mensajes`)
- Contactar abre hilo de chat (no solo 1 respuesta)
- Badges de no leídos en nav
- Validación **Zod** en postular / vacantes / contactar
- Perfil candidato con **CRUD real**
- Pipeline **Kanban + lista** de postulaciones
- Empleos con **filtros en URL**, debounce y chips
- Plantillas de mensaje, FAQ, onboarding
- SEO: sitemap, robots, JSON-LD JobPosting
- SQL: `003_chat_threads.sql`

## Scripts

```bash
npm run dev         # desarrollo
npm run build       # build producción
npm run start       # servir build
npm run lint        # eslint
npm run typecheck   # TypeScript
```

## Roadmap post-v1

- Stripe / planes empresa  
- Emails transaccionales (Resend)  
- Chat reclutador–candidato  
- Matching / recomendaciones IA  
- Multi-reclutador por empresa  

## Marca

- **Nombre:** Reclu  
- **Empresa:** ProgramBI  
- **Color primario:** `#1890ff`  
- **Idioma:** Español (LATAM)  

---

Hecho para lanzamiento en producción con calidad profesional.

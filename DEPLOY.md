# Deploy Vercel — checklist anti-404

## Causa más común del 404 en este proyecto

Con **Next.js 16**, un `middleware.ts` que importa `@supabase/ssr` puede **romper el routing en Edge** y devolver **404 en todas las rutas** aunque el build diga “Ready”.

**Solución aplicada:** middleware ligero sin dependencias pesadas.

## Configuración correcta en Vercel

1. **Framework Preset:** Next.js  
2. **Root Directory:** `.` (raíz del repo, vacío / no subcarpeta)  
3. **Build Command:** `npm run build`  
4. **Output Directory:** dejar vacío (Next lo gestiona)  
5. **Install Command:** `npm install`  
6. **Node.js Version:** 20.x (Project Settings → General)

## Variables de entorno (opcionales en demo)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

Sin Supabase la app funciona en **modo demo**.

## Tras un push

1. GitHub → main  
2. Vercel redespliega solo  
3. Abre la URL del deployment (no un dominio viejo sin asignar)

## Si sigue el 404

1. Vercel → Deployments → último deploy → **Building** logs: ¿falló el build?  
2. Settings → General → **Root Directory** debe estar vacío  
3. Redeploy con **Clear cache and redeploy**  
4. Confirma que el dominio apunta al proyecto correcto  

## Comandos locales

```bash
npm run build
npm run start
```

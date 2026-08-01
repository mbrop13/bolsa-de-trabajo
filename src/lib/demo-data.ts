import type {
  Application,
  CandidateProfile,
  Company,
  Job,
  Profile,
} from "@/types/database";
import { DEMO_MODE as CONFIG_DEMO, usesLocalData } from "@/lib/config";

/** @deprecated Prefer usesLocalData() / showDevChrome() from @/lib/config */
export const DEMO_MODE = CONFIG_DEMO;

export { usesLocalData };

const now = new Date().toISOString();
const daysAgo = (n: number) =>
  new Date(Date.now() - n * 86400000).toISOString();

export const demoCategories = [
  { id: "cat-1", name: "Programación", slug: "programacion" },
  { id: "cat-2", name: "Data & Analytics", slug: "data-analytics" },
  { id: "cat-3", name: "Diseño / UX", slug: "diseno-ux" },
  { id: "cat-4", name: "DevOps / Cloud", slug: "devops-cloud" },
  { id: "cat-5", name: "IA & Machine Learning", slug: "ia-ml" },
  { id: "cat-6", name: "Producto & Agile", slug: "producto" },
  { id: "cat-7", name: "QA / Testing", slug: "qa-testing" },
  { id: "cat-8", name: "Mobile", slug: "mobile" },
];

export const demoCompanies: Company[] = [
  {
    id: "co-1",
    owner_id: "u-company-1",
    name: "Nubix Labs",
    legal_name: "Nubix Labs SAS",
    slug: "nubix-labs",
    tagline: "Productos cloud para LATAM",
    description:
      "Somos una product company que construye herramientas SaaS B2B para fintech y retail en Latinoamérica. Cultura remota-first, ownership y aprendizaje continuo.",
    logo_url: null,
    cover_url: null,
    industry: "SaaS / Fintech",
    company_size: "51-200",
    founded_year: 2018,
    headquarters: "Ciudad de México, México",
    countries: ["México", "Colombia", "Chile"],
    website: "https://example.com",
    linkedin_url: "https://linkedin.com",
    tech_stack: ["TypeScript", "React", "Node.js", "AWS", "PostgreSQL"],
    benefits: ["Remoto", "Horario flexible", "Capacitación", "Equipamiento"],
    contact_email: "talent@nubix.example",
    status: "approved",
    rejection_reason: null,
    admin_notes: null,
    is_featured: true,
    reviewed_at: daysAgo(30),
    reviewed_by: "u-admin",
    created_at: daysAgo(60),
    updated_at: now,
  },
  {
    id: "co-2",
    owner_id: "u-company-2",
    name: "Andes Digital",
    legal_name: "Andes Digital SpA",
    slug: "andes-digital",
    tagline: "Consultoría tech con impacto",
    description:
      "Consultora de software boutique enfocada en transformación digital para empresas medianas. Equipos ágiles, calidad y cercanía con el cliente.",
    logo_url: null,
    cover_url: null,
    industry: "Consultoría",
    company_size: "11-50",
    founded_year: 2015,
    headquarters: "Santiago, Chile",
    countries: ["Chile", "Perú"],
    website: "https://example.com",
    linkedin_url: null,
    tech_stack: ["Java", "Spring", "Angular", "Azure"],
    benefits: ["Híbrido", "Bonos", "Día de cumpleaños"],
    contact_email: "rrhh@andes.example",
    status: "approved",
    rejection_reason: null,
    admin_notes: null,
    is_featured: true,
    reviewed_at: daysAgo(20),
    reviewed_by: "u-admin",
    created_at: daysAgo(40),
    updated_at: now,
  },
  {
    id: "co-3",
    owner_id: "u-company-3",
    name: "Orbit AI",
    legal_name: "Orbit Artificial Intelligence SL",
    slug: "orbit-ai",
    tagline: "IA aplicada a operaciones",
    description:
      "Startup que aplica LLMs y computer vision a procesos industriales y logísticos. Buscamos talento curioso y con ganas de experimentar.",
    logo_url: null,
    cover_url: null,
    industry: "Inteligencia Artificial",
    company_size: "11-50",
    founded_year: 2022,
    headquarters: "Buenos Aires, Argentina",
    countries: ["Argentina", "Remoto LATAM"],
    website: "https://example.com",
    linkedin_url: null,
    tech_stack: ["Python", "PyTorch", "FastAPI", "GCP", "Kubernetes"],
    benefits: ["Remoto 100%", "Equity", "Conferencias"],
    contact_email: "jobs@orbit.example",
    status: "approved",
    rejection_reason: null,
    admin_notes: null,
    is_featured: false,
    reviewed_at: daysAgo(10),
    reviewed_by: "u-admin",
    created_at: daysAgo(25),
    updated_at: now,
  },
  {
    id: "co-4",
    owner_id: "u-company-4",
    name: "PixelCraft Studio",
    legal_name: "PixelCraft UX",
    slug: "pixelcraft-studio",
    tagline: "Diseño de producto digital",
    description:
      "Estudio de diseño de producto que acompaña a startups y scale-ups desde discovery hasta design systems.",
    logo_url: null,
    cover_url: null,
    industry: "Diseño",
    company_size: "1-10",
    founded_year: 2019,
    headquarters: "Bogotá, Colombia",
    countries: ["Colombia"],
    website: "https://example.com",
    linkedin_url: null,
    tech_stack: ["Figma", "Framer", "React"],
    benefits: ["Remoto", "Flexibilidad"],
    contact_email: "hola@pixel.example",
    status: "approved",
    rejection_reason: null,
    admin_notes: null,
    is_featured: false,
    reviewed_at: daysAgo(15),
    reviewed_by: "u-admin",
    created_at: daysAgo(35),
    updated_at: now,
  },
  {
    id: "co-5",
    owner_id: "u-company-5",
    name: "CloudNorth",
    legal_name: "CloudNorth Ops",
    slug: "cloudnorth",
    tagline: "Infraestructura confiable",
    description:
      "Equipo de SRE y platform engineering que construye plataformas cloud para empresas en crecimiento.",
    logo_url: null,
    cover_url: null,
    industry: "Cloud / DevOps",
    company_size: "51-200",
    founded_year: 2016,
    headquarters: "Lima, Perú",
    countries: ["Perú", "Remoto"],
    website: "https://example.com",
    linkedin_url: null,
    tech_stack: ["Terraform", "Kubernetes", "AWS", "Go"],
    benefits: ["Remoto", "Certificaciones pagadas"],
    contact_email: "careers@cloudnorth.example",
    status: "approved",
    rejection_reason: null,
    admin_notes: null,
    is_featured: true,
    reviewed_at: daysAgo(5),
    reviewed_by: "u-admin",
    created_at: daysAgo(50),
    updated_at: now,
  },
  {
    id: "co-pending-1",
    owner_id: "u-company-pending",
    name: "Startup en Revisión",
    legal_name: "Startup XYZ",
    slug: "startup-revision",
    tagline: "Pendiente de aprobación",
    description: "Empresa de ejemplo pendiente de revisión por el equipo Reclu.",
    logo_url: null,
    cover_url: null,
    industry: "Tech",
    company_size: "1-10",
    founded_year: 2024,
    headquarters: "Guadalajara, México",
    countries: ["México"],
    website: "https://example.com",
    linkedin_url: null,
    tech_stack: ["React"],
    benefits: [],
    contact_email: "hr@pending.example",
    status: "pending",
    rejection_reason: null,
    admin_notes: null,
    is_featured: false,
    reviewed_at: null,
    reviewed_by: null,
    created_at: daysAgo(1),
    updated_at: now,
  },
];

export const demoJobs: Job[] = [
  {
    id: "job-1",
    company_id: "co-1",
    category_id: "cat-1",
    title: "Full Stack Developer (React + Node)",
    slug: "full-stack-developer-react-node-nubix",
    description:
      "Buscamos un desarrollador full stack para construir features de punta a punta en nuestra plataforma SaaS. Trabajarás con un equipo pequeño, autónomo y orientado a impacto.",
    responsibilities:
      "• Diseñar e implementar features en React/Next.js y Node.js\n• Escribir tests y documentar APIs\n• Participar en code reviews y diseño técnico\n• Colaborar con producto y diseño",
    requirements:
      "• 2+ años con React y TypeScript\n• Experiencia con Node.js y APIs REST\n• SQL y bases relacionales\n• Git y trabajo en equipo remoto",
    nice_to_have: "• Next.js App Router\n• AWS o Supabase\n• Experiencia en fintech",
    seniority: "semi_senior",
    job_type: "full_time",
    modality: "remote",
    city: null,
    country: "LATAM",
    salary_min: 2200,
    salary_max: 3200,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 2,
    status: "published",
    is_featured: true,
    published_at: daysAgo(2),
    closes_at: null,
    created_at: daysAgo(3),
    updated_at: now,
  },
  {
    id: "job-2",
    company_id: "co-1",
    category_id: "cat-2",
    title: "Data Analyst Junior",
    slug: "data-analyst-junior-nubix",
    description:
      "Únete al equipo de data para construir dashboards, métricas de producto y reportes que guíen decisiones de negocio.",
    responsibilities:
      "• Crear dashboards en Power BI / Looker\n• Consultas SQL diarias\n• Apoyar a stakeholders de producto y growth",
    requirements:
      "• SQL intermedio\n• Excel / Google Sheets avanzado\n• Ganas de aprender\n• Comunicación clara",
    nice_to_have: "• Python básico\n• Power BI\n• Alumno ProgramBI",
    seniority: "junior",
    job_type: "full_time",
    modality: "hybrid",
    city: "Ciudad de México",
    country: "México",
    salary_min: 900,
    salary_max: 1400,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 0,
    status: "published",
    is_featured: false,
    published_at: daysAgo(5),
    closes_at: null,
    created_at: daysAgo(6),
    updated_at: now,
  },
  {
    id: "job-3",
    company_id: "co-2",
    category_id: "cat-1",
    title: "Backend Java / Spring Boot Senior",
    slug: "backend-java-spring-senior-andes",
    description:
      "Desarrollador backend senior para modernizar servicios legacy y construir microservicios en la nube.",
    responsibilities:
      "• Diseño de APIs y microservicios\n• Optimización de performance\n• Mentoría a juniors",
    requirements:
      "• 5+ años Java\n• Spring Boot, JPA\n• Experiencia con cloud (Azure o AWS)\n• Inglés intermedio",
    nice_to_have: "• Kubernetes\n• Event-driven architecture",
    seniority: "senior",
    job_type: "full_time",
    modality: "hybrid",
    city: "Santiago",
    country: "Chile",
    salary_min: 2800,
    salary_max: 3800,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 5,
    status: "published",
    is_featured: true,
    published_at: daysAgo(1),
    closes_at: null,
    created_at: daysAgo(2),
    updated_at: now,
  },
  {
    id: "job-4",
    company_id: "co-3",
    category_id: "cat-5",
    title: "ML Engineer — LLM / RAG",
    slug: "ml-engineer-llm-rag-orbit",
    description:
      "Ingeniero de ML para diseñar y llevar a producción sistemas RAG y agentes con LLMs.",
    responsibilities:
      "• Pipelines de embeddings y retrieval\n• Evaluación de modelos\n• Integración con APIs productivas",
    requirements:
      "• Python avanzado\n• Experiencia con LLMs / RAG\n• FastAPI o similar\n• Git y cloud",
    nice_to_have: "• LangChain / LlamaIndex\n• MLOps",
    seniority: "senior",
    job_type: "full_time",
    modality: "remote",
    city: null,
    country: "Remoto (Argentina preferente)",
    salary_min: 3500,
    salary_max: 5000,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 3,
    status: "published",
    is_featured: true,
    published_at: daysAgo(0),
    closes_at: null,
    created_at: daysAgo(1),
    updated_at: now,
  },
  {
    id: "job-5",
    company_id: "co-4",
    category_id: "cat-3",
    title: "Product Designer (UI/UX)",
    slug: "product-designer-ui-ux-pixelcraft",
    description:
      "Diseñador de producto para proyectos de startups: research ligero, wireframes, UI de alta fidelidad y design systems.",
    responsibilities:
      "• Diseñar flujos y pantallas en Figma\n• Prototipar y validar con usuarios\n• Documentar componentes",
    requirements:
      "• Portfolio sólido\n• Figma avanzado\n• 2+ años en producto digital",
    nice_to_have: "• Motion / Framer\n• HTML/CSS básico",
    seniority: "semi_senior",
    job_type: "full_time",
    modality: "remote",
    city: "Bogotá",
    country: "Colombia",
    salary_min: 1500,
    salary_max: 2200,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 2,
    status: "published",
    is_featured: false,
    published_at: daysAgo(4),
    closes_at: null,
    created_at: daysAgo(5),
    updated_at: now,
  },
  {
    id: "job-6",
    company_id: "co-5",
    category_id: "cat-4",
    title: "DevOps / Platform Engineer",
    slug: "devops-platform-engineer-cloudnorth",
    description:
      "Platform engineer para mejorar DX, CI/CD y confiabilidad de infraestructura multi-cuenta AWS.",
    responsibilities:
      "• Terraform y módulos reutilizables\n• Pipelines GitHub Actions\n• Observabilidad y incident response",
    requirements:
      "• 3+ años DevOps/SRE\n• Kubernetes y AWS\n• IaC con Terraform",
    nice_to_have: "• Go\n• Certificaciones AWS",
    seniority: "senior",
    job_type: "full_time",
    modality: "remote",
    city: null,
    country: "LATAM",
    salary_min: 3000,
    salary_max: 4200,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 3,
    status: "published",
    is_featured: false,
    published_at: daysAgo(3),
    closes_at: null,
    created_at: daysAgo(4),
    updated_at: now,
  },
  {
    id: "job-7",
    company_id: "co-2",
    category_id: "cat-7",
    title: "QA Automation Engineer",
    slug: "qa-automation-andes",
    description:
      "QA con foco en automatización de APIs y UI para productos web enterprise.",
    responsibilities:
      "• Diseñar estrategia de pruebas\n• Automatizar con Playwright o Cypress\n• Reportar y seguir defectos",
    requirements:
      "• 2+ años en QA\n• Experiencia en automatización\n• Conocimiento de APIs REST",
    nice_to_have: "• CI/CD\n• Performance testing",
    seniority: "semi_senior",
    job_type: "full_time",
    modality: "hybrid",
    city: "Santiago",
    country: "Chile",
    salary_min: 1600,
    salary_max: 2300,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 2,
    status: "published",
    is_featured: false,
    published_at: daysAgo(6),
    closes_at: null,
    created_at: daysAgo(7),
    updated_at: now,
  },
  {
    id: "job-8",
    company_id: "co-1",
    category_id: "cat-8",
    title: "React Native Developer",
    slug: "react-native-developer-nubix",
    description:
      "Desarrollador mobile para nuestra app de clientes en iOS y Android con React Native.",
    responsibilities:
      "• Features mobile end-to-end\n• Integración con APIs\n• Publicación en stores",
    requirements:
      "• React Native en producción\n• TypeScript\n• Experiencia con app stores",
    nice_to_have: "• Expo\n• Animaciones",
    seniority: "junior",
    job_type: "full_time",
    modality: "remote",
    city: null,
    country: "México",
    salary_min: 1200,
    salary_max: 1800,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 1,
    status: "published",
    is_featured: false,
    published_at: daysAgo(8),
    closes_at: null,
    created_at: daysAgo(9),
    updated_at: now,
  },
  {
    id: "job-9",
    company_id: "co-3",
    category_id: "cat-1",
    title: "Backend Python (FastAPI) — Trainee",
    slug: "backend-python-trainee-orbit",
    description:
      "Primer empleo tech ideal para egresados de bootcamps. Aprenderás con un mentor y contribuyes a APIs reales.",
    responsibilities:
      "• Endpoints simples con supervisión\n• Tests unitarios\n• Documentación",
    requirements:
      "• Python básico-intermedio\n• Fundamentos de HTTP y SQL\n• Ganas de aprender y proactividad",
    nice_to_have: "• FastAPI\n• GitHub con proyectos\n• Alumno ProgramBI",
    seniority: "trainee",
    job_type: "full_time",
    modality: "remote",
    city: null,
    country: "LATAM",
    salary_min: 600,
    salary_max: 900,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 0,
    status: "published",
    is_featured: true,
    published_at: daysAgo(1),
    closes_at: null,
    created_at: daysAgo(1),
    updated_at: now,
  },
  {
    id: "job-10",
    company_id: "co-5",
    category_id: "cat-6",
    title: "Technical Product Owner",
    slug: "technical-product-owner-cloudnorth",
    description:
      "PO técnico para priorizar roadmap de plataforma interna y alinear ingeniería con negocio.",
    responsibilities:
      "• Backlog y priorización\n• Refinamientos técnicos\n• Métricas de adopción",
    requirements:
      "• Experiencia como PO o PM tech\n• Comprensión de cloud/DevOps\n• Comunicación excelente",
    nice_to_have: "• Background de ingeniería",
    seniority: "lead",
    job_type: "full_time",
    modality: "remote",
    city: "Lima",
    country: "Perú",
    salary_min: 2500,
    salary_max: 3400,
    salary_currency: "USD",
    salary_period: "month",
    experience_years: 4,
    status: "published",
    is_featured: false,
    published_at: daysAgo(7),
    closes_at: null,
    created_at: daysAgo(8),
    updated_at: now,
  },
];

// Attach relations
for (const job of demoJobs) {
  job.companies = demoCompanies.find((c) => c.id === job.company_id);
  job.categories = demoCategories.find((c) => c.id === job.category_id);
}

export const demoProfiles: Profile[] = [
  {
    id: "u-admin",
    email: "admin@reclu.app",
    full_name: "Admin Reclu",
    avatar_url: null,
    role: "admin",
    is_active: true,
    created_at: daysAgo(100),
    updated_at: now,
  },
  {
    id: "u-candidate-1",
    email: "ana.dev@example.com",
    full_name: "Ana Martínez",
    avatar_url: null,
    role: "candidate",
    is_active: true,
    created_at: daysAgo(20),
    updated_at: now,
  },
  {
    id: "u-candidate-2",
    email: "carlos@example.com",
    full_name: "Carlos Ruiz",
    avatar_url: null,
    role: "candidate",
    is_active: true,
    created_at: daysAgo(15),
    updated_at: now,
  },
];

export const demoCandidates: CandidateProfile[] = [
  {
    id: "cand-1",
    user_id: "u-candidate-1",
    username: "ana-martinez",
    headline: "Full Stack Developer | React, Node.js & TypeScript",
    about:
      "Desarrolladora full stack con 3 años de experiencia construyendo productos web. Me apasiona el código limpio, la UX y aprender en público. Egresada de ProgramBI.",
    looking_for:
      "Roles full stack o frontend en equipos remotos de producto, preferentemente con TypeScript.",
    city: "Guadalajara",
    country: "México",
    open_to_relocate: false,
    preferred_modality: "remote",
    availability: "actively_looking",
    employment_status: "employed",
    start_availability: "one_month",
    job_types: ["full_time"],
    salary_min: 2000,
    salary_max: 3000,
    salary_currency: "USD",
    salary_public: false,
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
    portfolio_url: "https://example.com",
    website_url: null,
    resume_url: null,
    banner_url: null,
    is_public: true,
    is_programbi_alumni: true,
    created_at: daysAgo(20),
    updated_at: now,
    experiences: [
      {
        id: "exp-1",
        candidate_id: "cand-1",
        title: "Frontend Developer",
        company_name: "Startup XYZ",
        location: "Remoto",
        is_current: true,
        start_date: "2023-03-01",
        end_date: null,
        description:
          "Desarrollo de dashboards en React. Mejoré el LCP en un 35% y lideré la migración a TypeScript.",
        sort_order: 0,
      },
      {
        id: "exp-2",
        candidate_id: "cand-1",
        title: "Junior Web Developer",
        company_name: "Agencia Digital Norte",
        location: "Guadalajara",
        is_current: false,
        start_date: "2021-06-01",
        end_date: "2023-02-01",
        description: "Sitios corporativos y e-commerce con React y WordPress headless.",
        sort_order: 1,
      },
    ],
    education: [
      {
        id: "edu-1",
        candidate_id: "cand-1",
        institution: "ProgramBI",
        degree: "Bootcamp Full Stack",
        field: "Desarrollo de Software",
        start_date: "2021-01-01",
        end_date: "2021-06-01",
        is_programbi: true,
        description: null,
        sort_order: 0,
      },
    ],
    skills: [
      {
        id: "cs-1",
        candidate_id: "cand-1",
        skill_id: "s1",
        level: "advanced",
        is_featured: true,
        skills: { id: "s1", name: "React", slug: "react" },
      },
      {
        id: "cs-2",
        candidate_id: "cand-1",
        skill_id: "s2",
        level: "advanced",
        is_featured: true,
        skills: { id: "s2", name: "TypeScript", slug: "typescript" },
      },
      {
        id: "cs-3",
        candidate_id: "cand-1",
        skill_id: "s3",
        level: "intermediate",
        is_featured: true,
        skills: { id: "s3", name: "Node.js", slug: "nodejs" },
      },
    ],
    projects: [
      {
        id: "proj-1",
        candidate_id: "cand-1",
        name: "TaskFlow",
        description: "App de gestión de tareas con realtime y auth.",
        url: "https://example.com",
        repo_url: "https://github.com",
        tech_stack: ["Next.js", "Supabase", "Tailwind"],
        sort_order: 0,
      },
    ],
    certifications: [],
    languages: [
      {
        id: "lang-1",
        candidate_id: "cand-1",
        language: "Español",
        level: "native",
      },
      {
        id: "lang-2",
        candidate_id: "cand-1",
        language: "Inglés",
        level: "professional",
      },
    ],
    profiles: demoProfiles[1],
  },
  {
    id: "cand-2",
    user_id: "u-candidate-2",
    username: "carlos-ruiz",
    headline: "Data Analyst | SQL · Power BI · Python",
    about:
      "Analista de datos en formación con proyectos prácticos en dashboards y ETL. Busco mi primer rol full-time en data.",
    looking_for: "Data Analyst junior o BI Analyst.",
    city: "Lima",
    country: "Perú",
    open_to_relocate: true,
    preferred_modality: "hybrid",
    availability: "actively_looking",
    employment_status: "bootcamp",
    start_availability: "immediate",
    job_types: ["full_time", "internship"],
    salary_min: 800,
    salary_max: 1200,
    salary_currency: "USD",
    salary_public: true,
    linkedin_url: null,
    github_url: "https://github.com",
    portfolio_url: null,
    website_url: null,
    resume_url: null,
    banner_url: null,
    is_public: true,
    is_programbi_alumni: true,
    created_at: daysAgo(10),
    updated_at: now,
    experiences: [],
    education: [
      {
        id: "edu-2",
        candidate_id: "cand-2",
        institution: "ProgramBI",
        degree: "Data Analytics",
        field: "Análisis de Datos",
        start_date: "2025-01-01",
        end_date: "2025-07-01",
        is_programbi: true,
        description: null,
        sort_order: 0,
      },
    ],
    skills: [
      {
        id: "cs-4",
        candidate_id: "cand-2",
        skill_id: "s4",
        level: "intermediate",
        is_featured: true,
        skills: { id: "s4", name: "SQL", slug: "sql" },
      },
      {
        id: "cs-5",
        candidate_id: "cand-2",
        skill_id: "s5",
        level: "intermediate",
        is_featured: true,
        skills: { id: "s5", name: "Power BI", slug: "power-bi" },
      },
    ],
    projects: [],
    certifications: [
      {
        id: "cert-1",
        candidate_id: "cand-2",
        name: "Google Data Analytics",
        issuer: "Google",
        issue_date: "2025-06-01",
        credential_url: null,
      },
    ],
    languages: [
      {
        id: "lang-3",
        candidate_id: "cand-2",
        language: "Español",
        level: "native",
      },
    ],
    profiles: demoProfiles[2],
  },
];

export const demoApplications: Application[] = [
  {
    id: "app-1",
    job_id: "job-1",
    candidate_id: "cand-1",
    cover_message:
      "Hola, me interesa mucho el rol. Tengo experiencia con React y Node en producto SaaS.",
    resume_url: null,
    status: "in_review",
    company_notes: "Perfil interesante, agendar call",
    created_at: daysAgo(1),
    updated_at: now,
  },
  {
    id: "app-2",
    job_id: "job-2",
    candidate_id: "cand-2",
    cover_message: "Soy egresado de ProgramBI y busco mi primera oportunidad en data.",
    resume_url: null,
    status: "submitted",
    company_notes: null,
    created_at: daysAgo(0),
    updated_at: now,
  },
];

for (const app of demoApplications) {
  app.jobs = demoJobs.find((j) => j.id === app.job_id);
  app.candidate_profiles = demoCandidates.find((c) => c.id === app.candidate_id);
}

export function getJobsWithCompany(filters?: {
  q?: string;
  category?: string;
  seniority?: string;
  modality?: string;
  featured?: boolean;
}) {
  let jobs = demoJobs
    .filter((j) => j.status === "published")
    .map((j) => ({
      ...j,
      companies: demoCompanies.find((c) => c.id === j.company_id),
      categories: demoCategories.find((c) => c.id === j.category_id),
    }));

  if (filters?.q) {
    const q = filters.q.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.companies?.name.toLowerCase().includes(q)
    );
  }
  if (filters?.category) {
    jobs = jobs.filter((j) => j.categories?.slug === filters.category);
  }
  if (filters?.seniority) {
    jobs = jobs.filter((j) => j.seniority === filters.seniority);
  }
  if (filters?.modality) {
    jobs = jobs.filter((j) => j.modality === filters.modality);
  }
  if (filters?.featured) {
    jobs = jobs.filter((j) => j.is_featured);
  }

  return jobs.sort(
    (a, b) =>
      new Date(b.published_at || b.created_at).getTime() -
      new Date(a.published_at || a.created_at).getTime()
  );
}

// Mock leads data — replace with Firebase fetch in production
export interface Lead {
  id: string
  nombre: string
  empresa: string
  bio_detallada: string
  imagen: string
  tags: string[]
  cargo?: string
  contacto?: string
  score?: number
  telefono?: string
  sector?: string
  empleados?: string
  ciudad?: string
  fuente?: string
  web?: string
  linkedin?: string
  notas?: string[]
  ultimaActividad?: string
  presupuesto?: string
}

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    nombre: 'Andrés Moreno',
    empresa: 'TechStack SL',
    cargo: 'CTO',
    contacto: 'andres@techstack.io',
    telefono: '+34 612 345 678',
    sector: 'Cloud Infrastructure',
    empleados: '80–120',
    ciudad: 'Madrid',
    fuente: 'LinkedIn Sales Navigator',
    web: 'techstack.io',
    linkedin: 'linkedin.com/in/andresmoreno',
    score: 87,
    presupuesto: '€40k–€80k anuales',
    ultimaActividad: 'Hace 2 días — publicó sobre costos de GCP',
    bio_detallada:
      'Lleva 8 años en infraestructura cloud. Migró toda la pila de TechStack de bare-metal a GCP en 2022. Usa Kubernetes en producción con +200 pods. Habló en DevOpsDays Madrid 2023. Interesado en herramientas de observabilidad y reducción de costos de cómputo. Mencionó en LinkedIn que están evaluando contratos con proveedores nuevos en Q3. Stack actual: GCP + Terraform + Datadog + React.\n\nEn 2024 publicó un post viral sobre cómo redujeron la factura de GCP un 34% con spot instances. Tiene un equipo de 14 ingenieros. Busca soluciones que se integren con su CI/CD existente (GitHub Actions + ArgoCD). Ha pedido demos a 3 competidores en los últimos 60 días — ventana de decisión activa.',
    imagen: '',
    tags: ['GCP', 'Kubernetes', 'DevOps', 'High-intent', 'Q3-budget', 'Terraform', 'Observabilidad'],
    notas: [
      'Respondió a InMail en menos de 1h — muy receptivo.',
      'Prefiere demos técnicas, no comerciales.',
      'Tomar café en Madrid — lo mencionó en Twitter.',
    ],
  },
  {
    id: '2',
    nombre: 'Lucía Fernández',
    empresa: 'Finwave',
    cargo: 'Head of Engineering',
    contacto: 'lucia@finwave.es',
    telefono: '+34 698 765 432',
    sector: 'Fintech / Pagos',
    empleados: '35–50',
    ciudad: 'Barcelona',
    fuente: 'Referencia directa — Javier B.',
    web: 'finwave.es',
    linkedin: 'linkedin.com/in/luciafernandez',
    score: 72,
    presupuesto: '€20k–€35k anuales',
    ultimaActividad: 'Hace 5 días — abrió job posting Backend Rust',
    bio_detallada:
      'Fintech B2B con 40+ empleados. Lucía dirige un equipo de 12 devs. Tienen problemas de escala en su microservicio de pagos — detectado por job posting "Senior Backend Rust" activo desde hace 3 semanas. Tuitea sobre DDD y arquitectura hexagonal. Ex-Cabify. Abierta a soluciones que reduzcan tiempo de integración con bancos europeos.\n\nPSD2 compliance es un dolor point recurrente. Evaluando migrar de AWS Lambda a un servicio más predecible en latencia. El equipo actual siente presión por los SLAs de sus clientes enterprise. Tiene autonomía de compra hasta €30k sin aprobación del board.',
    imagen: '',
    tags: ['Fintech', 'Rust', 'PSD2', 'B2B', 'Scaling', 'Ex-Cabify', 'AWS'],
    notas: [
      'Referencia de Javier Blanco — mencionar en primer contacto.',
      'No llamar sin previo email — lo indicó en su perfil de LinkedIn.',
    ],
  },
  {
    id: '3',
    nombre: 'Carlos Ruiz',
    empresa: 'Omnivox AI',
    cargo: 'CEO & Co-founder',
    contacto: 'carlos@omnivox.ai',
    telefono: '+34 655 987 001',
    sector: 'IA Conversacional / SaaS',
    empleados: '15–25',
    ciudad: 'Valencia',
    fuente: 'Cold outreach propio',
    web: 'omnivox.ai',
    linkedin: 'linkedin.com/in/carlosruizai',
    score: 91,
    presupuesto: '€60k–€120k (Series A activa)',
    ultimaActividad: 'Ayer — respondió email a las 7:32am',
    bio_detallada:
      'Startup de IA conversacional, Series A de 4M€ cerrada en enero. Carlos es el decisor directo. Acaban de contratar a 3 ML engineers. Producto: agentes de voz para call centers de telecomunicaciones. Integraciones activas con Twilio y Whisper.\n\nBuscando partnerships tecnológicos para acelerar go-to-market en LATAM. Respondió a cold email anterior en menos de 2h — señal fuerte. Tiene urgencia real: su contrato con Movistar España vence en Q2 y necesitan escalar capacidad antes. Historial de compra rápida — tomó decisión de adoptar Datadog en 48h según su CTO.',
    imagen: '',
    tags: ['AI', 'Series-A', 'Decisor', 'LATAM', 'High-intent', 'Twilio', 'Voice-AI'],
    notas: [
      'Respondió cold email en 2h — PRIORITARIO.',
      'Reunión inicial acordada para semana que viene.',
      'Traer caso de éxito de telco similar.',
    ],
  },
  {
    id: '4',
    nombre: 'Sara Jiménez',
    empresa: 'Retail360',
    cargo: 'VP Operations',
    contacto: 'sara@retail360.com',
    telefono: '+34 634 112 900',
    sector: 'Retail Analytics',
    empleados: '60–90',
    ciudad: 'Zaragoza',
    fuente: 'LinkedIn (búsqueda manual)',
    web: 'retail360.com',
    linkedin: 'linkedin.com/in/sarajimenez',
    score: 58,
    presupuesto: 'Desconocido — pasar por CTO',
    ultimaActividad: 'Hace 10 días — asistió a webinar PowerBI',
    bio_detallada:
      'Empresa de retail analytics con foco en España y Portugal. Sara controla presupuesto operativo pero las decisiones técnicas pasan por el CTO (Marcos del Río, identificado en LinkedIn).\n\nInterés declarado en automatización de reportes. Asistió a un webinar de PowerBI la semana pasada. Empresa estable sin señales de urgencia. Puede ser contacto de entrada para llegar a Marcos. Tiene 15 años en operaciones de retail — conoce bien el dolor de los datos en silos entre tienda física y ecommerce.',
    imagen: '',
    tags: ['Retail', 'Analytics', 'Mid-intent', 'Gatekeeper', 'PowerBI', 'Ecommerce'],
    notas: [
      'El decisor real es Marcos del Río (CTO) — encontrar su LinkedIn.',
      'Usar a Sara para warm intro al CTO.',
    ],
  },
  {
    id: '5',
    nombre: 'Javier Blanco',
    empresa: 'Constructech',
    cargo: 'Director de Transformación Digital',
    contacto: 'j.blanco@constructech.es',
    telefono: '+34 677 034 512',
    sector: 'Construcción / BIM',
    empleados: '200–500',
    ciudad: 'Barcelona',
    fuente: 'Evento — Smart Construction Madrid 2024',
    web: 'constructech.es',
    linkedin: 'linkedin.com/in/javierblancoconstructech',
    score: 63,
    presupuesto: '€50k–€90k (Q4 aprobado)',
    ultimaActividad: 'Hace 3 días — conectó en LinkedIn',
    bio_detallada:
      'Constructora grande digitalizando procesos de obra. Javier está implementando BIM en 15 proyectos activos. Buscan integración entre software de gestión de obra y herramientas de análisis. Dolor principal: datos en silos entre departamentos de presupuestos, ejecución y calidad.\n\nPresupuesto aprobado para transformación digital Q4. Conoce a Nikita de un evento de construcción digital en Barcelona — relación cálida. Su mayor miedo es comprar una solución que no adopte el equipo de obra (perfiles no técnicos). Necesita demos offline y formación incluida.',
    imagen: '',
    tags: ['BIM', 'Construcción', 'Q4-budget', 'Referral-link', 'Enterprise', 'No-técnico'],
    notas: [
      'Nos conocemos del evento de Barcelona — mencionar.',
      'Necesita demo offline y que funcione en tablet de obra.',
      'Proceso de compra largo (3–6 meses) — pipeline largo.',
    ],
  },
  {
    id: '6',
    nombre: 'Elena Castro',
    empresa: 'HealthOS',
    cargo: 'Head of Product',
    contacto: 'elena@healthos.io',
    telefono: '+34 611 223 445',
    sector: 'HealthTech / SaaS',
    empleados: '25–40',
    ciudad: 'Bilbao',
    fuente: 'ProductHunt — comentó en nuestro launch',
    web: 'healthos.io',
    linkedin: 'linkedin.com/in/elenacastroproduct',
    score: 79,
    presupuesto: '€15k–€30k anuales',
    ultimaActividad: 'Hace 1 día — publicó sobre HIPAA en LinkedIn',
    bio_detallada:
      'SaaS para clínicas privadas. Elena tiene poder de decisión sobre herramientas de producto. 50k usuarios activos en la plataforma. Reciente job posting para "Data Engineer" — señal de que están construyendo pipeline de datos.\n\nActiva en ProductHunt y en comunidades de salud digital. Interesada en reducir churn de clínicas pequeñas mediante mejores dashboards de uso. HIPAA compliance como diferenciador clave para sus clientes. Su stack actual es Mixpanel + Notion + Linear — busca unificación. Tiene un board meeting en 6 semanas donde necesita mostrar métricas de producto nuevas.',
    imagen: '',
    tags: ['HealthTech', 'HIPAA', 'SaaS', 'Data-pipeline', 'Product-led', 'Mixpanel'],
    notas: [
      'Comentó en nuestro ProductHunt launch — iniciar con ese contexto.',
      'Board meeting en 6 semanas — urgencia real.',
      'Prefiere comunicación por Slack o email, no llamadas.',
    ],
  },
  {
    id: '7',
    nombre: 'Miguel Torres',
    empresa: 'LogiRoute',
    cargo: 'CPO',
    contacto: 'miguel@logiroute.com',
    telefono: '+34 655 441 320',
    sector: 'Logística / SaaS',
    empleados: '50–80',
    ciudad: 'Sevilla',
    fuente: 'Inbound — formulario web',
    web: 'logiroute.com',
    linkedin: 'linkedin.com/in/migueltorreslogi',
    score: 83,
    presupuesto: '€25k–€45k anuales',
    ultimaActividad: 'Hace 4 horas — rellenó formulario de contacto',
    bio_detallada:
      'SaaS de optimización de rutas para flotas de reparto. Tienen 120 empresas clientes activas. Miguel acaba de entrar como CPO hace 3 meses y está revisando todo el stack de herramientas. Momento de cambio ideal.\n\nEmpresa en crecimiento: de 50 a 80 empleados en 12 meses. Tienen integración con HERE Maps y están evaluando migrar a Google Maps Platform. Inbound lead — rellenó el formulario web hace 4 horas, lo que indica urgencia activa. Su mayor reto: visibilidad en tiempo real de flotas con más de 200 vehículos.',
    imagen: '',
    tags: ['Logística', 'SaaS', 'Inbound', 'High-intent', 'Flotas', 'CPO-nuevo'],
    notas: [
      'INBOUND — rellenó formulario hace 4h. Llamar HOY.',
      'CPO nuevo = ventana de cambio de herramientas abierta.',
    ],
  },
  {
    id: '8',
    nombre: 'Patricia Vega',
    empresa: 'EduSpark',
    cargo: 'CEO',
    contacto: 'patricia@eduspark.io',
    telefono: '+34 644 778 231',
    sector: 'EdTech / B2B',
    empleados: '10–20',
    ciudad: 'Madrid',
    fuente: 'Twitter / X — respondió a un hilo',
    web: 'eduspark.io',
    linkedin: 'linkedin.com/in/patriciavegaedu',
    score: 69,
    presupuesto: '€8k–€18k anuales',
    ultimaActividad: 'Hace 6 horas — respondió hilo de Twitter',
    bio_detallada:
      'Plataforma de formación corporativa B2B. Patricia fundó EduSpark hace 2 años y tiene 25 empresas clientes. Están creciendo vía partnerships con consultoras de RRHH.\n\nEl pain point principal es medir el impacto real de la formación (ROI de learning). Respondió a un hilo de Twitter sobre métricas de L&D. Presupuesto ajustado pero decisión rápida — siendo startup saben decir sí o no en días. Tiene influencia en comunidad EdTech española.',
    imagen: '',
    tags: ['EdTech', 'B2B', 'Startup', 'ROI-learning', 'RRHH', 'Twitter-source'],
    notas: [
      'Respondió hilo de Twitter — entrar con contexto de ese hilo.',
      'Presupuesto pequeño pero decisión rápida.',
    ],
  },
]

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
}

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    nombre: 'Andrés Moreno',
    empresa: 'TechStack SL',
    cargo: 'CTO',
    contacto: 'andres@techstack.io',
    score: 87,
    bio_detallada:
      'Lleva 8 años en infraestructura cloud. Migró toda la pila de TechStack de bare-metal a GCP en 2022. Usa Kubernetes en producción con +200 pods. Habló en DevOpsDays Madrid. Interesado en herramientas de observabilidad y reducción de costos de cómputo. Mencionó en LinkedIn que están evaluando contratos con proveedores nuevos en Q3. Stack actual: GCP + Terraform + Datadog + React.',
    imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=andres',
    tags: ['GCP', 'Kubernetes', 'DevOps', 'High-intent', 'Q3-budget'],
  },
  {
    id: '2',
    nombre: 'Lucía Fernández',
    empresa: 'Finwave',
    cargo: 'Head of Engineering',
    contacto: 'lucia@finwave.es',
    score: 72,
    bio_detallada:
      'Fintech B2B con 40+ empleados. Lucía dirige un equipo de 12 devs. Tienen problemas de escala en su microservicio de pagos — detectado por job posting "Senior Backend Rust" activo desde hace 3 semanas. Tuitea sobre DDD y arquitectura hexagonal. Ex-Cabify. Abierta a soluciones que reduzcan tiempo de integración con bancos europeos. PSD2 compliance es un dolor point recurrente.',
    imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=lucia',
    tags: ['Fintech', 'Rust', 'PSD2', 'B2B', 'Scaling'],
  },
  {
    id: '3',
    nombre: 'Carlos Ruiz',
    empresa: 'Omnivox',
    cargo: 'CEO',
    contacto: 'carlos@omnivox.ai',
    score: 91,
    bio_detallada:
      'Startup de IA conversacional, Series A de 4M€ cerrada en enero. Carlos es el decisor directo. Acaban de contratar a 3 ML engineers. Producto: agentes de voz para call centers de telecomunicaciones. Integraciones activas con Twilio y Whisper. Buscando partnerships tecnológicos para acelerar go-to-market en LATAM. Respondió a cold email anterior en menos de 2h — señal fuerte.',
    imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=carlos',
    tags: ['AI', 'Series-A', 'Decisor', 'LATAM', 'High-intent', 'Twilio'],
  },
  {
    id: '4',
    nombre: 'Sara Jiménez',
    empresa: 'Retail360',
    cargo: 'VP Operations',
    contacto: 'sara@retail360.com',
    score: 58,
    bio_detallada:
      'Empresa de retail analytics con foco en España y Portugal. Sara controla presupuesto operativo pero las decisiones técnicas pasan por el CTO (Marcos). Interés declarado en automatización de reportes. Asistió a un webinar de PowerBI la semana pasada. Empresa estable, no hay señales de urgencia. Puede ser contacto de entrada para llegar a Marcos.',
    imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=sara',
    tags: ['Retail', 'Analytics', 'Mid-intent', 'Gatekeeper'],
  },
  {
    id: '5',
    nombre: 'Javier Blanco',
    empresa: 'Constructech',
    cargo: 'Director Digital',
    contacto: 'j.blanco@constructech.es',
    score: 63,
    bio_detallada:
      'Constructora grande digitalizando procesos de obra. Javier está implementando BIM (Building Information Modeling) en 15 proyectos activos. Buscan integración entre software de gestión de obra y herramientas de análisis. Dolor: datos en silos entre departamentos. Presupuesto aprobado para transformación digital Q4. Conoce a Nikita de un evento de construcción digital en Barcelona.',
    imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=javier',
    tags: ['BIM', 'Construction', 'Q4-budget', 'Referral-link'],
  },
  {
    id: '6',
    nombre: 'Elena Castro',
    empresa: 'HealthOS',
    cargo: 'Product Lead',
    contacto: 'elena@healthos.io',
    score: 79,
    bio_detallada:
      'SaaS para clínicas privadas. Elena tiene poder de decisión sobre herramientas de producto. 50k usuarios activos en la plataforma. Reciente job posting para "Data Engineer" — señal de que están construyendo pipeline de datos. Activa en ProductHunt y en comunidades de salud digital. Interesada en reducir churn de clínicas pequeñas. HIPAA compliance como diferenciador.',
    imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=elena',
    tags: ['HealthTech', 'HIPAA', 'SaaS', 'Data-pipeline', 'Product-led'],
  },
]

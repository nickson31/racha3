'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { Building2, Mail, Phone, MapPin, Users, Globe, Linkedin, X, Heart } from 'lucide-react'
import type { Lead } from '@/lib/leads-data'

interface LeadCardProps {
  lead: Lead
  onSwipe: (direction: 'left' | 'right', leadId: string) => void
  isTop: boolean
  stackIndex: number
}

const SWIPE_THRESHOLD = 80

const AVATAR_COLORS: [string, string][] = [
  ['#fde8ea', '#fd5564'],
  ['#e8f9f1', '#21c17a'],
  ['#e8f0fd', '#4a7cfc'],
  ['#fdf5e8', '#f5a623'],
  ['#f0e8fd', '#9b59b6'],
  ['#e8fdfc', '#1abc9c'],
  ['#fef3e2', '#e67e22'],
  ['#e3f2fd', '#2196f3'],
]

function getAvatarColors(id: string): [string, string] {
  const idx = parseInt(id, 10) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? 'var(--score-high)' : score >= 60 ? 'var(--score-mid)' : 'var(--score-low)'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color }}>
        {score}
      </span>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={13} className="text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm text-foreground font-medium leading-snug break-all">{value}</p>
      </div>
    </div>
  )
}

export function LeadCard({ lead, onSwipe, isTop, stackIndex }: LeadCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-14, 14])
  const likeOpacity = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1])
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0])
  const isDragging = useRef(false)

  const [avatarBg, avatarAccent] = getAvatarColors(lead.id)
  const score = lead.score ?? 0

  const handleDragStart = () => {
    isDragging.current = true
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    isDragging.current = false
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe('right', lead.id)
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe('left', lead.id)
    }
  }

  // Background stacked cards (not interactive)
  if (!isTop) {
    return (
      <div
        className="absolute inset-0 rounded-3xl bg-card border border-border"
        style={{
          transform: `translateY(${stackIndex * 12}px) scale(${1 - stackIndex * 0.04})`,
          opacity: Math.max(0, 1 - stackIndex * 0.25),
          zIndex: 10 - stackIndex,
        }}
      />
    )
  }

  return (
    <motion.div
      className="absolute inset-0 rounded-3xl bg-card shadow-xl border border-border overflow-hidden select-none"
      style={{ x, rotate, zIndex: 20 }}
      drag="x"
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* LIKE stamp */}
      <motion.div
        className="absolute top-8 left-6 z-30 border-[3px] border-[var(--like-color)] rounded-2xl px-3 py-1 -rotate-12 pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        <span className="text-[var(--like-color)] font-extrabold text-xl tracking-widest">
          LIKE
        </span>
      </motion.div>

      {/* NOPE stamp */}
      <motion.div
        className="absolute top-8 right-6 z-30 border-[3px] border-[var(--nope-color)] rounded-2xl px-3 py-1 rotate-12 pointer-events-none"
        style={{ opacity: nopeOpacity }}
      >
        <span className="text-[var(--nope-color)] font-extrabold text-xl tracking-widest">
          NOPE
        </span>
      </motion.div>

      {/* The entire card content is a native scroll container */}
      {/* We stop the drag from intercepting vertical touch by using dragDirectionLock above */}
      <div
        className="h-full overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* ── AVATAR HEADER ── */}
        <div
          className="flex flex-col items-center justify-center gap-3 pt-10 pb-6 px-6 relative"
          style={{ background: avatarBg }}
        >
          {/* Score badge */}
          <div
            className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold text-white z-10"
            style={{
              background:
                score >= 80
                  ? 'var(--score-high)'
                  : score >= 60
                  ? 'var(--score-mid)'
                  : 'var(--score-low)',
            }}
          >
            {score > 0 ? `${score} pts` : '—'}
          </div>

          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold shadow-md"
            style={{ background: avatarAccent, color: '#fff' }}
          >
            {getInitials(lead.nombre)}
          </div>

          {/* Name + role */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-foreground leading-tight text-balance">
              {lead.nombre}
            </h2>
            {lead.cargo && (
              <p className="text-sm font-medium text-secondary-foreground mt-0.5">
                {lead.cargo}
              </p>
            )}
          </div>

          {/* Company + city pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Building2 size={12} className="text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground">{lead.empresa}</span>
            </div>
            {lead.ciudad && (
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <MapPin size={12} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">{lead.ciudad}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── SCORE BAR ── */}
        <div className="px-5 pt-4 pb-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Score de interes
          </p>
          <ScoreBar score={score} />
        </div>

        {/* ── TAGS ── */}
        <div className="px-5 pb-4 flex flex-wrap gap-2">
          {lead.tags.map((tag) => {
            const isHot =
              tag.toLowerCase().includes('high') ||
              tag.toLowerCase().includes('budget') ||
              tag.toLowerCase().includes('intent') ||
              tag.toLowerCase().includes('inbound')
            return (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  background: isHot ? '#e8f9f1' : '#f0f0f3',
                  color: isHot ? 'var(--like-color)' : 'var(--muted-foreground)',
                  borderColor: isHot ? 'var(--like-color)' : 'transparent',
                }}
              >
                {tag}
              </span>
            )
          })}
        </div>

        {/* ── BIO ── */}
        <div className="px-5 pb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Contexto
          </p>
          <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
            {lead.bio_detallada}
          </p>
        </div>

        {/* ── CONTACT INFO ── */}
        <div className="px-5 pb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Contacto y datos
          </p>
          <div className="rounded-2xl border border-border overflow-hidden">
            <InfoRow icon={Mail} label="Email" value={lead.contacto} />
            <InfoRow icon={Phone} label="Telefono" value={lead.telefono} />
            <InfoRow icon={Users} label="Empleados" value={lead.empleados} />
            <InfoRow icon={Globe} label="Web" value={lead.web} />
            <InfoRow icon={Linkedin} label="LinkedIn" value={lead.linkedin} />
            <InfoRow icon={MapPin} label="Fuente" value={lead.fuente} />
          </div>
        </div>

        {/* ── PRESUPUESTO ── */}
        {lead.presupuesto && (
          <div className="px-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Presupuesto estimado
            </p>
            <div className="bg-secondary rounded-2xl px-4 py-3">
              <span className="text-base font-extrabold text-foreground">{lead.presupuesto}</span>
            </div>
          </div>
        )}

        {/* ── ULTIMA ACTIVIDAD ── */}
        {lead.ultimaActividad && (
          <div className="px-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Ultima actividad detectada
            </p>
            <div className="bg-secondary rounded-2xl px-4 py-3">
              <span className="text-sm font-medium text-foreground">{lead.ultimaActividad}</span>
            </div>
          </div>
        )}

        {/* ── NOTAS ── */}
        {lead.notas && lead.notas.length > 0 && (
          <div className="px-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Notas del comercial
            </p>
            <div className="space-y-2">
              {lead.notas.map((nota, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 bg-secondary rounded-2xl px-4 py-3"
                >
                  <span
                    className="text-xs font-extrabold shrink-0 mt-0.5"
                    style={{ color: 'var(--primary)' }}
                  >
                    {i + 1}.
                  </span>
                  <p className="text-sm text-foreground leading-snug">{nota}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTION BUTTONS — inside the card, at the bottom ── */}
        <div className="px-5 pb-8 pt-2">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSwipe('left', lead.id)
              }}
              className="w-16 h-16 rounded-full bg-white shadow-md border border-border flex items-center justify-center active:scale-90 transition-transform"
              aria-label="Archivar lead"
            >
              <X size={26} className="text-[var(--nope-color)]" strokeWidth={2.5} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSwipe('right', lead.id)
              }}
              className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
              style={{ background: 'var(--like-color)' }}
              aria-label="Aceptar lead"
            >
              <Heart size={32} className="fill-white text-white" />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-4 font-medium">
            desliza o usa los botones
          </p>
        </div>
      </div>
    </motion.div>
  )
}

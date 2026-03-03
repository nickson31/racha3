'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { ChevronDown, ChevronUp, Building2, Mail } from 'lucide-react'
import type { Lead } from '@/lib/leads-data'

interface LeadCardProps {
  lead: Lead
  onSwipe: (direction: 'left' | 'right', leadId: string) => void
  isTop: boolean
  stackIndex: number
}

const SWIPE_THRESHOLD = 80

// Deterministic color from lead id for avatar bg
const AVATAR_COLORS = [
  ['#fde8ea', '#fd5564'],
  ['#e8f9f1', '#21c17a'],
  ['#e8f0fd', '#4a7cfc'],
  ['#fdf5e8', '#f5a623'],
  ['#f0e8fd', '#9b59b6'],
  ['#e8fdfc', '#1abc9c'],
]

function getAvatarColors(id: string) {
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

export function LeadCard({ lead, onSwipe, isTop, stackIndex }: LeadCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-18, 18])
  const likeOpacity = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1])
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0])
  const [isExpanded, setIsExpanded] = useState(false)

  const [avatarBg, avatarText] = getAvatarColors(lead.id)

  const scoreColor =
    (lead.score ?? 0) >= 80
      ? 'var(--score-high)'
      : (lead.score ?? 0) >= 60
      ? 'var(--score-mid)'
      : 'var(--score-low)'

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe('right', lead.id)
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe('left', lead.id)
    }
  }

  if (!isTop) {
    return (
      <div
        className="absolute inset-0 rounded-2xl bg-card shadow-sm border border-border"
        style={{
          transform: `translateY(${stackIndex * 10}px) scale(${1 - stackIndex * 0.04})`,
          opacity: Math.max(0, 1 - stackIndex * 0.3),
          zIndex: 10 - stackIndex,
        }}
      />
    )
  }

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl bg-card shadow-lg border border-border overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ x, rotate, zIndex: 20, touchAction: isExpanded ? 'pan-y' : 'none' }}
      drag={!isExpanded ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
    >
      {/* LIKE stamp */}
      <motion.div
        className="absolute top-6 left-5 z-30 border-[3px] border-[var(--like-color)] rounded-xl px-3 py-1 rotate-[-12deg] pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        <span className="text-[var(--like-color)] font-extrabold text-xl tracking-widest">
          LIKE
        </span>
      </motion.div>

      {/* NOPE stamp */}
      <motion.div
        className="absolute top-6 right-5 z-30 border-[3px] border-[var(--nope-color)] rounded-xl px-3 py-1 rotate-[12deg] pointer-events-none"
        style={{ opacity: nopeOpacity }}
      >
        <span className="text-[var(--nope-color)] font-extrabold text-xl tracking-widest">
          NOPE
        </span>
      </motion.div>

      {/* Scrollable inner */}
      <div
        className="h-full flex flex-col overflow-y-auto overscroll-contain"
        style={{ touchAction: isExpanded ? 'pan-y' : 'none' }}
      >
        {/* Avatar zone — top ~42% of card */}
        <div
          className="shrink-0 flex flex-col items-center justify-center gap-3 pt-10 pb-6 px-6"
          style={{ background: avatarBg, minHeight: '44%' }}
        >
          {/* Score pill */}
          <div
            className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: scoreColor }}
          >
            {lead.score ?? '—'}
          </div>

          {/* Avatar circle */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold shadow-md"
            style={{ background: avatarText, color: '#fff' }}
          >
            {getInitials(lead.nombre)}
          </div>

          {/* Name */}
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

          {/* Company pill */}
          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Building2 size={12} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">{lead.empresa}</span>
          </div>
        </div>

        {/* Tags row */}
        <div className="px-5 pt-4 flex flex-wrap gap-2">
          {lead.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-border"
              style={{
                background:
                  tag.includes('High') || tag.includes('budget') || tag.includes('intent')
                    ? '#e8f9f1'
                    : '#f0f0f3',
                color:
                  tag.includes('High') || tag.includes('budget') || tag.includes('intent')
                    ? 'var(--like-color)'
                    : 'var(--muted-foreground)',
                borderColor:
                  tag.includes('High') || tag.includes('budget') || tag.includes('intent')
                    ? 'var(--like-color)'
                    : 'transparent',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand / collapse intel */}
        <button
          className="flex items-center justify-between px-5 py-3 mt-2 text-left w-full"
          onClick={() => setIsExpanded((v) => !v)}
        >
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Informacion del lead
          </span>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-muted-foreground" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-5 pb-5 space-y-3">
            <p className="text-sm text-secondary-foreground leading-relaxed">
              {lead.bio_detallada}
            </p>
            {lead.contacto && (
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
                <Mail size={13} className="text-primary shrink-0" />
                <span className="text-sm font-semibold text-foreground">{lead.contacto}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Swipe hint */}
        {!isExpanded && (
          <div className="flex items-center justify-between px-6 pb-5 pt-1 mt-auto">
            <span className="text-xs font-bold text-[var(--nope-color)]/50">NOPE</span>
            <span className="text-[10px] text-muted-foreground">desliza</span>
            <span className="text-xs font-bold text-[var(--like-color)]/50">LIKE</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { ChevronUp, Building2, Zap } from 'lucide-react'
import type { Lead } from '@/lib/leads-data'

interface LeadCardProps {
  lead: Lead
  onSwipe: (direction: 'left' | 'right', leadId: string) => void
  isTop: boolean
  stackIndex: number
}

const SWIPE_THRESHOLD = 80

export function LeadCard({ lead, onSwipe, isTop, stackIndex }: LeadCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-20, 20])
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1])
  const dislikeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0])
  const cardScale = useTransform(x, [-200, 0, 200], [0.96, 1, 0.96])
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe('right', lead.id)
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe('left', lead.id)
    }
  }

  const scoreColor =
    (lead.score ?? 0) >= 80
      ? '#00ff66'
      : (lead.score ?? 0) >= 60
      ? '#ffcc00'
      : '#888888'

  const stackOffset = stackIndex * 6
  const stackOpacity = Math.max(0, 1 - stackIndex * 0.25)

  if (!isTop) {
    return (
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          transform: `translateY(${stackOffset}px) scale(${1 - stackIndex * 0.03})`,
          background: '#0d0d0d',
          border: '1px solid #222',
          opacity: stackOpacity,
          zIndex: 10 - stackIndex,
        }}
      />
    )
  }

  return (
    <motion.div
      className="absolute inset-0 rounded-lg cursor-grab active:cursor-grabbing select-none"
      style={{
        x,
        rotate,
        scale: cardScale,
        background: '#0d0d0d',
        border: '1px solid #222222',
        zIndex: 20,
        touchAction: isExpanded ? 'pan-y' : 'none',
      }}
      drag={!isExpanded ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={!isExpanded ? { cursor: 'grabbing' } : undefined}
    >
      {/* LIKE stamp */}
      <motion.div
        className="absolute top-6 left-4 z-30 border-2 border-[#00ff66] rounded px-2 py-1 rotate-[-12deg]"
        style={{ opacity: likeOpacity }}
      >
        <span className="text-[#00ff66] font-bold text-lg tracking-widest">LIKE</span>
      </motion.div>

      {/* NOPE stamp */}
      <motion.div
        className="absolute top-6 right-4 z-30 border-2 border-[#ff3333] rounded px-2 py-1 rotate-[12deg]"
        style={{ opacity: dislikeOpacity }}
      >
        <span className="text-[#ff3333] font-bold text-lg tracking-widest">NOPE</span>
      </motion.div>

      {/* Scrollable content area */}
      <div
        ref={contentRef}
        className="h-full overflow-y-auto overscroll-contain"
        style={{ touchAction: isExpanded ? 'pan-y' : 'none' }}
        onTouchStart={() => isExpanded && undefined}
      >
        {/* Header */}
        <div className="p-5 pt-6">
          {/* Score bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-[#555] tracking-widest uppercase">Score</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${lead.score ?? 50}%`,
                    backgroundColor: scoreColor,
                  }}
                />
              </div>
              <span className="text-xs font-bold" style={{ color: scoreColor }}>
                {lead.score ?? '—'}
              </span>
            </div>
          </div>

          {/* Name & company */}
          <h2 className="text-xl font-bold text-white leading-tight mb-1">
            {lead.nombre}
          </h2>
          <div className="flex items-center gap-1.5 mb-1">
            <Building2 size={12} className="text-[#555]" />
            <span className="text-sm text-[#888]">{lead.empresa}</span>
          </div>
          {lead.cargo && (
            <span className="text-xs text-[#555]">{lead.cargo}</span>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {lead.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-sm border"
                style={{
                  borderColor:
                    tag.includes('High') || tag.includes('budget')
                      ? '#00ff6644'
                      : '#222',
                  color:
                    tag.includes('High') || tag.includes('budget')
                      ? '#00ff66'
                      : '#666',
                  background:
                    tag.includes('High') || tag.includes('budget')
                      ? '#00ff6608'
                      : 'transparent',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-[#1a1a1a]" />

        {/* Bio expand toggle */}
        <button
          className="w-full flex items-center justify-between px-5 py-3 text-left"
          onClick={() => setIsExpanded((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-[#00ff66]" />
            <span className="text-[11px] text-[#555] tracking-widest uppercase">
              Intel
            </span>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronUp size={16} className="text-[#444]" />
          </motion.div>
        </button>

        {/* Bio */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-5 pb-5">
            <p className="text-[13px] text-[#888] leading-relaxed whitespace-pre-line">
              {lead.bio_detallada}
            </p>
            {lead.contacto && (
              <div className="mt-4 pt-3 border-t border-[#1a1a1a]">
                <span className="text-[10px] text-[#444] tracking-widest uppercase block mb-1">
                  Contacto
                </span>
                <span className="text-[12px] text-[#00ff66]">{lead.contacto}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Swipe hint — only show when collapsed */}
        {!isExpanded && (
          <div className="px-5 pb-6 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#ff3333]/60 tracking-widest">← NOPE</span>
              <span className="text-[10px] text-[#333]">desliza</span>
              <span className="text-[10px] text-[#00ff66]/60 tracking-widest">LIKE →</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

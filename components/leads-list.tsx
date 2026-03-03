'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Building2, Zap, Archive } from 'lucide-react'
import type { Lead } from '@/lib/leads-data'

interface LeadsListProps {
  leads: Lead[]
  mode: 'liked' | 'archived'
  onBack: () => void
}

export function LeadsList({ leads, mode, onBack }: LeadsListProps) {
  const isLiked = mode === 'liked'
  const accentColor = isLiked ? '#00ff66' : '#555555'
  const title = isLiked ? 'Aceptados' : 'Archivados'

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[#111] shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-11 h-11 rounded-full border border-[#222] bg-[#0d0d0d] active:bg-[#1a1a1a] transition-colors shrink-0"
          aria-label="Volver al dashboard"
        >
          <ArrowLeft size={18} className="text-[#888]" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            {isLiked ? (
              <Zap size={14} style={{ color: accentColor }} />
            ) : (
              <Archive size={14} style={{ color: accentColor }} />
            )}
            <span
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              {title}
            </span>
          </div>
          <span className="text-[11px] text-[#444]">
            {leads.length} lead{leads.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <span className="text-4xl" style={{ color: '#1a1a1a' }}>
              {isLiked ? '◎' : '◻'}
            </span>
            <p className="text-[#444] text-sm tracking-widest uppercase">
              Lista vacía
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#111]">
            {leads.map((lead, i) => (
              <motion.li
                key={lead.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="flex items-start gap-3 px-4 py-4 active:bg-[#0d0d0d] transition-colors"
              >
                {/* Score indicator */}
                <div
                  className="mt-0.5 w-1 self-stretch rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      isLiked
                        ? (lead.score ?? 0) >= 80
                          ? '#00ff66'
                          : (lead.score ?? 0) >= 60
                          ? '#ffcc00'
                          : '#444'
                        : '#333',
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">
                        {lead.nombre}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Building2 size={10} className="text-[#444] shrink-0" />
                        <span className="text-[11px] text-[#555] truncate">
                          {lead.empresa}
                        </span>
                      </div>
                    </div>
                    {lead.score !== undefined && (
                      <span
                        className="text-[11px] font-bold shrink-0"
                        style={{
                          color: isLiked
                            ? (lead.score ?? 0) >= 80
                              ? '#00ff66'
                              : (lead.score ?? 0) >= 60
                              ? '#ffcc00'
                              : '#666'
                            : '#444',
                        }}
                      >
                        {lead.score}
                      </span>
                    )}
                  </div>

                  {/* Tags — first 3 only */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {lead.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-1.5 py-0.5 rounded-sm border border-[#1a1a1a] text-[#444]"
                      >
                        {tag}
                      </span>
                    ))}
                    {lead.tags.length > 3 && (
                      <span className="text-[9px] text-[#333]">
                        +{lead.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

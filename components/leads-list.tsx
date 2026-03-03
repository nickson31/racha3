'use client'

import { motion } from 'framer-motion'
import { Building2, Star, Archive, ChevronRight } from 'lucide-react'
import type { Lead } from '@/lib/leads-data'

interface LeadsListProps {
  leads: Lead[]
  mode: 'liked' | 'archived'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

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

export function LeadsList({ leads, mode }: LeadsListProps) {
  const isLiked = mode === 'liked'

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          {isLiked ? (
            <Star size={18} className="fill-primary text-primary" />
          ) : (
            <Archive size={18} className="text-muted-foreground" />
          )}
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            {isLiked ? 'Aceptados' : 'Archivados'}
          </h1>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          {leads.length} lead{leads.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-border" />

      {/* List */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: isLiked ? '#e8f9f1' : '#f0f0f3' }}
            >
              {isLiked ? (
                <Star size={24} className="text-[var(--like-color)]" />
              ) : (
                <Archive size={24} className="text-muted-foreground" />
              )}
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">Lista vacia</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isLiked
                  ? 'Acepta leads desde Explorar'
                  : 'Los leads archivados apareceran aqui'}
              </p>
            </div>
          </div>
        ) : (
          <ul>
            {leads.map((lead, i) => {
              const [avatarBg, avatarFg] = getAvatarColors(lead.id)
              const scoreColor =
                (lead.score ?? 0) >= 80
                  ? 'var(--score-high)'
                  : (lead.score ?? 0) >= 60
                  ? 'var(--score-mid)'
                  : 'var(--score-low)'

              return (
                <motion.li
                  key={lead.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="flex items-center gap-3 px-5 py-3.5 active:bg-secondary transition-colors border-b border-border last:border-0"
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-sm font-extrabold"
                    style={{ background: avatarBg, color: avatarFg }}
                  >
                    {getInitials(lead.nombre)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground leading-tight truncate">
                        {lead.nombre}
                      </p>
                      {lead.score !== undefined && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white shrink-0"
                          style={{ background: scoreColor }}
                        >
                          {lead.score}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Building2 size={10} className="text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">
                        {lead.empresa}
                      </span>
                      {lead.cargo && (
                        <span className="text-xs text-muted-foreground truncate">
                          · {lead.cargo}
                        </span>
                      )}
                    </div>
                    {/* Tags */}
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {lead.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {lead.tags.length > 2 && (
                        <span className="text-[9px] text-muted-foreground">
                          +{lead.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                </motion.li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

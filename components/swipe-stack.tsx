'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import { LeadCard } from '@/components/lead-card'
import type { Lead } from '@/lib/leads-data'

interface SwipeStackProps {
  leads: Lead[]
  onLike: (lead: Lead) => void
  onDislike: (lead: Lead) => void
}

export function SwipeStack({ leads, onLike, onDislike }: SwipeStackProps) {
  const [remaining, setRemaining] = useState(leads)
  const [lastAction, setLastAction] = useState<'like' | 'dislike' | null>(null)

  const handleSwipe = useCallback(
    (direction: 'left' | 'right', leadId: string) => {
      const lead = remaining.find((l) => l.id === leadId)
      if (!lead) return
      if (direction === 'right') {
        onLike(lead)
        setLastAction('like')
      } else {
        onDislike(lead)
        setLastAction('dislike')
      }
      setRemaining((prev) => prev.filter((l) => l.id !== leadId))
      setTimeout(() => setLastAction(null), 800)
    },
    [remaining, onLike, onDislike]
  )

  const topLead = remaining[0]
  const previewLeads = remaining.slice(1, 3)

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Smart Leads
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            {remaining.length} lead{remaining.length !== 1 ? 's' : ''} pendiente{remaining.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Action feedback */}
        <AnimatePresence>
          {lastAction && (
            <motion.div
              key={lastAction}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              style={{
                background: lastAction === 'like' ? '#e8f9f1' : '#fde8ea',
              }}
            >
              {lastAction === 'like' ? (
                <Heart size={18} className="fill-[var(--like-color)] text-[var(--like-color)]" />
              ) : (
                <X size={18} className="text-[var(--nope-color)]" strokeWidth={2.5} />
              )}
            </motion.div>
          )}
          {!lastAction && <div className="w-10 h-10" />}
        </AnimatePresence>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative mx-4 mt-2 mb-3">
        {remaining.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <Flame size={32} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">Todo al dia</p>
              <p className="text-sm text-muted-foreground mt-1">No quedan leads por revisar</p>
            </div>
          </motion.div>
        ) : (
          <>
            {previewLeads.map((lead, i) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onSwipe={handleSwipe}
                isTop={false}
                stackIndex={i + 1}
              />
            ))}
            <AnimatePresence>
              {topLead && (
                <motion.div
                  key={topLead.id}
                  className="absolute inset-0"
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <LeadCard
                    lead={topLead}
                    onSwipe={handleSwipe}
                    isTop={true}
                    stackIndex={0}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Action buttons — Tinder style */}
      {remaining.length > 0 && (
        <div className="flex justify-center items-center gap-6 pb-4 shrink-0">
          <button
            onClick={() => topLead && handleSwipe('left', topLead.id)}
            className="w-16 h-16 rounded-full bg-white shadow-md border border-border flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Archivar lead"
          >
            <X size={26} className="text-[var(--nope-color)]" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => topLead && handleSwipe('right', topLead.id)}
            className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'var(--like-color)' }}
            aria-label="Aceptar lead"
          >
            <Heart size={30} className="fill-white text-white" />
          </button>
          <button
            onClick={() => topLead && handleSwipe('left', topLead.id)}
            className="w-16 h-16 rounded-full bg-white shadow-md border border-border flex items-center justify-center active:scale-95 transition-transform opacity-0 pointer-events-none"
            aria-hidden
          >
            <X size={26} />
          </button>
        </div>
      )}
    </div>
  )
}

function Flame({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2C12 2 9 7 9 10.5C9 12.4 10.3 14 12 14C13.7 14 15 12.4 15 10.5C15 9 14 7.5 14 7.5C14 7.5 17 9.5 17 13C17 16.9 14.8 19.5 12 19.5C9.2 19.5 7 16.9 7 13C7 8.5 12 2 12 2Z" />
    </svg>
  )
}

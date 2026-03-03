'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { LeadCard } from '@/components/lead-card'
import type { Lead } from '@/lib/leads-data'

interface SwipeStackProps {
  leads: Lead[]
  onLike: (lead: Lead) => void
  onDislike: (lead: Lead) => void
  onBack: () => void
}

export function SwipeStack({ leads, onLike, onDislike, onBack }: SwipeStackProps) {
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

      // reset last action indicator after 1s
      setTimeout(() => setLastAction(null), 800)
    },
    [remaining, onLike, onDislike]
  )

  const topLead = remaining[0]
  const previewLeads = remaining.slice(1, 3)

  return (
    <div className="relative flex flex-col h-full bg-background overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-11 h-11 rounded-full border border-[#222] bg-[#0d0d0d] active:bg-[#1a1a1a] transition-colors"
          aria-label="Volver al dashboard"
        >
          <ArrowLeft size={18} className="text-[#888]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] text-[#555] tracking-widest uppercase block">
            Nuevos Leads
          </span>
          <span className="text-xs text-[#333]">
            {remaining.length} restante{remaining.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Action feedback badge */}
        <AnimatePresence>
          {lastAction && (
            <motion.div
              key={lastAction}
              initial={{ opacity: 0, scale: 0.8, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-11 h-11 rounded-full flex items-center justify-center border"
              style={{
                borderColor: lastAction === 'like' ? '#00ff6633' : '#ff333333',
                background: lastAction === 'like' ? '#00ff6612' : '#ff333312',
              }}
            >
              <span
                className="text-sm font-bold"
                style={{ color: lastAction === 'like' ? '#00ff66' : '#ff3333' }}
              >
                {lastAction === 'like' ? '+' : '−'}
              </span>
            </motion.div>
          )}
          {!lastAction && <div className="w-11 h-11" />}
        </AnimatePresence>
      </div>

      {/* Card stack area */}
      <div className="flex-1 relative mx-4 mb-24">
        {remaining.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-[#222] flex items-center justify-center">
              <span className="text-[#555] text-xl">∅</span>
            </div>
            <p className="text-[#555] text-sm tracking-widest uppercase">
              Sin leads pendientes
            </p>
            <button
              onClick={onBack}
              className="text-[11px] text-[#00ff66] border border-[#00ff6633] px-4 py-2 rounded active:bg-[#00ff6610] transition-colors"
            >
              Volver al dashboard
            </button>
          </motion.div>
        ) : (
          <>
            {/* Background stack cards */}
            {previewLeads.map((lead, i) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onSwipe={handleSwipe}
                isTop={false}
                stackIndex={i + 1}
              />
            ))}

            {/* Top swipeable card */}
            <AnimatePresence>
              {topLead && (
                <motion.div
                  key={topLead.id}
                  className="absolute inset-0"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    x: 0,
                    opacity: 0,
                    transition: { duration: 0.15 },
                  }}
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

      {/* Bottom action buttons */}
      {remaining.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 pb-8 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
          <button
            onClick={() => topLead && handleSwipe('left', topLead.id)}
            className="w-16 h-16 rounded-full border-2 border-[#ff333355] bg-[#0d0d0d] flex items-center justify-center active:bg-[#ff333318] active:border-[#ff3333] transition-all"
            aria-label="Archivar lead"
          >
            <span className="text-[#ff3333] text-2xl font-light">✕</span>
          </button>
          <button
            onClick={() => topLead && handleSwipe('right', topLead.id)}
            className="w-16 h-16 rounded-full border-2 border-[#00ff6655] bg-[#0d0d0d] flex items-center justify-center active:bg-[#00ff6618] active:border-[#00ff66] transition-all"
            aria-label="Aceptar lead"
          >
            <span className="text-[#00ff66] text-2xl font-light">✓</span>
          </button>
        </div>
      )}
    </div>
  )
}

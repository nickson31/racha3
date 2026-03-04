'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import { LeadCard } from '@/components/lead-card'
import type { Lead } from '@/lib/leads-data'

interface SwipeStackProps {
  leads: Lead[]
  onLike: (lead: Lead) => void
  onDislike: (lead: Lead) => void
}

export function SwipeStack({ leads, onLike, onDislike }: SwipeStackProps) {
  // Keep a local ordered queue; sync when new leads appear (e.g. on mount)
  const [queue, setQueue] = useState<Lead[]>(leads)
  const [lastAction, setLastAction] = useState<'like' | 'dislike' | null>(null)

  // If the parent adds leads back (reset), re-sync
  useEffect(() => {
    setQueue(leads)
  }, [leads.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSwipe = useCallback(
    (direction: 'left' | 'right', leadId: string) => {
      const lead = queue.find((l) => l.id === leadId)
      if (!lead) return
      if (direction === 'right') {
        onLike(lead)
        setLastAction('like')
      } else {
        onDislike(lead)
        setLastAction('dislike')
      }
      setQueue((prev) => prev.filter((l) => l.id !== leadId))
      setTimeout(() => setLastAction(null), 700)
    },
    [queue, onLike, onDislike]
  )

  const topLead = queue[0]
  const previewLeads = queue.slice(1, 3)

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Smart Leads
          </h1>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">
            {queue.length} lead{queue.length !== 1 ? 's' : ''} pendiente
            {queue.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Action feedback pill */}
        <AnimatePresence mode="wait">
          {lastAction ? (
            <motion.div
              key={lastAction}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="w-11 h-11 rounded-full flex items-center justify-center shadow"
              style={{
                background: lastAction === 'like' ? '#e8f9f1' : '#fde8ea',
              }}
            >
              {lastAction === 'like' ? (
                <Heart
                  size={20}
                  className="fill-[var(--like-color)] text-[var(--like-color)]"
                />
              ) : (
                <X
                  size={20}
                  className="text-[var(--nope-color)]"
                  strokeWidth={2.5}
                />
              )}
            </motion.div>
          ) : (
            <div key="empty" className="w-11 h-11" />
          )}
        </AnimatePresence>
      </div>

      {/* Card stack area */}
      <div className="flex-1 relative mx-4 mt-1 mb-2 min-h-0">
        {queue.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <Inbox size={32} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">Todo al dia</p>
              <p className="text-sm text-muted-foreground mt-1">
                No quedan leads por revisar
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Background stacked cards */}
            {previewLeads.map((lead, i) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onSwipe={handleSwipe}
                isTop={false}
                stackIndex={i + 1}
              />
            ))}

            {/* Top draggable card */}
            <AnimatePresence>
              {topLead && (
                <motion.div
                  key={topLead.id}
                  className="absolute inset-0"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.18 }}
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


    </div>
  )
}

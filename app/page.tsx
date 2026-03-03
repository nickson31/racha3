'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SwipeStack } from '@/components/swipe-stack'
import { LeadsList } from '@/components/leads-list'
import { ChatInterface } from '@/components/chat-interface'
import { TabBar } from '@/components/tab-bar'
import { MOCK_LEADS, type Lead } from '@/lib/leads-data'

export type View = 'swipe' | 'liked' | 'archived' | 'chat'

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
}

const VIEW_ORDER: View[] = ['chat', 'swipe', 'liked', 'archived']

export default function Page() {
  const [view, setView] = useState<View>('swipe')
  const [prevView, setPrevView] = useState<View>('swipe')
  const [likedLeads, setLikedLeads] = useState<Lead[]>([])
  const [archivedLeads, setArchivedLeads] = useState<Lead[]>([])

  const navigate = useCallback(
    (next: View) => {
      setPrevView(view)
      setView(next)
    },
    [view]
  )

  const viewDirection =
    VIEW_ORDER.indexOf(view) >= VIEW_ORDER.indexOf(prevView) ? 1 : -1

  const handleLike = useCallback((lead: Lead) => {
    setLikedLeads((prev) =>
      prev.find((l) => l.id === lead.id) ? prev : [...prev, lead]
    )
  }, [])

  const handleDislike = useCallback((lead: Lead) => {
    setArchivedLeads((prev) =>
      prev.find((l) => l.id === lead.id) ? prev : [...prev, lead]
    )
  }, [])

  const pendingLeads = MOCK_LEADS.filter(
    (l) =>
      !likedLeads.find((ll) => ll.id === l.id) &&
      !archivedLeads.find((al) => al.id === l.id)
  )

  return (
    <main
      className="relative flex flex-col w-full overflow-hidden bg-background"
      style={{ height: '100dvh' }}
    >
      {/* Screen content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={viewDirection} mode="wait">
          {view === 'swipe' && (
            <motion.div
              key="swipe"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <SwipeStack
                leads={pendingLeads}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            </motion.div>
          )}

          {view === 'liked' && (
            <motion.div
              key="liked"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <LeadsList leads={likedLeads} mode="liked" />
            </motion.div>
          )}

          {view === 'archived' && (
            <motion.div
              key="archived"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <LeadsList leads={archivedLeads} mode="archived" />
            </motion.div>
          )}

          {view === 'chat' && (
            <motion.div
              key="chat"
              custom={viewDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <ChatInterface likedLeads={likedLeads} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom tab bar */}
      <TabBar
        activeView={view}
        onNavigate={navigate}
        likedCount={likedLeads.length}
        pendingCount={pendingLeads.length}
      />
    </main>
  )
}

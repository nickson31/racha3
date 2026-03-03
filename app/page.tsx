'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dashboard } from '@/components/dashboard'
import { SwipeStack } from '@/components/swipe-stack'
import { LeadsList } from '@/components/leads-list'
import { ChatInterface } from '@/components/chat-interface'
import { MOCK_LEADS, type Lead } from '@/lib/leads-data'

type View = 'dashboard' | 'swipe' | 'liked' | 'archived' | 'chat'

// handleSwipe — connect this to Firebase in production
function handleSwipeFirebase(direction: 'left' | 'right', leadId: string) {
  // TODO: Firebase integration
  // await setDoc(doc(db, 'leads', leadId), { status: direction === 'right' ? 'liked' : 'archived' }, { merge: true })
  console.log('[v0] handleSwipe', direction, leadId)
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

export default function Page() {
  const [view, setView] = useState<View>('dashboard')
  const [prevView, setPrevView] = useState<View>('dashboard')
  const [likedLeads, setLikedLeads] = useState<Lead[]>([])
  const [archivedLeads, setArchivedLeads] = useState<Lead[]>([])

  // Determine slide direction (chat/dashboard = horizontal, others = up)
  const direction = view === 'dashboard' ? -1 : 1

  const navigate = useCallback((next: View) => {
    setPrevView(view)
    setView(next)
  }, [view])

  const handleLike = useCallback((lead: Lead) => {
    handleSwipeFirebase('right', lead.id)
    setLikedLeads((prev) =>
      prev.find((l) => l.id === lead.id) ? prev : [...prev, lead]
    )
  }, [])

  const handleDislike = useCallback((lead: Lead) => {
    handleSwipeFirebase('left', lead.id)
    setArchivedLeads((prev) =>
      prev.find((l) => l.id === lead.id) ? prev : [...prev, lead]
    )
  }, [])

  // Only show leads not yet decided
  const pendingLeads = MOCK_LEADS.filter(
    (l) =>
      !likedLeads.find((ll) => ll.id === l.id) &&
      !archivedLeads.find((al) => al.id === l.id)
  )

  const viewDirection = prevView === 'dashboard' ? 1 : view === 'dashboard' ? -1 : 1

  return (
    <main
      className="relative w-full overflow-hidden bg-background"
      style={{ height: '100dvh' }}
    >
      <AnimatePresence initial={false} custom={viewDirection} mode="wait">
        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            custom={viewDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Dashboard
              likedCount={likedLeads.length}
              archivedCount={archivedLeads.length}
              onNavigate={navigate}
            />
          </motion.div>
        )}

        {view === 'swipe' && (
          <motion.div
            key="swipe"
            custom={viewDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <SwipeStack
              leads={pendingLeads}
              onLike={handleLike}
              onDislike={handleDislike}
              onBack={() => navigate('dashboard')}
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
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <LeadsList
              leads={likedLeads}
              mode="liked"
              onBack={() => navigate('dashboard')}
            />
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
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <LeadsList
              leads={archivedLeads}
              mode="archived"
              onBack={() => navigate('dashboard')}
            />
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
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ChatInterface
              likedLeads={likedLeads}
              onBack={() => navigate('dashboard')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

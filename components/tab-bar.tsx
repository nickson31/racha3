'use client'

import { motion } from 'framer-motion'
import { Flame, Star, Archive, MessageCircle } from 'lucide-react'
import type { View } from '@/app/page'

interface TabBarProps {
  activeView: View
  onNavigate: (view: View) => void
  likedCount: number
  pendingCount: number
}

const tabs: { id: View; label: string; icon: React.ElementType }[] = [
  { id: 'chat', label: 'Asistente', icon: MessageCircle },
  { id: 'swipe', label: 'Explorar', icon: Flame },
  { id: 'liked', label: 'Aceptados', icon: Star },
  { id: 'archived', label: 'Archivados', icon: Archive },
]

export function TabBar({ activeView, onNavigate, likedCount, pendingCount }: TabBarProps) {
  return (
    <nav
      className="shrink-0 flex items-center bg-[var(--tab-bar-bg)] border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Navegación principal"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeView === tab.id
        const badge =
          tab.id === 'liked' && likedCount > 0
            ? likedCount
            : tab.id === 'swipe' && pendingCount > 0
            ? pendingCount
            : null

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex-1 flex flex-col items-center gap-1 py-3 relative transition-colors"
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="relative">
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className="transition-colors"
                style={{
                  color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                  fill: isActive && tab.id === 'swipe' ? 'var(--primary)' : 'none',
                }}
              />
              {badge && (
                <span
                  className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center px-0.5"
                >
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </div>
            <span
              className="text-[10px] font-semibold transition-colors"
              style={{ color: isActive ? 'var(--primary)' : 'var(--muted-foreground)' }}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}

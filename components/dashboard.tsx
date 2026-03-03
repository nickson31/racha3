'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Compass, Zap, Archive } from 'lucide-react'

type View = 'dashboard' | 'swipe' | 'liked' | 'archived' | 'chat'

interface DashboardProps {
  likedCount: number
  archivedCount: number
  onNavigate: (view: View) => void
}

export function Dashboard({ likedCount, archivedCount, onNavigate }: DashboardProps) {
  const [exploreOpen, setExploreOpen] = useState(false)

  return (
    <div className="relative flex flex-col h-full bg-background overflow-hidden scanlines">
      {/* Top-center logo */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-12 pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold tracking-[0.3em] text-white">
            BASU
          </h1>
          <p className="text-[10px] text-[#333] tracking-[0.4em] uppercase mt-0.5">
            OPENCLAW · v1
          </p>
        </motion.div>

        {/* Animated center pulse */}
        <motion.div
          className="mt-8 w-px h-16 bg-gradient-to-b from-[#00ff6655] to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
      </div>

      {/* ── CORNER BUTTONS ── */}

      {/* TOP LEFT — CHAT */}
      <div className="absolute top-0 left-0 p-4 z-20">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => onNavigate('chat')}
          className="flex flex-col items-start gap-1.5 active:opacity-70 transition-opacity"
          aria-label="Abrir chat con Roberto"
        >
          <div className="w-14 h-14 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-center active:bg-[#141414]">
            <MessageSquare size={22} className="text-white" />
          </div>
          <span className="text-[9px] text-[#444] tracking-widest uppercase pl-0.5">
            Chat
          </span>
        </motion.button>
      </div>

      {/* TOP RIGHT — STATUS */}
      <div className="absolute top-0 right-0 p-4 z-20">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-end gap-1.5"
        >
          <div className="w-14 h-14 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-center opacity-40">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#555]" />
            </div>
          </div>
          <span className="text-[9px] text-[#2a2a2a] tracking-widest uppercase pr-0.5">
            Offline
          </span>
        </motion.div>
      </div>

      {/* BOTTOM LEFT — SYSTEM */}
      <div className="absolute bottom-0 left-0 p-4 pb-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-start gap-1.5"
        >
          <div className="w-14 h-14 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] flex items-center justify-center opacity-30">
            <div className="grid grid-cols-2 gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-sm bg-[#444]" />
              ))}
            </div>
          </div>
          <span className="text-[9px] text-[#2a2a2a] tracking-widest uppercase pl-0.5">
            Sistema
          </span>
        </motion.div>
      </div>

      {/* BOTTOM RIGHT — EXPLORAR */}
      <div className="absolute bottom-0 right-0 p-4 pb-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-end gap-1.5"
        >
          <button
            onClick={() => setExploreOpen((v) => !v)}
            className="w-14 h-14 rounded-xl border border-[#00ff6633] bg-[#0d0d0d] flex items-center justify-center active:bg-[#00ff6610] active:border-[#00ff6666] transition-all relative"
            aria-label="Abrir menú explorar"
            aria-expanded={exploreOpen}
          >
            <Compass size={22} className="text-[#00ff66]" />
            {/* badge */}
            {likedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00ff66] text-black text-[8px] font-bold flex items-center justify-center">
                {likedCount}
              </span>
            )}
          </button>
          <span className="text-[9px] text-[#00ff66] tracking-widest uppercase pr-0.5">
            Explorar
          </span>
        </motion.div>
      </div>

      {/* ── CENTER STATUS DISPLAY ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex gap-8 mt-32">
          <div className="text-center">
            <span className="text-2xl font-bold text-[#00ff66]">{likedCount}</span>
            <p className="text-[9px] text-[#333] tracking-widest uppercase mt-1">Acepta</p>
          </div>
          <div className="w-px bg-[#111]" />
          <div className="text-center">
            <span className="text-2xl font-bold text-[#555]">{archivedCount}</span>
            <p className="text-[9px] text-[#333] tracking-widest uppercase mt-1">Archiv</p>
          </div>
        </div>
      </div>

      {/* ── EXPLORE FLOATING MENU ── */}
      <AnimatePresence>
        {exploreOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30"
              onClick={() => setExploreOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute bottom-32 right-4 z-40 w-52 bg-[#0d0d0d] border border-[#222] rounded-xl overflow-hidden shadow-2xl"
            >
              {/* New leads */}
              <button
                onClick={() => {
                  setExploreOpen(false)
                  onNavigate('swipe')
                }}
                className="w-full flex items-center gap-3 px-4 py-4 border-b border-[#111] active:bg-[#141414] transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg border border-[#00ff6633] bg-[#00ff6608] flex items-center justify-center shrink-0">
                  <Compass size={14} className="text-[#00ff66]" />
                </div>
                <div>
                  <p className="text-sm text-white font-bold">Nuevos Leads</p>
                  <p className="text-[10px] text-[#555]">Swipe para filtrar</p>
                </div>
              </button>

              {/* Liked */}
              <button
                onClick={() => {
                  setExploreOpen(false)
                  onNavigate('liked')
                }}
                className="w-full flex items-center gap-3 px-4 py-4 border-b border-[#111] active:bg-[#141414] transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg border border-[#00ff6622] bg-[#0d0d0d] flex items-center justify-center shrink-0">
                  <Zap size={14} className="text-[#00ff66]" />
                </div>
                <div>
                  <p className="text-sm text-white font-bold">Aceptados</p>
                  <p className="text-[10px] text-[#555]">{likedCount} leads</p>
                </div>
              </button>

              {/* Archived */}
              <button
                onClick={() => {
                  setExploreOpen(false)
                  onNavigate('archived')
                }}
                className="w-full flex items-center gap-3 px-4 py-4 active:bg-[#141414] transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg border border-[#1a1a1a] flex items-center justify-center shrink-0">
                  <Archive size={14} className="text-[#555]" />
                </div>
                <div>
                  <p className="text-sm text-white font-bold">Archivados</p>
                  <p className="text-[10px] text-[#555]">{archivedCount} leads</p>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

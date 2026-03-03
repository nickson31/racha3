'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, Square, Trash2, Terminal } from 'lucide-react'
import { useOllama } from '@/hooks/use-ollama'
import type { Lead } from '@/lib/leads-data'

interface ChatInterfaceProps {
  likedLeads: Lead[]
  onBack: () => void
}

export function ChatInterface({ likedLeads, onBack }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const { messages, isLoading, sendMessage, clearMessages, stopGeneration } =
    useOllama({ model: 'openclaw' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input.trim(), likedLeads)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // auto-grow textarea
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
  }

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

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Terminal size={13} className="text-[#00ff66] shrink-0" />
            <span className="text-sm font-bold text-white tracking-widest">
              ROBERTO
            </span>
            <span className="text-[10px] text-[#444]">/ OPENCLAW</span>
          </div>
          <span className="text-[10px] text-[#444]">
            {likedLeads.length} lead{likedLeads.length !== 1 ? 's' : ''} en contexto
          </span>
        </div>

        <button
          onClick={clearMessages}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-[#222] active:bg-[#1a1a1a] transition-colors"
          aria-label="Limpiar conversación"
        >
          <Trash2 size={14} className="text-[#444]" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full gap-4 text-center"
          >
            <div className="text-[#1a1a1a] text-5xl select-none">▶</div>
            <p className="text-[#444] text-xs tracking-widest uppercase leading-relaxed">
              Pregunta a Roberto sobre<br />tus leads aceptados
            </p>
            {likedLeads.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 max-w-[260px]">
                {likedLeads.map((l) => (
                  <span
                    key={l.id}
                    className="text-[9px] border border-[#1a1a1a] text-[#444] px-2 py-0.5 rounded-sm"
                  >
                    {l.nombre}
                  </span>
                ))}
              </div>
            )}
            {likedLeads.length === 0 && (
              <p className="text-[#333] text-[11px]">
                Acepta leads primero desde Explorar
              </p>
            )}
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user'
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="flex items-start gap-2 max-w-[88%]">
                    <div className="w-5 h-5 rounded-sm border border-[#222] flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-[8px] text-[#00ff66] font-bold">R</span>
                    </div>
                    <div>
                      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg px-3 py-2">
                        <p className="text-[13px] text-[#ccc] leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {isUser && (
                  <div className="max-w-[80%] bg-[#0d0d0d] border border-[#00ff6622] rounded-lg px-3 py-2">
                    <p className="text-[13px] text-white leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-2"
          >
            <div className="w-5 h-5 rounded-sm border border-[#222] flex items-center justify-center shrink-0">
              <span className="text-[8px] text-[#00ff66] font-bold">R</span>
            </div>
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg px-3 py-2">
              <span className="text-[#00ff66] text-sm cursor-blink" />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-[#111] bg-background px-3 py-3">
        <div className="flex items-end gap-2 bg-[#0d0d0d] border border-[#222] rounded-lg px-3 py-2 focus-within:border-[#00ff6633] transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta a Roberto..."
            rows={1}
            className="flex-1 bg-transparent text-[13px] text-white placeholder-[#444] resize-none outline-none leading-relaxed min-h-[24px] max-h-[120px]"
            style={{ fontFamily: 'inherit' }}
          />
          <button
            onClick={isLoading ? stopGeneration : handleSend}
            disabled={!isLoading && !input.trim()}
            className="w-9 h-9 flex items-center justify-center rounded shrink-0 transition-all active:scale-95 disabled:opacity-20"
            style={{
              background: isLoading ? '#ff333318' : '#00ff6612',
              border: `1px solid ${isLoading ? '#ff333333' : '#00ff6633'}`,
            }}
            aria-label={isLoading ? 'Detener generación' : 'Enviar mensaje'}
          >
            {isLoading ? (
              <Square size={12} className="text-[#ff3333]" />
            ) : (
              <Send size={12} className="text-[#00ff66]" />
            )}
          </button>
        </div>
        <p className="text-[9px] text-[#2a2a2a] text-center mt-2 tracking-widest">
          ROBERTO · LOCAL · OLLAMA
        </p>
      </div>
    </div>
  )
}

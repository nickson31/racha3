'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Square, Trash2, Bot } from 'lucide-react'
import { useOllama } from '@/hooks/use-ollama'
import type { Lead } from '@/lib/leads-data'

interface ChatInterfaceProps {
  likedLeads: Lead[]
}

export function ChatInterface({ likedLeads }: ChatInterfaceProps) {
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
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Bot size={22} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-extrabold text-foreground leading-tight">
            Asistente IA
          </h1>
          <p className="text-xs text-muted-foreground">
            {likedLeads.length} lead{likedLeads.length !== 1 ? 's' : ''} en contexto
          </p>
        </div>
        <button
          onClick={clearMessages}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary border border-border active:bg-muted transition-colors"
          aria-label="Limpiar conversacion"
        >
          <Trash2 size={15} className="text-muted-foreground" />
        </button>
      </div>

      <div className="mx-5 border-t border-border" />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full gap-4 text-center pb-8"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot size={28} className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">Hola, soy tu asistente</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Preguntame sobre tus leads aceptados,<br />
                estrategias de venta o como contactarlos.
              </p>
            </div>
            {likedLeads.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 max-w-[280px]">
                {likedLeads.map((l) => (
                  <span
                    key={l.id}
                    className="text-[10px] font-semibold border border-border px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {l.nombre}
                  </span>
                ))}
              </div>
            )}
            {likedLeads.length === 0 && (
              <p className="text-xs text-muted-foreground bg-secondary rounded-xl px-4 py-2.5">
                Acepta leads en Explorar para usarlos de contexto
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
                transition={{ duration: 0.18 }}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-0.5">
                    <Bot size={14} className="text-primary" />
                  </div>
                )}
                <div
                  className="max-w-[82%] px-4 py-2.5 rounded-2xl"
                  style={
                    isUser
                      ? { background: 'var(--primary)', borderBottomRightRadius: '6px' }
                      : { background: '#ffffff', border: '1px solid var(--border)', borderBottomLeftRadius: '6px' }
                  }
                >
                  <p
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{ color: isUser ? '#fff' : 'var(--foreground)' }}
                  >
                    {msg.content}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-end gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 bg-background border-t border-border px-4 py-3">
        <div className="flex items-end gap-2 bg-secondary rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground resize-none outline-none leading-relaxed min-h-[22px] max-h-[120px]"
          />
          <button
            onClick={isLoading ? stopGeneration : handleSend}
            disabled={!isLoading && !input.trim()}
            className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 transition-all active:scale-90 disabled:opacity-40"
            style={{
              background: isLoading ? '#fde8ea' : 'var(--primary)',
            }}
            aria-label={isLoading ? 'Detener' : 'Enviar'}
          >
            {isLoading ? (
              <Square size={12} className="text-[var(--nope-color)]" fill="var(--nope-color)" />
            ) : (
              <Send size={14} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

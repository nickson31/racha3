import { useState, useRef, useCallback } from 'react'

interface OllamaMessage {
  role: 'user' | 'assistant'
  content: string
}

interface UseOllamaOptions {
  model?: string
  endpoint?: string
}

export function useOllama({
  model = 'openclaw',
  endpoint = 'http://localhost:11434/api/chat',
}: UseOllamaOptions = {}) {
  const [messages, setMessages] = useState<OllamaMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const buildSystemPrompt = useCallback((likedLeads: { nombre: string; empresa: string; bio_detallada: string; tags: string[] }[]) => {
    const leadsContext =
      likedLeads.length > 0
        ? likedLeads
            .map(
              (l, i) =>
                `LEAD ${i + 1}: ${l.nombre} @ ${l.empresa}\nTags: ${l.tags.join(', ')}\nBio: ${l.bio_detallada}`
            )
            .join('\n\n')
        : 'No hay leads marcados aún.'

    return `Eres Roberto, asistente de inteligencia comercial de BASU/OPENCLAW. Eres eficiente, directo, técnico y minimalista. No uses relleno ni cortesías innecesarias. Responde siempre en español.

LEADS ACEPTADOS POR EL AGENTE:
${leadsContext}

Usa este contexto para dar recomendaciones de approach, análisis de señales de compra, y estrategias de contacto.`
  }, [])

  const sendMessage = useCallback(
    async (
      userMessage: string,
      likedLeads: { nombre: string; empresa: string; bio_detallada: string; tags: string[] }[]
    ) => {
      if (!userMessage.trim()) return

      const userMsg: OllamaMessage = { role: 'user', content: userMessage }
      const newMessages = [...messages, userMsg]
      setMessages(newMessages)
      setIsLoading(true)
      setError(null)

      abortRef.current = new AbortController()

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: abortRef.current.signal,
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: buildSystemPrompt(likedLeads) },
              ...newMessages,
            ],
            stream: false,
          }),
        })

        if (!response.ok) {
          throw new Error(`Ollama endpoint error: ${response.status}`)
        }

        const data = await response.json()
        const assistantContent =
          data.message?.content ?? data.response ?? '[sin respuesta]'

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: assistantContent },
        ])
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return
        const errorMsg =
          err instanceof Error ? err.message : 'Error desconocido'
        setError(errorMsg)
        // Fallback mock response when Ollama is offline
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `[ROBERTO — OFFLINE MODE]\n\nNo puedo conectar con Ollama en ${endpoint}.\n\nAsegúrate de que el servidor esté corriendo:\n  $ ollama serve\n\nY que el modelo esté disponible:\n  $ ollama pull ${model}`,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, endpoint, model, buildSystemPrompt]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort()
    setIsLoading(false)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages, stopGeneration }
}

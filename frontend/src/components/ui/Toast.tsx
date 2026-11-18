import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ToastContext, type ToastVariant } from './useToast'

/* ── Variant config ─────────────────────────────────────────────── */
interface VariantConfig {
  bg: string
  borderColor: string
  icon: ReactNode
}

const VARIANTS: Record<ToastVariant, VariantConfig> = {
  success: {
    bg: '#1a4f4b',
    borderColor: '#2f6b62',
    icon: (
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  error: {
    bg: '#8b2020',
    borderColor: '#c0392b',
    icon: (
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 6-12 12M6 6l12 12" />
      </svg>
    ),
  },
  warning: {
    bg: '#78350f',
    borderColor: '#b45309',
    icon: (
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      </svg>
    ),
  },
  info: {
    bg: '#1e3a5f',
    borderColor: '#2563eb',
    icon: (
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4m0-4h.01" />
      </svg>
    ),
  },
}

/* ── Provider ───────────────────────────────────────────────────── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg]           = useState('')
  const [variant, setVariant]   = useState<ToastVariant>('success')
  const [visible, setVisible]   = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((text: string, v: ToastVariant = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMsg(text)
    setVariant(v)
    setVisible(true)
    timerRef.current = setTimeout(() => setVisible(false), 4000)
  }, [])

  const cfg = VARIANTS[variant]

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        role="status"
        aria-live="polite"
        className={[
          'pointer-events-none fixed bottom-5 right-5 z-[70]',
          'flex items-center gap-2.5',
          'rounded-xl px-4 py-3 text-xs font-semibold text-white shadow-soft',
          'border-l-[3px]',
          'transition-all duration-300',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        ].join(' ')}
        style={{
          backgroundColor: cfg.bg,
          borderLeftColor: cfg.borderColor,
          maxWidth: '360px',
        }}
      >
        {cfg.icon}
        <span className="leading-5">{msg}</span>
      </div>
    </ToastContext.Provider>
  )
}

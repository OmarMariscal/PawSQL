import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ToastContext } from './useToast'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMsg(text)
    setVisible(true)
    timerRef.current = setTimeout(() => setVisible(false), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={[
          'pointer-events-none fixed bottom-5 right-5 z-[70] rounded-xl',
          'bg-pine-950 px-4 py-3 text-xs font-semibold text-white shadow-soft',
          'transition-all duration-300',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        ].join(' ')}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  )
}

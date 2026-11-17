import type { ReactNode, MouseEvent } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null

  function handleBackdrop(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-pine-950/45 p-4 backdrop-blur-[3px]"
      onClick={handleBackdrop}
    >
      {children}
    </div>
  )
}


import { Modal } from './Modal'

interface DeleteModalProps {
  open:      boolean
  message:   string
  onCancel:  () => void
  onConfirm: () => void
  loading?:  boolean
}

export function DeleteModal({ open, message, onCancel, onConfirm, loading }: DeleteModalProps) {
  return (
    <Modal open={open} onClose={onCancel}>
      <div className="modal-card w-full max-w-[390px] rounded-[22px] bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-coral-100 text-coral-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-[Manrope] text-lg font-extrabold text-pine-950">¿Eliminar registro?</h3>
        <p className="mx-auto mt-2 max-w-[280px] text-xs leading-5 text-slate-500">{message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="h-10 rounded-xl border border-sage-200 px-5 text-xs font-bold text-slate-500 hover:bg-sage-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-10 rounded-xl bg-[#c66f55] px-5 text-xs font-bold text-white transition hover:bg-[#b85e45] disabled:opacity-50"
          >
            {loading ? 'Eliminando…' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </Modal>
  )
}


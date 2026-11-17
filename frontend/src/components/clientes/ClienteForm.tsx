import { useEffect } from 'react'
import { useForm }   from 'react-hook-form'
import type { Cliente, ClienteInput } from '../../types'
import { Modal }     from '../ui/Modal'

const INPUT_CLS =
  'mt-1.5 h-10 w-full rounded-xl border border-sage-200 bg-sage-50/50 px-3.5 text-xs text-pine-900 placeholder:text-slate-300 transition'
const LABEL_CLS = 'text-[10px] font-bold text-pine-900'

interface ClienteFormProps {
  open:      boolean
  editing:   Cliente | null
  onClose:   () => void
  onSubmit:  (data: ClienteInput) => void
  submitting: boolean
}

export function ClienteForm({ open, editing, onClose, onSubmit, submitting }: ClienteFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClienteInput>()

  useEffect(() => {
    if (open) {
      reset(
        editing
          ? { nombre: editing.nombre, telefono: editing.telefono ?? '', email: editing.email ?? '' }
          : { nombre: '', telefono: '', email: '' },
      )
    }
  }, [open, editing, reset])

  const isNew = editing === null

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-card max-h-[92vh] w-full max-w-[590px] overflow-hidden rounded-[22px] bg-white shadow-2xl" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-sage-100 px-6 py-5 sm:px-7">
          <div>
            <div className="mb-1 text-[9px] font-bold uppercase tracking-[.2em] text-pine-600">Ficha de información</div>
            <h3 className="font-[Manrope] text-xl font-extrabold text-pine-950">
              {isNew ? 'Nuevo cliente' : 'Editar cliente'}
            </h3>
            <p className="mt-1 text-[11px] text-slate-400">
              {isNew ? 'Completa los datos para agregar un registro.' : 'Modifica la información de este registro.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-sage-100 hover:text-pine-900"
            aria-label="Cerrar"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="soft-scroll max-h-[calc(92vh-140px)] overflow-y-auto px-6 py-6 sm:px-7"
        >
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {/* Nombre */}
            <div className="sm:col-span-2">
              <label className={LABEL_CLS}>
                Nombre completo <span className="text-coral-500">*</span>
              </label>
              <input
                {...register('nombre', { required: true })}
                type="text"
                placeholder="Ej. Ana Laura Pérez"
                className={INPUT_CLS}
                aria-invalid={!!errors.nombre}
              />
            </div>
            {/* Teléfono */}
            <div>
              <label className={LABEL_CLS}>Teléfono</label>
              <input
                {...register('telefono')}
                type="text"
                placeholder="33-1234-5678"
                maxLength={15}
                className={INPUT_CLS}
              />
            </div>
            {/* Email */}
            <div>
              <label className={LABEL_CLS}>Correo electrónico</label>
              <input
                {...register('email')}
                type="email"
                placeholder="correo@ejemplo.com"
                className={INPUT_CLS}
              />
            </div>
          </div>

          <div className="mt-7 flex flex-col-reverse gap-2 border-t border-sage-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-10 rounded-xl border border-sage-200 px-5 text-xs font-bold text-slate-500 transition hover:bg-sage-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-10 rounded-xl bg-pine-800 px-6 text-xs font-bold text-white shadow-sm transition hover:bg-pine-700 disabled:opacity-50"
            >
              {submitting ? 'Guardando…' : 'Guardar registro'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}


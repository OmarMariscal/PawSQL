import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Veterinario, VeterinarioInput } from '../../types'
import { Modal }           from '../ui/Modal'
import { FormErrorBanner } from '../ui/FormErrorBanner'

const INPUT_CLS =
  'mt-1.5 h-10 w-full rounded-xl border border-sage-200 bg-sage-50/50 px-3.5 text-xs text-pine-900 placeholder:text-slate-300 transition'
const LABEL_CLS = 'text-[10px] font-bold text-pine-900'

interface VeterinarioFormProps {
  open:         boolean
  editing:      Veterinario | null
  onClose:      () => void
  onSubmit:     (data: VeterinarioInput) => void
  submitting:   boolean
  formError:    string | null
  onClearError: () => void
}

export function VeterinarioForm({ open, editing, onClose, onSubmit, submitting, formError, onClearError }: VeterinarioFormProps) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<VeterinarioInput>()

  useEffect(() => {
    if (open) {
      reset(
        editing
          ? {
              nombre:             editing.nombre,
              especialidad:       editing.especialidad,
              cedula_profesional: editing.cedula_profesional,
            }
          : { nombre: '', especialidad: '', cedula_profesional: '' },
      )
      onClearError()
    }
  }, [open, editing, reset]) // eslint-disable-line react-hooks/exhaustive-deps

  // Clear API error when the user edits any field
  useEffect(() => {
    const sub = watch(() => { if (formError) onClearError() })
    return () => sub.unsubscribe()
  }, [watch, formError, onClearError])

  const isNew = editing === null

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-card max-h-[92vh] w-full max-w-[590px] overflow-hidden rounded-[22px] bg-white shadow-2xl" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-sage-100 px-6 py-5 sm:px-7">
          <div>
            <div className="mb-1 text-[9px] font-bold uppercase tracking-[.2em] text-pine-600">Ficha de información</div>
            <h3 className="font-[Manrope] text-xl font-extrabold text-pine-950">
              {isNew ? 'Nuevo veterinario' : 'Editar veterinario'}
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
                placeholder="Ej. Dra. Sofía Herrera"
                className={INPUT_CLS}
                aria-invalid={!!errors.nombre}
              />
            </div>

            {/* Especialidad */}
            <div>
              <label className={LABEL_CLS}>
                Especialidad <span className="text-coral-500">*</span>
              </label>
              <input
                {...register('especialidad', { required: true })}
                type="text"
                placeholder="Ej. Medicina general"
                className={INPUT_CLS}
                aria-invalid={!!errors.especialidad}
              />
            </div>

            {/* Cédula profesional */}
            <div>
              <label className={LABEL_CLS}>
                Cédula profesional <span className="text-coral-500">*</span>
              </label>
              <input
                {...register('cedula_profesional', { required: true })}
                type="text"
                placeholder="Ej. VET-28451"
                className={INPUT_CLS}
                aria-invalid={!!errors.cedula_profesional}
              />
            </div>
          </div>

          {/* API Error Banner */}
          <div className="mt-5">
            <FormErrorBanner error={formError} onDismiss={onClearError} />
          </div>

          <div className="mt-2 flex flex-col-reverse gap-2 border-t border-sage-100 pt-5 sm:flex-row sm:justify-end">
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

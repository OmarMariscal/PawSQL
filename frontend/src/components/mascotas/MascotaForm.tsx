import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Mascota, MascotaInput, Cliente } from '../../types'
import { Modal }           from '../ui/Modal'
import { FormErrorBanner } from '../ui/FormErrorBanner'

const INPUT_CLS =
  'mt-1.5 h-10 w-full rounded-xl border border-sage-200 bg-sage-50/50 px-3.5 text-xs text-pine-900 placeholder:text-slate-300 transition'
const LABEL_CLS = 'text-[10px] font-bold text-pine-900'

const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Otro'] as const

interface FormValues {
  id_cliente:       string
  nombre:           string
  especie:          'Perro' | 'Gato' | 'Ave' | 'Conejo' | 'Otro'
  raza:             string
  fecha_nacimiento: string
}

interface MascotaFormProps {
  open:         boolean
  editing:      Mascota | null
  clientes:     Cliente[]
  onClose:      () => void
  onSubmit:     (data: MascotaInput) => void
  submitting:   boolean
  formError:    string | null
  onClearError: () => void
}

export function MascotaForm({
  open,
  editing,
  clientes,
  onClose,
  onSubmit,
  submitting,
  formError,
  onClearError,
}: MascotaFormProps) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>()

  useEffect(() => {
    if (open) {
      reset(
        editing
          ? {
              id_cliente:       String(editing.id_cliente),
              nombre:           editing.nombre,
              especie:          editing.especie,
              raza:             editing.raza ?? '',
              fecha_nacimiento: editing.fecha_nacimiento ? editing.fecha_nacimiento.slice(0, 10) : '',
            }
          : {
              id_cliente:       clientes[0] ? String(clientes[0].id_cliente) : '',
              nombre:           '',
              especie:          'Perro',
              raza:             '',
              fecha_nacimiento: '',
            },
      )
      onClearError()
    }
  }, [open, editing, clientes, reset]) // eslint-disable-line react-hooks/exhaustive-deps

  // Clear API error when the user edits any field
  useEffect(() => {
    const sub = watch(() => { if (formError) onClearError() })
    return () => sub.unsubscribe()
  }, [watch, formError, onClearError])

  const isNew = editing === null

  function onFormSubmit(values: FormValues) {
    const payload: MascotaInput = {
      id_cliente:       Number(values.id_cliente),
      nombre:           values.nombre.trim(),
      especie:          values.especie,
      raza:             values.raza.trim() || undefined,
      fecha_nacimiento: values.fecha_nacimiento ? values.fecha_nacimiento.slice(0, 10) : undefined,
    }
    onSubmit(payload)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-card max-h-[92vh] w-full max-w-[590px] overflow-hidden rounded-[22px] bg-white shadow-2xl" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-sage-100 px-6 py-5 sm:px-7">
          <div>
            <div className="mb-1 text-[9px] font-bold uppercase tracking-[.2em] text-pine-600">Ficha de información</div>
            <h3 className="font-[Manrope] text-xl font-extrabold text-pine-950">
              {isNew ? 'Nueva mascota' : 'Editar mascota'}
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
          onSubmit={handleSubmit(onFormSubmit)}
          className="soft-scroll max-h-[calc(92vh-140px)] overflow-y-auto px-6 py-6 sm:px-7"
        >
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {/* Propietario (Cliente) */}
            <div className="sm:col-span-2">
              <label className={LABEL_CLS}>
                Propietario <span className="text-coral-500">*</span>
              </label>
              <select
                {...register('id_cliente', { required: true })}
                className={INPUT_CLS}
                aria-invalid={!!errors.id_cliente}
              >
                <option value="">Seleccionar...</option>
                {clientes.map((c) => (
                  <option key={c.id_cliente} value={c.id_cliente}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre */}
            <div>
              <label className={LABEL_CLS}>
                Nombre de la mascota <span className="text-coral-500">*</span>
              </label>
              <input
                {...register('nombre', { required: true })}
                type="text"
                placeholder="Ej. Luna"
                className={INPUT_CLS}
                aria-invalid={!!errors.nombre}
              />
            </div>

            {/* Especie */}
            <div>
              <label className={LABEL_CLS}>
                Especie <span className="text-coral-500">*</span>
              </label>
              <select
                {...register('especie', { required: true })}
                className={INPUT_CLS}
                aria-invalid={!!errors.especie}
              >
                {ESPECIES.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>

            {/* Raza */}
            <div>
              <label className={LABEL_CLS}>Raza</label>
              <input
                {...register('raza')}
                type="text"
                placeholder="Ej. Golden retriever"
                className={INPUT_CLS}
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className={LABEL_CLS}>Fecha de nacimiento</label>
              <input
                {...register('fecha_nacimiento')}
                type="date"
                className={INPUT_CLS}
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

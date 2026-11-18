import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type {
  Consulta,
  ConsultaInput,
  ConsultaTratamientoInput,
  Mascota,
  Veterinario,
  Tratamiento,
} from '../../types'
import { formatMoney }     from '../../utils/formatMoney'
import { Modal }           from '../ui/Modal'
import { FormErrorBanner } from '../ui/FormErrorBanner'

const INPUT_CLS =
  'mt-1.5 h-10 w-full rounded-xl border border-sage-200 bg-sage-50/50 px-3.5 text-xs text-pine-900 placeholder:text-slate-300 transition'
const LABEL_CLS = 'text-[10px] font-bold text-pine-900'

interface FormValues {
  id_mascota:     string
  id_veterinario: string
  fecha_consulta: string
  peso_kg:        string
  motivo:         string
}

interface TratamientoItemState {
  selected:           boolean
  dosis_o_indicacion: string
}

interface ConsultaFormProps {
  open:         boolean
  editing:      Consulta | null
  mascotas:     Mascota[]
  veterinarios: Veterinario[]
  tratamientos: Tratamiento[]
  onClose:      () => void
  onSubmit:     (data: ConsultaInput) => void
  submitting:   boolean
  formError:    string | null
  onClearError: () => void
}

function ConsultaFormModal({
  editing,
  mascotas,
  veterinarios,
  tratamientos,
  onClose,
  onSubmit,
  submitting,
  formError,
  onClearError,
}: Omit<ConsultaFormProps, 'open'>) {
  const isNew = editing === null

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: editing
      ? {
          id_mascota:     String(editing.id_mascota),
          id_veterinario: String(editing.id_veterinario),
          fecha_consulta: editing.fecha_consulta.slice(0, 10),
          peso_kg:        editing.peso_kg != null ? String(editing.peso_kg) : '',
          motivo:         editing.motivo,
        }
      : {
          id_mascota:     mascotas[0] ? String(mascotas[0].id_mascota) : '',
          id_veterinario: veterinarios[0] ? String(veterinarios[0].id_veterinario) : '',
          fecha_consulta: new Date().toISOString().slice(0, 10),
          peso_kg:        '',
          motivo:         '',
        },
  })

  const [tratState, setTratState] = useState<Record<number, TratamientoItemState>>(() => {
    const initialMap: Record<number, TratamientoItemState> = {}
    tratamientos.forEach((t) => {
      const existing = editing?.tratamientos?.find((x) => x.id_tratamiento === t.id_tratamiento)
      initialMap[t.id_tratamiento] = {
        selected:           !!existing,
        dosis_o_indicacion: existing?.dosis_o_indicacion ?? '',
      }
    })
    return initialMap
  })

  // Clear API error when the user edits any field
  useEffect(() => {
    const sub = watch(() => { if (formError) onClearError() })
    return () => sub.unsubscribe()
  }, [watch, formError, onClearError])

  function toggleTrat(id: number, checked: boolean) {
    setTratState((prev) => ({
      ...prev,
      [id]: {
        selected:           checked,
        dosis_o_indicacion: prev[id]?.dosis_o_indicacion ?? '',
      },
    }))
    if (formError) onClearError()
  }

  function setDosis(id: number, val: string) {
    setTratState((prev) => ({
      ...prev,
      [id]: {
        selected:           prev[id]?.selected ?? false,
        dosis_o_indicacion: val,
      },
    }))
  }

  function onFormSubmit(values: FormValues) {
    const assignedTratamientos: ConsultaTratamientoInput[] = []
    Object.entries(tratState).forEach(([idStr, state]) => {
      if (state.selected) {
        assignedTratamientos.push({
          id_tratamiento:     Number(idStr),
          dosis_o_indicacion: state.dosis_o_indicacion.trim() || undefined,
        })
      }
    })

    const payload: ConsultaInput = {
      id_mascota:     Number(values.id_mascota),
      id_veterinario: Number(values.id_veterinario),
      fecha_consulta: values.fecha_consulta.slice(0, 10),
      motivo:         values.motivo.trim(),
      peso_kg:        values.peso_kg !== '' ? parseFloat(values.peso_kg) : undefined,
      tratamientos:   assignedTratamientos,
    }
    onSubmit(payload)
  }

  return (
    <div className="modal-card max-h-[92vh] w-full max-w-[590px] overflow-hidden rounded-[22px] bg-white shadow-2xl" role="dialog" aria-modal="true">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-sage-100 px-6 py-5 sm:px-7">
        <div>
          <div className="mb-1 text-[9px] font-bold uppercase tracking-[.2em] text-pine-600">Ficha de información</div>
          <h3 className="font-[Manrope] text-xl font-extrabold text-pine-950">
            {isNew ? 'Nueva consulta' : 'Editar consulta'}
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
          {/* Mascota */}
          <div>
            <label className={LABEL_CLS}>
              Mascota <span className="text-coral-500">*</span>
            </label>
            <select
              {...register('id_mascota', { required: true })}
              className={INPUT_CLS}
              aria-invalid={!!errors.id_mascota}
            >
              <option value="">Seleccionar...</option>
              {mascotas.map((m) => (
                <option key={m.id_mascota} value={m.id_mascota}>
                  {m.nombre} ({m.cliente_nombre || 'Sin dueño'})
                </option>
              ))}
            </select>
          </div>

          {/* Veterinario */}
          <div>
            <label className={LABEL_CLS}>
              Veterinario <span className="text-coral-500">*</span>
            </label>
            <select
              {...register('id_veterinario', { required: true })}
              className={INPUT_CLS}
              aria-invalid={!!errors.id_veterinario}
            >
              <option value="">Seleccionar...</option>
              {veterinarios.map((v) => (
                <option key={v.id_veterinario} value={v.id_veterinario}>
                  {v.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className={LABEL_CLS}>
              Fecha de consulta <span className="text-coral-500">*</span>
            </label>
            <input
              {...register('fecha_consulta', { required: true })}
              type="date"
              className={INPUT_CLS}
              aria-invalid={!!errors.fecha_consulta}
            />
          </div>

          {/* Peso */}
          <div>
            <label className={LABEL_CLS}>Peso (kg)</label>
            <input
              {...register('peso_kg')}
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Ej. 18.40"
              className={INPUT_CLS}
            />
          </div>

          {/* Motivo */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>
              Motivo de consulta <span className="text-coral-500">*</span>
            </label>
            <textarea
              {...register('motivo', { required: true })}
              rows={3}
              placeholder="Describe brevemente el motivo..."
              className="mt-1.5 w-full rounded-xl border border-sage-200 bg-sage-50/50 px-3.5 py-3 text-xs text-pine-900 placeholder:text-slate-300 transition"
              aria-invalid={!!errors.motivo}
            />
          </div>
        </div>

        {/* Relación Tratamientos */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-[11px] font-bold text-pine-900">Tratamientos de la consulta</label>
            <span className="text-[10px] text-slate-400">Relación consulta–tratamiento</span>
          </div>
          {tratamientos.length === 0 ? (
            <p className="rounded-xl bg-sage-50 p-4 text-[11px] text-slate-400">
              Primero registra tratamientos en el catálogo.
            </p>
          ) : (
            <div className="space-y-2">
              {tratamientos.map((t) => {
                const state = tratState[t.id_tratamiento] ?? { selected: false, dosis_o_indicacion: '' }
                return (
                  <div key={t.id_tratamiento} className="rounded-xl border border-sage-200 bg-sage-50/50 p-3">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={state.selected}
                        onChange={(e) => toggleTrat(t.id_tratamiento, e.target.checked)}
                        className="h-4 w-4 rounded border-sage-300 accent-[#2f6b62]"
                      />
                      <span className="flex-1">
                        <span className="block text-[11px] font-bold text-pine-900">{t.nombre}</span>
                        <span className="text-[10px] text-slate-400">{formatMoney(t.costo)}</span>
                      </span>
                      <span className="text-[9px] text-pine-600">Asignar</span>
                    </label>
                    {state.selected && (
                      <input
                        type="text"
                        value={state.dosis_o_indicacion}
                        onChange={(e) => setDosis(t.id_tratamiento, e.target.value)}
                        placeholder="Dosis o indicación (opcional)"
                        className="mt-2 h-9 w-full rounded-lg border border-sage-200 bg-white px-3 text-[10px] text-pine-900 placeholder:text-slate-300"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}
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
  )
}

export function ConsultaForm(props: ConsultaFormProps) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      {props.open && <ConsultaFormModal {...props} />}
    </Modal>
  )
}

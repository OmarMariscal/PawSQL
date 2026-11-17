import type { Tratamiento } from '../../types'
import { formatMoney }   from '../../utils/formatMoney'
import { TableEmpty }   from '../ui/TableEmpty'

const TH = 'whitespace-nowrap px-5 py-3.5 text-[9px] font-bold uppercase tracking-[.12em] text-slate-400 sm:px-6'
const TD = 'whitespace-nowrap px-5 py-[15px] text-[11px] sm:px-6'

const SVG_EDIT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <path d="m14 5 5 5M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const SVG_DELETE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <path d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

interface TratamientosTableProps {
  rows:     Tratamiento[]
  onEdit:   (t: Tratamiento) => void
  onDelete: (t: Tratamiento) => void
}

export function TratamientosTable({ rows, onEdit, onDelete }: TratamientosTableProps) {
  return (
    <>
      <thead className="bg-[#f8faf8]">
        <tr>
          {['ID', 'Tratamiento', 'Descripción', 'Costo'].map((h) => (
            <th key={h} className={TH}>{h}</th>
          ))}
          <th className={`${TH} text-right`}>Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-sage-100">
        {rows.length === 0 ? (
          <TableEmpty colspan={5} />
        ) : (
          rows.map((t) => (
            <tr key={t.id_tratamiento} className="table-row">
              <td className={TD}>
                <span className="font-mono text-[10px] text-slate-400">
                  #{String(t.id_tratamiento).padStart(3, '0')}
                </span>
              </td>
              <td className={TD}>
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-coral-100 text-coral-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="m4.7 16.5 7.8-7.8a4 4 0 0 1 5.7 5.7l-7.8 7.8a4 4 0 0 1-5.7-5.7Z" />
                      <path d="m8 13.2 5.7 5.7" />
                    </svg>
                  </span>
                  <span className="font-bold text-pine-950">{t.nombre}</span>
                </div>
              </td>
              <td className={TD}>
                <span className="max-w-[280px] truncate block text-slate-600" title={t.descripcion || ''}>
                  {t.descripcion || '—'}
                </span>
              </td>
              <td className={TD}>
                <span className="font-bold text-pine-900">{formatMoney(t.costo)}</span>
              </td>
              <td className={`${TD} text-right`}>
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEdit(t)}
                    className="icon-btn grid h-8 w-8 place-items-center rounded-lg text-slate-400"
                    title="Editar"
                    aria-label="Editar"
                  >
                    {SVG_EDIT}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(t)}
                    className="icon-btn grid h-8 w-8 place-items-center rounded-lg text-[#c77e68]"
                    title="Eliminar"
                    aria-label="Eliminar"
                  >
                    {SVG_DELETE}
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  )
}


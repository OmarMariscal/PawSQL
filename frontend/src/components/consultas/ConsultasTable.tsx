import type { Consulta } from '../../types'
import { formatDate }   from '../../utils/formatDate'
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

interface ConsultasTableProps {
  rows:     Consulta[]
  onEdit:   (c: Consulta) => void
  onDelete: (c: Consulta) => void
}

export function ConsultasTable({ rows, onEdit, onDelete }: ConsultasTableProps) {
  return (
    <>
      <thead className="bg-[#f8faf8]">
        <tr>
          {['ID', 'Fecha', 'Mascota', 'Veterinario', 'Motivo', 'Peso', 'Tratamientos'].map((h) => (
            <th key={h} className={TH}>{h}</th>
          ))}
          <th className={`${TH} text-right`}>Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-sage-100">
        {rows.length === 0 ? (
          <TableEmpty colspan={8} />
        ) : (
          rows.map((c) => {
            const trats = c.tratamientos ?? []
            return (
              <tr key={c.id_consulta} className="table-row">
                <td className={TD}>
                  <span className="font-mono text-[10px] text-slate-400">
                    #{String(c.id_consulta).padStart(3, '0')}
                  </span>
                </td>
                <td className={TD}>
                  <span className="text-slate-500">{formatDate(c.fecha_consulta)}</span>
                </td>
                <td className={TD}>
                  <div>
                    <div className="font-bold text-pine-950">{c.mascota_nombre || '—'}</div>
                    <div className="mt-0.5 text-[10px] text-slate-400">{c.cliente_nombre || 'Sin propietario'}</div>
                  </div>
                </td>
                <td className={TD}>
                  <span className="font-medium text-pine-800">{c.veterinario_nombre || '—'}</span>
                </td>
                <td className={TD}>
                  <span className="max-w-[200px] truncate block text-slate-600" title={c.motivo}>
                    {c.motivo}
                  </span>
                </td>
                <td className={TD}>
                  <span className="font-semibold text-pine-800">
                    {c.peso_kg != null ? `${Number(c.peso_kg).toFixed(2)} kg` : '—'}
                  </span>
                </td>
                <td className={TD}>
                  {trats.length > 0 ? (
                    <div className="flex max-w-[230px] flex-wrap gap-1">
                      {trats.map((t, i) => (
                        <span
                          key={`${t.id_tratamiento}-${i}`}
                          className="rounded-md bg-sage-100 px-2 py-1 text-[9px] font-semibold text-pine-700"
                        >
                          {t.nombre_tratamiento || `Tratamiento #${t.id_tratamiento}`}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-300">Sin asignar</span>
                  )}
                </td>
                <td className={`${TD} text-right`}>
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(c)}
                      className="icon-btn grid h-8 w-8 place-items-center rounded-lg text-slate-400"
                      title="Editar"
                      aria-label="Editar"
                    >
                      {SVG_EDIT}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(c)}
                      className="icon-btn grid h-8 w-8 place-items-center rounded-lg text-[#c77e68]"
                      title="Eliminar"
                      aria-label="Eliminar"
                    >
                      {SVG_DELETE}
                    </button>
                  </div>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </>
  )
}


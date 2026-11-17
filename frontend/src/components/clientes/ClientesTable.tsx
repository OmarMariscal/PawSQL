import type { Cliente } from '../../types'
import { formatDate }   from '../../utils/formatDate'
import { initials }     from '../../utils/initials'
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

interface ClientesTableProps {
  rows:     Cliente[]
  onEdit:   (c: Cliente) => void
  onDelete: (c: Cliente) => void
}

export function ClientesTable({ rows, onEdit, onDelete }: ClientesTableProps) {
  return (
    <>
      <thead className="bg-[#f8faf8]">
        <tr>
          {['ID', 'Nombre', 'Teléfono', 'Correo electrónico', 'Fecha de registro'].map((h) => (
            <th key={h} className={TH}>{h}</th>
          ))}
          <th className={`${TH} text-right`}>Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-sage-100">
        {rows.length === 0 ? (
          <TableEmpty colspan={6} />
        ) : (
          rows.map((c) => (
            <tr key={c.id_cliente} className="table-row">
              <td className={TD}>
                <span className="font-mono text-[10px] text-slate-400">
                  #{String(c.id_cliente).padStart(3, '0')}
                </span>
              </td>
              <td className={TD}>
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-100 text-[10px] font-extrabold text-pine-700">
                    {initials(c.nombre)}
                  </div>
                  <span className="font-bold text-pine-950">{c.nombre}</span>
                </div>
              </td>
              <td className={TD}>
                <span className="text-slate-600">{c.telefono || '—'}</span>
              </td>
              <td className={TD}>
                <span className="text-pine-700">{c.email || '—'}</span>
              </td>
              <td className={TD}>
                <span className="text-slate-500">{formatDate(c.fecha_registro)}</span>
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
          ))
        )}
      </tbody>
    </>
  )
}


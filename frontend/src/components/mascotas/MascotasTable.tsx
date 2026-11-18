import type { Mascota } from '../../types'
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

const SPECIES_STYLES: Record<string, string> = {
  Perro:  'bg-coral-100 text-[#b87555]',
  Gato:   'bg-sage-100 text-pine-700',
  Ave:    'bg-amber-50 text-amber-700',
  Conejo: 'bg-sage-100 text-pine-700',
  Otro:   'bg-sage-100 text-pine-700',
}

interface MascotasTableProps {
  rows:     Mascota[]
  onEdit:   (m: Mascota) => void
  onDelete: (m: Mascota) => void
}

export function MascotasTable({ rows, onEdit, onDelete }: MascotasTableProps) {
  return (
    <>
      <thead className="bg-[#f8faf8]">
        <tr>
          {['ID', 'Mascota', 'Propietario', 'Especie', 'Raza', 'Nacimiento'].map((h) => (
            <th key={h} className={TH}>{h}</th>
          ))}
          <th className={`${TH} text-right`}>Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-sage-100">
        {rows.length === 0 ? (
          <TableEmpty colspan={7} />
        ) : (
          rows.map((m) => {
            const style = SPECIES_STYLES[m.especie] ?? 'bg-sage-100 text-pine-700'
            return (
              <tr key={m.id_mascota} className="table-row">
                <td className={TD}>
                  <span className="font-mono text-[10px] text-slate-400">
                    #{String(m.id_mascota).padStart(3, '0')}
                  </span>
                </td>
                <td className={TD}>
                  <div className="flex items-center gap-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-xl ${style}`}>
                      <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M12 20.5c-3.8 0-7-2.2-7-5.2 0-2.2 1.8-3.8 4-3.8 1.3 0 2.2.5 3 1.3.8-.8 1.7-1.3 3-1.3 2.2 0 4 1.6 4 3.8 0 3-3.2 5.2-7 5.2Z" />
                        <ellipse cx="5.2" cy="7.3" rx="2" ry="2.7" />
                        <ellipse cx="10.1" cy="4.8" rx="2" ry="2.7" />
                        <ellipse cx="16" cy="4.8" rx="2" ry="2.7" />
                        <ellipse cx="20.2" cy="7.8" rx="2" ry="2.7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-pine-950">{m.nombre}</div>
                      <div className="text-[10px] text-slate-400">{m.raza || m.especie}</div>
                    </div>
                  </div>
                </td>
                <td className={TD}>
                  <span className="font-medium text-pine-800">{m.cliente_nombre || '—'}</span>
                </td>
                <td className={TD}>
                  <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[10px] font-bold text-pine-700">
                    {m.especie}
                  </span>
                </td>
                <td className={TD}>
                  <span className="text-slate-600">{m.raza || '—'}</span>
                </td>
                <td className={TD}>
                  <span className="text-slate-500">{formatDate(m.fecha_nacimiento)}</span>
                </td>
                <td className={`${TD} text-right`}>
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(m)}
                      className="icon-btn grid h-8 w-8 place-items-center rounded-lg text-slate-400"
                      title="Editar"
                      aria-label="Editar"
                    >
                      {SVG_EDIT}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(m)}
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


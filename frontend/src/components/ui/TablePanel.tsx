import type { ReactNode } from 'react'
import { SearchInput } from '../ui/SearchInput'

interface TablePanelProps {
  icon:        ReactNode
  tableTitle:  string
  totalCount:  number
  shownCount:  number
  search:      string
  onSearch:    (v: string) => void
  children:    ReactNode
}

export function TablePanel({
  icon, tableTitle, totalCount, shownCount, search, onSearch, children,
}: TablePanelProps) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-sage-200/80 bg-white shadow-panel">
      {/* Panel header */}
      <div className="flex flex-col gap-4 border-b border-sage-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sage-100 text-pine-700">
            {icon}
          </div>
          <div>
            <h2 className="text-[14px] font-extrabold text-pine-950">{tableTitle}</h2>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {totalCount} {totalCount === 1 ? 'registro' : 'registros'} en total
            </p>
          </div>
        </div>
        <SearchInput value={search} onChange={onSearch} />
      </div>

      {/* Table */}
      <div className="soft-scroll overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          {children}
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-between gap-2 border-t border-sage-100 px-5 py-4 text-[10px] text-slate-400 sm:flex-row sm:px-7">
        <span>
          {shownCount
            ? `Mostrando ${shownCount} de ${totalCount} registros`
            : 'No hay registros para mostrar'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Conectado a la API
        </span>
      </div>
    </section>
  )
}


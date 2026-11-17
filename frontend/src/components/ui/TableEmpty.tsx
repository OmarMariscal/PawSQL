export function TableEmpty({ colspan }: { colspan: number }) {
  return (
    <tr>
      <td colSpan={colspan} className="px-6 py-16 text-center">
        <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-sage-100 text-pine-700">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-xs font-bold text-pine-900">No encontramos registros</p>
        <p className="mt-1 text-[10px] text-slate-400">Prueba con otro término de búsqueda.</p>
      </td>
    </tr>
  )
}


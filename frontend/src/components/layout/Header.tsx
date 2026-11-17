import { useLocation } from 'react-router-dom'

const SECTION_LABELS: Record<string, string> = {
  '/clientes':     'Clientes',
  '/mascotas':     'Mascotas',
  '/veterinarios': 'Veterinarios',
  '/consultas':    'Consultas',
  '/tratamientos': 'Tratamientos',
}

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const location  = useLocation()
  const section   = SECTION_LABELS[location.pathname] ?? 'PawSQL'

  return (
    <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-sage-200/80 bg-white/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <button
          className="rounded-xl p-2 text-pine-800 hover:bg-sage-100 md:hidden"
          onClick={onMenuClick}
          aria-label="Abrir menú"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
        <div className="hidden text-xs text-slate-400 sm:block">
          PawSQL <span className="mx-2 text-sage-300">/</span>
          <span className="font-semibold text-pine-800">{section}</span>
        </div>
        <div className="text-sm font-bold text-pine-900 sm:hidden">PawSQL</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-xs font-bold text-pine-900">Administrador</p>
          <p className="text-[10px] text-slate-400">Panel de gestión</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-sage-100 text-[11px] font-extrabold text-pine-800 ring-2 ring-white">
          AD
        </div>
      </div>
    </header>
  )
}


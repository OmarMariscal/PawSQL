import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const LINKS = [
  {
    to: '/clientes',
    label: 'Clientes',
    icon: (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 4.2a4 4 0 0 1 0 7.6M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/mascotas',
    label: 'Mascotas',
    icon: (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20.5c-3.8 0-7-2.2-7-5.2 0-2.2 1.8-3.8 4-3.8 1.3 0 2.2.5 3 1.3.8-.8 1.7-1.3 3-1.3 2.2 0 4 1.6 4 3.8 0 3-3.2 5.2-7 5.2Z" />
        <ellipse cx="5.2" cy="7.3" rx="2" ry="2.7" />
        <ellipse cx="10.1" cy="4.8" rx="2" ry="2.7" />
        <ellipse cx="16" cy="4.8" rx="2" ry="2.7" />
        <ellipse cx="20.2" cy="7.8" rx="2" ry="2.7" />
      </svg>
    ),
  },
  {
    to: '/veterinarios',
    label: 'Veterinarios',
    icon: (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-3.7-7-9.2V5.2L12 2l7 3.2v6.6C19 17.3 12 21 12 21Z" />
        <path d="M12 7v7M8.5 10.5h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/consultas',
    label: 'Consultas',
    icon: (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="M8 8h8M8 12h3m2 0h3m-8 4h8M8 1.8v3.4M16 1.8v3.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/tratamientos',
    label: 'Tratamientos',
    icon: (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m4.7 16.5 7.8-7.8a4 4 0 0 1 5.7 5.7l-7.8 7.8a4 4 0 0 1-5.7-5.7Z" />
        <path d="m8 13.2 5.7 5.7M8 5.5l2 2m4-5 .8 2.8m5.7 1.2-2.1 2.1" strokeLinecap="round" />
      </svg>
    ),
  },
]

interface SidebarProps {
  open:    boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  // Close on navigation (mobile)
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname
      onClose()
    }
  }, [location.pathname, onClose])

  return (
    <>
      {/* Mobile shade */}
      <div
        onClick={onClose}
        className={[
          'mobile-shade fixed inset-0 z-30 bg-pine-950/40 md:hidden',
          open ? 'show block' : 'hidden',
        ].join(' ')}
      />

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={['sidebar fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col bg-pine-950 text-white md:translate-x-0', open ? 'open' : ''].join(' ')}
      >
        {/* Logo */}
        <div className="flex h-[86px] items-center gap-3 border-b border-white/10 px-7">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-coral-300">
            <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
              <path d="M20 34s-12-7.1-12-17.2C8 11.4 11.2 8 15.1 8c2.3 0 4 1.2 4.9 3 1-1.8 2.7-3 5-3C28.8 8 32 11.4 32 16.8 32 26.9 20 34 20 34Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
              <path d="M14.3 19.3h4l1.7-3.2 2.2 7 1.5-3.8h2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-[Manrope] text-[19px] font-extrabold tracking-tight">
              PawSQL<span className="text-coral-300">.</span>
            </div>
            <div className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[.2em] text-white/45">
              Gestión veterinaria
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="px-5 pt-8">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">
            Menú principal
          </p>
          <nav className="space-y-1.5">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  ['nav-link flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] font-semibold',
                    isActive ? 'active text-white' : 'text-white/65',
                  ].join(' ')
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer note */}
        <div className="mt-auto px-5 pb-6">
          <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4">
            <div className="mb-2 flex items-center gap-2 text-coral-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3v18M3 12h18" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-[.16em]">PawSQL</span>
            </div>
            <p className="text-xs leading-5 text-white/65">
              Una forma sencilla de organizar la atención de cada mascota.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2 px-2 text-[10px] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Proyecto académico · PostgreSQL
          </div>
        </div>
      </aside>
    </>
  )
}


import type { ReactNode } from 'react'

interface PageHeadingProps {
  title:    string
  subtitle: string
  newLabel: string
  onNew:    () => void
}

export function PageHeading({ title, subtitle, newLabel, onNew }: PageHeadingProps) {
  return (
    <section className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-[2px] w-6 rounded-full bg-coral-500" />
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-pine-600">
            Control de información
          </span>
        </div>
        <h1 className="font-[Manrope] text-[30px] font-extrabold tracking-tight text-pine-950 sm:text-[34px]">
          {title}
        </h1>
        <p className="mt-1.5 max-w-xl text-[13px] leading-6 text-slate-500">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onNew}
        className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-pine-800 px-5 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(32,83,77,.18)] transition hover:-translate-y-0.5 hover:bg-pine-700 hover:shadow-soft sm:self-auto"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
        {newLabel}
      </button>
    </section>
  )
}

/** Decorative note below the table (matches prototype's quiet visual note) */
export function PageNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-sage-200/70 bg-white/55 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="pet-orbit hidden h-10 w-10 place-items-center rounded-full bg-coral-100 text-coral-500 sm:grid">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 20.5c-3.8 0-7-2.2-7-5.2 0-2.2 1.8-3.8 4-3.8 1.3 0 2.2.5 3 1.3.8-.8 1.7-1.3 3-1.3 2.2 0 4 1.6 4 3.8 0 3-3.2 5.2-7 5.2Z" />
            <ellipse cx="5.2" cy="7.3" rx="2" ry="2.7" />
            <ellipse cx="10.1" cy="4.8" rx="2" ry="2.7" />
            <ellipse cx="16" cy="4.8" rx="2" ry="2.7" />
            <ellipse cx="20.2" cy="7.8" rx="2" ry="2.7" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-bold text-pine-900">{children}</p>
          <p className="mt-0.5 text-[10px] text-slate-400">PawSQL · Sistema de gestión para clínica veterinaria</p>
        </div>
      </div>
      <span className="hidden rounded-full bg-sage-100 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-pine-700 sm:inline-flex">
        CRUD
      </span>
    </div>
  )
}


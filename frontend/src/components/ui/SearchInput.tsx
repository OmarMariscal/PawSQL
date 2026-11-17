interface SearchInputProps {
  value:    string
  onChange: (v: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full sm:max-w-[270px]">
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      >
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar registro..."
        className="h-10 w-full rounded-xl border border-sage-200 bg-sage-50/60 pl-10 pr-4 text-xs text-pine-900 placeholder:text-slate-400 transition focus:bg-white"
      />
    </div>
  )
}


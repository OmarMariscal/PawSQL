const FMT = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

export function formatMoney(value: number | undefined | null): string {
  if (value == null) return '—'
  return FMT.format(value)
}


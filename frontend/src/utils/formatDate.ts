/**
 * Formats a YYYY-MM-DD date string to locale date without timezone shift.
 * Splits the string to avoid Date() UTC interpretation.
 */
export function formatDate(value: string | undefined | null): string {
  if (!value) return '—'
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  })
}


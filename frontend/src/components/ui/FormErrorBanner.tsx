interface FormErrorBannerProps {
  /** null = hidden */
  error: string | null
  onDismiss: () => void
}

export function FormErrorBanner({ error, onDismiss }: FormErrorBannerProps) {
  return (
    <div
      className={[
        'overflow-hidden transition-all duration-300',
        error ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0',
      ].join(' ')}
      aria-live="assertive"
    >
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-coral-300 bg-coral-100 px-3.5 py-3">
          {/* Warning icon */}
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-coral-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>

          {/* Message */}
          <p className="flex-1 text-[11px] leading-5 text-pine-950">{error}</p>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Cerrar error"
            className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded text-coral-500 transition hover:text-pine-950"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

import type { ApiError, ErrorResponse } from '../types'

const BASE = import.meta.env.VITE_API_URL ?? ''

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })

  if (res.ok) {
    const text = await res.text()
    if (!text) return undefined as T
    try {
      return JSON.parse(text) as T
    } catch {
      return text as unknown as T
    }
  }

  let errorBody: ErrorResponse = {}
  const errorText = await res.text()
  if (errorText) {
    try {
      errorBody = JSON.parse(errorText) as ErrorResponse
    } catch {
      errorBody = { message: errorText }
    }
  }

  const err: ApiError = {
    status:  res.status,
    message: errorBody.message ?? `Error ${res.status}`,
    code:    errorBody.code,
  }
  throw err
}

export const http = {
  get:    <T>(path: string)                       => request<T>(path),
  post:   <T>(path: string, body: unknown)        => request<T>(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    <T>(path: string, body: unknown)        => request<T>(path, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: <T>(path: string)                       => request<T>(path, { method: 'DELETE' }),
}

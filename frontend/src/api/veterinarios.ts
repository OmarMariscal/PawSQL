import { http } from './client'
import type { Veterinario, VeterinarioInput } from '../types'

export const veterinariosApi = {
  list:   ()                                   => http.get<Veterinario[]>('/api/veterinarios'),
  create: (body: VeterinarioInput)             => http.post<Veterinario>('/api/veterinarios', body),
  update: (id: number, body: VeterinarioInput) => http.put<Veterinario>(`/api/veterinarios/${id}`, body),
  remove: (id: number)                         => http.delete<void>(`/api/veterinarios/${id}`),
}


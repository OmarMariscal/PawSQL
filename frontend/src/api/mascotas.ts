import { http } from './client'
import type { Mascota, MascotaInput } from '../types'

export const mascotasApi = {
  list:   ()                               => http.get<Mascota[]>('/api/mascotas'),
  create: (body: MascotaInput)             => http.post<Mascota>('/api/mascotas', body),
  update: (id: number, body: MascotaInput) => http.put<Mascota>(`/api/mascotas/${id}`, body),
  remove: (id: number)                     => http.delete<void>(`/api/mascotas/${id}`),
}


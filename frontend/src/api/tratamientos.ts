import { http } from './client'
import type { Tratamiento, TratamientoInput } from '../types'

export const tratamientosApi = {
  list:   ()                                    => http.get<Tratamiento[]>('/api/tratamientos'),
  create: (body: TratamientoInput)              => http.post<Tratamiento>('/api/tratamientos', body),
  update: (id: number, body: TratamientoInput)  => http.put<Tratamiento>(`/api/tratamientos/${id}`, body),
  remove: (id: number)                          => http.delete<void>(`/api/tratamientos/${id}`),
}


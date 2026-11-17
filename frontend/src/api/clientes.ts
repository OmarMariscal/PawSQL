import { http } from './client'
import type { Cliente, ClienteInput } from '../types'

export const clientesApi = {
  list:   ()                             => http.get<Cliente[]>('/api/clientes'),
  create: (body: ClienteInput)           => http.post<Cliente>('/api/clientes', body),
  update: (id: number, body: ClienteInput) => http.put<Cliente>(`/api/clientes/${id}`, body),
  remove: (id: number)                   => http.delete<void>(`/api/clientes/${id}`),
}


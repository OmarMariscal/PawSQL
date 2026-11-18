import { http } from './client'
import type { Consulta, ConsultaInput } from '../types'

export const consultasApi = {
  list:   ()                                  => http.get<Consulta[]>('/api/consultas'),
  create: (body: ConsultaInput)               => http.post<Consulta>('/api/consultas', body),
  update: (id: number, body: ConsultaInput)   => http.put<Consulta>(`/api/consultas/${id}`, body),
  remove: (id: number)                        => http.delete<void>(`/api/consultas/${id}`),
}


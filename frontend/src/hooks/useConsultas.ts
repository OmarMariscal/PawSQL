import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { consultasApi } from '../api/consultas'
import type { ConsultaInput } from '../types'

export const CONSULTAS_KEY = ['consultas'] as const

export function useConsultas() {
  return useQuery({ queryKey: CONSULTAS_KEY, queryFn: consultasApi.list })
}

export function useCreateConsulta() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: ConsultaInput) => consultasApi.create(body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: CONSULTAS_KEY }),
  })
}

export function useUpdateConsulta() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: ConsultaInput }) => consultasApi.update(id, body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: CONSULTAS_KEY }),
  })
}

export function useDeleteConsulta() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => consultasApi.remove(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: CONSULTAS_KEY }),
  })
}


import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { tratamientosApi } from '../api/tratamientos'
import type { TratamientoInput } from '../types'

export const TRATAMIENTOS_KEY = ['tratamientos'] as const

export function useTratamientos() {
  return useQuery({ queryKey: TRATAMIENTOS_KEY, queryFn: tratamientosApi.list })
}

export function useCreateTratamiento() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: TratamientoInput) => tratamientosApi.create(body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: TRATAMIENTOS_KEY }),
  })
}

export function useUpdateTratamiento() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: TratamientoInput }) => tratamientosApi.update(id, body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: TRATAMIENTOS_KEY }),
  })
}

export function useDeleteTratamiento() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => tratamientosApi.remove(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: TRATAMIENTOS_KEY }),
  })
}


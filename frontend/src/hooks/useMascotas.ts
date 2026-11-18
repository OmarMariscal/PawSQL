import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mascotasApi } from '../api/mascotas'
import type { MascotaInput } from '../types'

export const MASCOTAS_KEY = ['mascotas'] as const

export function useMascotas() {
  return useQuery({ queryKey: MASCOTAS_KEY, queryFn: mascotasApi.list })
}

export function useCreateMascota() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: MascotaInput) => mascotasApi.create(body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: MASCOTAS_KEY }),
  })
}

export function useUpdateMascota() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: MascotaInput }) => mascotasApi.update(id, body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: MASCOTAS_KEY }),
  })
}

export function useDeleteMascota() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mascotasApi.remove(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: MASCOTAS_KEY }),
  })
}


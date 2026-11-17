import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { veterinariosApi } from '../api/veterinarios'
import type { VeterinarioInput } from '../types'

export const VETERINARIOS_KEY = ['veterinarios'] as const

export function useVeterinarios() {
  return useQuery({ queryKey: VETERINARIOS_KEY, queryFn: veterinariosApi.list })
}

export function useCreateVeterinario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: VeterinarioInput) => veterinariosApi.create(body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: VETERINARIOS_KEY }),
  })
}

export function useUpdateVeterinario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: VeterinarioInput }) => veterinariosApi.update(id, body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: VETERINARIOS_KEY }),
  })
}

export function useDeleteVeterinario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => veterinariosApi.remove(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: VETERINARIOS_KEY }),
  })
}


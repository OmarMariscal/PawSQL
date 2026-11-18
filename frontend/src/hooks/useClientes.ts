import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { clientesApi } from '../api/clientes'
import type { ClienteInput } from '../types'

export const CLIENTES_KEY = ['clientes'] as const

export function useClientes() {
  return useQuery({
    queryKey: CLIENTES_KEY,
    queryFn:  clientesApi.list,
  })
}

export function useCreateCliente() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: ClienteInput) => clientesApi.create(body),
    onSuccess:  () => qc.invalidateQueries({ queryKey: CLIENTES_KEY }),
  })
}

export function useUpdateCliente() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: ClienteInput }) =>
      clientesApi.update(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: CLIENTES_KEY }),
  })
}

export function useDeleteCliente() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => clientesApi.remove(id),
    onSuccess:  () => {
      // Cascade: also invalidate mascotas
      qc.invalidateQueries({ queryKey: CLIENTES_KEY })
      qc.invalidateQueries({ queryKey: ['mascotas'] })
    },
  })
}


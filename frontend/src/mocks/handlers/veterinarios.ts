import { http, HttpResponse } from 'msw'
import type { Veterinario, VeterinarioInput } from '../../types'

let nextId = 4
const store: Veterinario[] = [
  { id_veterinario: 1, nombre: 'Dra. Sofía Herrera', especialidad: 'Medicina general', cedula_profesional: 'VET-28451' },
  { id_veterinario: 2, nombre: 'Dr. Diego Navarro',  especialidad: 'Dermatología',     cedula_profesional: 'VET-19382' },
  { id_veterinario: 3, nombre: 'Dra. Paula Méndez',  especialidad: 'Cirugía',          cedula_profesional: 'VET-37410' },
]

export const veterinariosHandlers = [
  http.get('/api/veterinarios', () => HttpResponse.json(store)),

  http.post('/api/veterinarios', async ({ request }) => {
    const body = await request.json() as VeterinarioInput
    const dup  = store.some((v) => v.cedula_profesional === body.cedula_profesional)
    if (dup) return HttpResponse.json({ error: 'Conflict', message: 'La cédula profesional ya se encuentra registrada.', code: 'UNIQUE_VIOLATION' }, { status: 409 })
    const nuevo: Veterinario = { id_veterinario: nextId++, ...body }
    store.push(nuevo)
    return new HttpResponse(null, { status: 201 })
  }),

  http.put('/api/veterinarios/:id', async ({ params, request }) => {
    const id   = Number(params['id'])
    const body = await request.json() as VeterinarioInput
    const idx  = store.findIndex((v) => v.id_veterinario === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Veterinario no encontrado', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store[idx] = { ...store[idx], ...body }
    return new HttpResponse(null, { status: 200 })
  }),

  http.delete('/api/veterinarios/:id', ({ params }) => {
    const id  = Number(params['id'])
    const idx = store.findIndex((v) => v.id_veterinario === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Veterinario no encontrado', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store.splice(idx, 1)
    return new HttpResponse(null, { status: 200 })
  }),
]


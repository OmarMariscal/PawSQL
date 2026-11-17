import { http, HttpResponse } from 'msw'
import type { Tratamiento, TratamientoInput } from '../../types'

let nextId = 4
const store: Tratamiento[] = [
  { id_tratamiento: 1, nombre: 'Desparasitación',   descripcion: 'Tratamiento antiparasitario interno.',    costo: 350.00 },
  { id_tratamiento: 2, nombre: 'Limpieza dental',   descripcion: 'Profilaxis y limpieza dental.',           costo: 680.00 },
  { id_tratamiento: 3, nombre: 'Curación de piel',  descripcion: 'Limpieza y cuidado de lesiones cutáneas.', costo: 420.00 },
]

export const tratamientosHandlers = [
  http.get('/api/tratamientos', () => HttpResponse.json(store)),

  http.post('/api/tratamientos', async ({ request }) => {
    const body  = await request.json() as TratamientoInput
    const nuevo: Tratamiento = { id_tratamiento: nextId++, ...body }
    store.push(nuevo)
    return new HttpResponse(null, { status: 201 })
  }),

  http.put('/api/tratamientos/:id', async ({ params, request }) => {
    const id   = Number(params['id'])
    const body = await request.json() as TratamientoInput
    const idx  = store.findIndex((t) => t.id_tratamiento === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Tratamiento no encontrado', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store[idx] = { ...store[idx], ...body }
    return new HttpResponse(null, { status: 200 })
  }),

  http.delete('/api/tratamientos/:id', ({ params }) => {
    const id  = Number(params['id'])
    const idx = store.findIndex((t) => t.id_tratamiento === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Tratamiento no encontrado', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store.splice(idx, 1)
    return new HttpResponse(null, { status: 200 })
  }),
]


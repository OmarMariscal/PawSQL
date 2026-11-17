import { http, HttpResponse } from 'msw'
import type { Cliente, ClienteInput } from '../../types'

let nextId = 5
const store: Cliente[] = [
  { id_cliente: 1, nombre: 'Ana Laura Pérez',  telefono: '33-1234-5678', email: 'ana.perez@email.com',  fecha_registro: '2026-11-06' },
  { id_cliente: 2, nombre: 'Carlos Gómez',      telefono: '33-8765-4321', email: 'carlos.g@email.com',   fecha_registro: '2026-11-06' },
  { id_cliente: 3, nombre: 'Mariana Torres',    telefono: '33-4567-8910', email: 'mariana.t@email.com',  fecha_registro: '2026-11-04' },
  { id_cliente: 4, nombre: 'Jorge Ramírez',     telefono: '33-1122-3344', email: 'jorge.r@email.com',    fecha_registro: '2026-11-02' },
]

export const clientesHandlers = [
  http.get('/api/clientes', () => HttpResponse.json(store)),

  http.post('/api/clientes', async ({ request }) => {
    const body = await request.json() as ClienteInput
    const nuevo: Cliente = { id_cliente: nextId++, fecha_registro: new Date().toISOString().slice(0, 10), ...body }
    store.push(nuevo)
    return HttpResponse.json(nuevo, { status: 201 })
  }),

  http.put('/api/clientes/:id', async ({ params, request }) => {
    const id   = Number(params['id'])
    const body = await request.json() as ClienteInput
    const idx  = store.findIndex((c) => c.id_cliente === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Cliente no encontrado', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store[idx] = { ...store[idx], ...body }
    return HttpResponse.json(store[idx])
  }),

  http.delete('/api/clientes/:id', ({ params }) => {
    const id  = Number(params['id'])
    const idx = store.findIndex((c) => c.id_cliente === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Cliente no encontrado', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store.splice(idx, 1)
    return new HttpResponse(null, { status: 200 })
  }),
]


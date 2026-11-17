import { http, HttpResponse } from 'msw'
import type { Mascota, MascotaInput } from '../../types'

let nextId = 5
const store: Mascota[] = [
  { id_mascota: 1, id_cliente: 1, nombre: 'Luna', especie: 'Perro', raza: 'Golden retriever', fecha_nacimiento: '2022-03-14', cliente_nombre: 'Ana Laura Pérez' },
  { id_mascota: 2, id_cliente: 2, nombre: 'Milo', especie: 'Gato',  raza: 'Europeo',          fecha_nacimiento: '2023-08-02', cliente_nombre: 'Carlos Gómez'    },
  { id_mascota: 3, id_cliente: 3, nombre: 'Coco', especie: 'Perro', raza: 'Poodle',            fecha_nacimiento: '2021-11-20', cliente_nombre: 'Mariana Torres'  },
  { id_mascota: 4, id_cliente: 1, nombre: 'Nala', especie: 'Gato',  raza: 'Siamés',            fecha_nacimiento: '2024-01-11', cliente_nombre: 'Ana Laura Pérez' },
]

export const mascotasHandlers = [
  http.get('/api/mascotas', () => HttpResponse.json(store)),

  http.post('/api/mascotas', async ({ request }) => {
    const body  = await request.json() as MascotaInput
    const nueva: Mascota = { id_mascota: nextId++, cliente_nombre: '', ...body }
    store.push(nueva)
    return HttpResponse.json(nueva, { status: 201 })
  }),

  http.put('/api/mascotas/:id', async ({ params, request }) => {
    const id   = Number(params['id'])
    const body = await request.json() as MascotaInput
    const idx  = store.findIndex((m) => m.id_mascota === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Mascota no encontrada', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store[idx] = { ...store[idx], ...body }
    return new HttpResponse(null, { status: 200 })
  }),

  http.delete('/api/mascotas/:id', ({ params }) => {
    const id  = Number(params['id'])
    const idx = store.findIndex((m) => m.id_mascota === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Mascota no encontrada', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store.splice(idx, 1)
    return new HttpResponse(null, { status: 200 })
  }),
]


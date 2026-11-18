import { http, HttpResponse } from 'msw'
import type { Consulta, ConsultaInput } from '../../types'

let nextId = 4
const store: Consulta[] = [
  {
    id_consulta: 1, id_mascota: 1, id_veterinario: 1, fecha_consulta: '2026-11-06',
    motivo: 'Revisión general', peso_kg: 18.40,
    mascota_nombre: 'Luna', cliente_nombre: 'Ana Laura Pérez', veterinario_nombre: 'Dra. Sofía Herrera',
    tratamientos: [{ id_tratamiento: 1, dosis_o_indicacion: 'Dosis única según peso.', nombre_tratamiento: 'Desparasitación' }],
  },
  {
    id_consulta: 2, id_mascota: 2, id_veterinario: 2, fecha_consulta: '2026-11-05',
    motivo: 'Irritación en la piel', peso_kg: 4.20,
    mascota_nombre: 'Milo', cliente_nombre: 'Carlos Gómez', veterinario_nombre: 'Dr. Diego Navarro',
    tratamientos: [{ id_tratamiento: 3, dosis_o_indicacion: 'Aplicar según indicación médica.', nombre_tratamiento: 'Curación de piel' }],
  },
  {
    id_consulta: 3, id_mascota: 3, id_veterinario: 3, fecha_consulta: '2026-11-03',
    motivo: 'Valoración preoperatoria', peso_kg: 8.10,
    mascota_nombre: 'Coco', cliente_nombre: 'Mariana Torres', veterinario_nombre: 'Dra. Paula Méndez',
    tratamientos: [],
  },
]

export const consultasHandlers = [
  http.get('/api/consultas', () => HttpResponse.json(store)),

  http.post('/api/consultas', async ({ request }) => {
    const body  = await request.json() as ConsultaInput
    const nueva: Consulta = {
      id_consulta: nextId++,
      mascota_nombre: '', cliente_nombre: '', veterinario_nombre: '',
      tratamientos: (body.tratamientos ?? []).map((t) => ({ ...t, nombre_tratamiento: '' })),
      ...body,
    }
    store.push(nueva)
    return new HttpResponse(null, { status: 201 })
  }),

  http.put('/api/consultas/:id', async ({ params, request }) => {
    const id   = Number(params['id'])
    const body = await request.json() as ConsultaInput
    const idx  = store.findIndex((c) => c.id_consulta === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Consulta no encontrada', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store[idx] = {
      ...store[idx], ...body,
      tratamientos: (body.tratamientos ?? []).map((t) => ({ ...t, nombre_tratamiento: '' })),
    }
    return new HttpResponse(null, { status: 200 })
  }),

  http.delete('/api/consultas/:id', ({ params }) => {
    const id  = Number(params['id'])
    const idx = store.findIndex((c) => c.id_consulta === id)
    if (idx === -1) return HttpResponse.json({ error: 'Not Found', message: 'Consulta no encontrada', code: 'RECORD_NOT_FOUND' }, { status: 404 })
    store.splice(idx, 1)
    return new HttpResponse(null, { status: 200 })
  }),
]


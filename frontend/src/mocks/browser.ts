import { setupWorker } from 'msw/browser'
import { clientesHandlers }     from './handlers/clientes'
import { mascotasHandlers }     from './handlers/mascotas'
import { veterinariosHandlers } from './handlers/veterinarios'
import { tratamientosHandlers } from './handlers/tratamientos'
import { consultasHandlers }    from './handlers/consultas'

export const worker = setupWorker(
  ...clientesHandlers,
  ...mascotasHandlers,
  ...veterinariosHandlers,
  ...tratamientosHandlers,
  ...consultasHandlers,
)


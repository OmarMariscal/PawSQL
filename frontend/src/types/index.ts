import type { components } from './api'

export type ErrorResponse     = components['schemas']['ErrorResponse']

export type ClienteInput      = components['schemas']['ClienteInput']
export type Cliente           = components['schemas']['Cliente'] & { id_cliente: number }

export type MascotaInput      = components['schemas']['MascotaInput']
export type Mascota           = components['schemas']['Mascota'] & { id_mascota: number }

export type VeterinarioInput  = components['schemas']['VeterinarioInput']
export type Veterinario       = components['schemas']['Veterinario'] & { id_veterinario: number }

export type TratamientoInput  = components['schemas']['TratamientoInput']
export type Tratamiento       = components['schemas']['Tratamiento'] & { id_tratamiento: number }

export type ConsultaTratamientoInput  = components['schemas']['ConsultaTratamientoInput']
export type ConsultaTratamientoOutput = components['schemas']['ConsultaTratamientoOutput']

export type ConsultaInput     = components['schemas']['ConsultaInput']
export type Consulta          = Omit<components['schemas']['Consulta'], 'tratamientos'> & {
  id_consulta: number
  tratamientos?: ConsultaTratamientoOutput[]
}

/** Shape of every error thrown by the API client */
export interface ApiError {
  status: number
  message: string
  code?: string
}

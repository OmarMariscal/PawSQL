/**
 * Maps backend ApiError codes, HTTP statuses, and constraint clues
 * into user-friendly, empathetic Spanish messages for UI/UX.
 */
export function humanizeApiError(err: {
  code?: string
  message?: string
  status?: number
}): string {
  const rawMsg = err.message || ''

  // 1. Detection of specific unique constraints from message details
  if (
    rawMsg.includes('cedula_profesional') ||
    rawMsg.includes('cédula') ||
    rawMsg.includes('cedula')
  ) {
    return 'La cédula profesional ya se encuentra registrada en el sistema.'
  }

  if (rawMsg.includes('email') || rawMsg.includes('correo')) {
    return 'El correo electrónico ya está registrado con otro cliente.'
  }

  if (rawMsg.includes('telefono') || rawMsg.includes('teléfono')) {
    return 'El número de teléfono ya está registrado con otro cliente.'
  }

  // 2. Detection of specific check constraints
  if (rawMsg.includes('peso_kg') || rawMsg.includes('peso')) {
    return 'El peso de la mascota debe ser un valor mayor a 0 kg.'
  }

  if (rawMsg.includes('costo')) {
    return 'El costo del tratamiento debe ser mayor o igual a 0.00 MXN.'
  }

  // 3. Detection of foreign key constraints
  if (
    rawMsg.includes('fk_consulta_veterinario') ||
    rawMsg.includes('veterinario') && (err.status === 409 || err.code === 'FOREIGN_KEY_VIOLATION')
  ) {
    return 'No se puede eliminar el veterinario porque tiene consultas médicas asignadas.'
  }

  // 4. Code-based mapping (from OpenAPI contract)
  if (err.code) {
    switch (err.code) {
      case 'UNIQUE_VIOLATION':
        return 'Ya existe un registro con estos datos únicos (ej. cédula, teléfono o correo duplicado).'
      case 'CHECK_VIOLATION':
        return 'Los datos ingresados no cumplen con las reglas de validación del sistema.'
      case 'RECORD_NOT_FOUND':
        return 'El registro solicitado no existe o ya fue eliminado.'
      case 'INSERT_FAILED':
        return 'No se pudo guardar la información. Verifica los campos requeridos.'
      case 'NOT_NULL_VIOLATION':
        return 'Faltan campos obligatorios por completar.'
      case 'FOREIGN_KEY_VIOLATION':
        return 'No se puede eliminar o asociar: existen registros relacionados dependientes.'
      default:
        break
    }
  }

  // 5. Status-based fallback
  if (err.status === 409) {
    return 'Conflicto: Ya existe un registro con información idéntica o está vinculado a otras entidades.'
  }
  if (err.status === 404) {
    return 'El registro no fue encontrado en la base de datos.'
  }
  if (err.status === 400) {
    return 'Los datos enviados no son válidos. Por favor, revisa el formulario.'
  }

  // 6. Fallback to clean error message if available
  if (rawMsg && !rawMsg.startsWith('Error ')) {
    return rawMsg
  }

  return 'Ocurrió un error inesperado al procesar la solicitud.'
}

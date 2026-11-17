import { useState } from 'react'
import {
  useConsultas,
  useCreateConsulta,
  useUpdateConsulta,
  useDeleteConsulta,
} from '../../hooks/useConsultas'
import { useMascotas }     from '../../hooks/useMascotas'
import { useVeterinarios } from '../../hooks/useVeterinarios'
import { useTratamientos } from '../../hooks/useTratamientos'
import { useToast }        from '../ui/useToast'
import { PageHeading, PageNote } from '../ui/PageHeading'
import { TablePanel }      from '../ui/TablePanel'
import { ConsultasTable }  from './ConsultasTable'
import { ConsultaForm }    from './ConsultaForm'
import { DeleteModal }     from '../ui/DeleteModal'
import type { Consulta, ConsultaInput, ApiError } from '../../types'

const ICON = (
  <svg className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
    <path d="M8 8h8M8 12h3m2 0h3m-8 4h8M8 1.8v3.4M16 1.8v3.4" strokeLinecap="round" />
  </svg>
)

export function ConsultasPage() {
  const { data = [], isLoading }            = useConsultas()
  const { data: mascotas = [] }             = useMascotas()
  const { data: veterinarios = [] }         = useVeterinarios()
  const { data: tratamientos = [] }         = useTratamientos()
  const createMutation = useCreateConsulta()
  const updateMutation = useUpdateConsulta()
  const deleteMutation = useDeleteConsulta()
  const { showToast }  = useToast()

  const [search, setSearch]             = useState('')
  const [formOpen, setFormOpen]         = useState(false)
  const [editing, setEditing]           = useState<Consulta | null>(null)
  const [deletingItem, setDeletingItem] = useState<Consulta | null>(null)

  const filtered = data.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.motivo.toLowerCase().includes(q) ||
      (c.mascota_nombre ?? '').toLowerCase().includes(q) ||
      (c.cliente_nombre ?? '').toLowerCase().includes(q) ||
      (c.veterinario_nombre ?? '').toLowerCase().includes(q) ||
      c.fecha_consulta.includes(q)
    )
  })

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(c: Consulta) {
    setEditing(c)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  async function handleSubmit(formData: ConsultaInput) {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id_consulta, body: formData })
        showToast('Cambios guardados correctamente.')
      } else {
        await createMutation.mutateAsync(formData)
        showToast('Registro agregado correctamente.')
      }
      closeForm()
    } catch (err) {
      showToast((err as ApiError).message)
    }
  }

  async function handleDelete() {
    if (!deletingItem) return
    try {
      await deleteMutation.mutateAsync(deletingItem.id_consulta)
      showToast('Registro eliminado correctamente.')
    } catch (err) {
      showToast((err as ApiError).message)
    } finally {
      setDeletingItem(null)
    }
  }

  if (isLoading) return <div className="py-20 text-center text-sm text-slate-400">Cargando consultas…</div>

  return (
    <>
      <PageHeading
        title="Consultas"
        subtitle="Registra las consultas, el personal que las atiende y sus tratamientos."
        newLabel="Nueva consulta"
        onNew={openNew}
      />

      <TablePanel
        icon={ICON}
        tableTitle="Historial de consultas"
        totalCount={data.length}
        shownCount={filtered.length}
        search={search}
        onSearch={setSearch}
      >
        <ConsultasTable rows={filtered} onEdit={openEdit} onDelete={setDeletingItem} />
      </TablePanel>

      <PageNote>Cada registro ayuda a brindar una mejor atención.</PageNote>

      <ConsultaForm
        open={formOpen}
        editing={editing}
        mascotas={mascotas}
        veterinarios={veterinarios}
        tratamientos={tratamientos}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteModal
        open={!!deletingItem}
        message={deletingItem ? `Se eliminará la consulta del día ${deletingItem.fecha_consulta}. Esta acción no se puede deshacer.` : ''}
        onCancel={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </>
  )
}

import { useState } from 'react'
import {
  useTratamientos,
  useCreateTratamiento,
  useUpdateTratamiento,
  useDeleteTratamiento,
} from '../../hooks/useTratamientos'
import { useToast } from '../ui/useToast'
import { PageHeading, PageNote } from '../ui/PageHeading'
import { TablePanel } from '../ui/TablePanel'
import { TratamientosTable } from './TratamientosTable'
import { TratamientoForm } from './TratamientoForm'
import { DeleteModal } from '../ui/DeleteModal'
import type { Tratamiento, TratamientoInput, ApiError } from '../../types'

const ICON = (
  <svg className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m4.7 16.5 7.8-7.8a4 4 0 0 1 5.7 5.7l-7.8 7.8a4 4 0 0 1-5.7-5.7Z" />
    <path d="m8 13.2 5.7 5.7M8 5.5l2 2m4-5 .8 2.8m5.7 1.2-2.1 2.1" strokeLinecap="round" />
  </svg>
)

export function TratamientosPage() {
  const { data = [], isLoading } = useTratamientos()
  const createMutation = useCreateTratamiento()
  const updateMutation = useUpdateTratamiento()
  const deleteMutation = useDeleteTratamiento()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Tratamiento | null>(null)
  const [deletingItem, setDeletingItem] = useState<Tratamiento | null>(null)

  const filtered = data.filter((t) => {
    const q = search.toLowerCase()
    return (
      t.nombre.toLowerCase().includes(q) ||
      (t.descripcion ?? '').toLowerCase().includes(q)
    )
  })

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(t: Tratamiento) {
    setEditing(t)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  async function handleSubmit(formData: TratamientoInput) {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id_tratamiento, body: formData })
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
      await deleteMutation.mutateAsync(deletingItem.id_tratamiento)
      showToast('Registro eliminado correctamente.')
    } catch (err) {
      showToast((err as ApiError).message)
    } finally {
      setDeletingItem(null)
    }
  }

  if (isLoading) return <div className="py-20 text-center text-sm text-slate-400">Cargando tratamientos…</div>

  return (
    <>
      <PageHeading
        title="Tratamientos"
        subtitle="Administra los procedimientos y servicios disponibles en la veterinaria."
        newLabel="Nuevo tratamiento"
        onNew={openNew}
      />

      <TablePanel
        icon={ICON}
        tableTitle="Catálogo de tratamientos"
        totalCount={data.length}
        shownCount={filtered.length}
        search={search}
        onSearch={setSearch}
      >
        <TratamientosTable rows={filtered} onEdit={openEdit} onDelete={setDeletingItem} />
      </TablePanel>

      <PageNote>Cada registro ayuda a brindar una mejor atención.</PageNote>

      <TratamientoForm
        open={formOpen}
        editing={editing}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteModal
        open={!!deletingItem}
        message={deletingItem ? `Se eliminará el tratamiento "${deletingItem.nombre}". Esta acción no se puede deshacer.` : ''}
        onCancel={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </>
  )
}

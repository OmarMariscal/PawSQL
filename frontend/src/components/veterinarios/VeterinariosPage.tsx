import { useState } from 'react'
import {
  useVeterinarios,
  useCreateVeterinario,
  useUpdateVeterinario,
  useDeleteVeterinario,
} from '../../hooks/useVeterinarios'
import { useToast } from '../ui/useToast'
import { PageHeading, PageNote } from '../ui/PageHeading'
import { TablePanel } from '../ui/TablePanel'
import { VeterinariosTable } from './VeterinariosTable'
import { VeterinarioForm } from './VeterinarioForm'
import { DeleteModal } from '../ui/DeleteModal'
import type { Veterinario, VeterinarioInput, ApiError } from '../../types'

const ICON = (
  <svg className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21s-7-3.7-7-9.2V5.2L12 2l7 3.2v6.6C19 17.3 12 21 12 21Z" />
    <path d="M12 7v7M8.5 10.5h7" strokeLinecap="round" />
  </svg>
)

export function VeterinariosPage() {
  const { data = [], isLoading } = useVeterinarios()
  const createMutation = useCreateVeterinario()
  const updateMutation = useUpdateVeterinario()
  const deleteMutation = useDeleteVeterinario()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Veterinario | null>(null)
  const [deletingItem, setDeletingItem] = useState<Veterinario | null>(null)

  const filtered = data.filter((v) => {
    const q = search.toLowerCase()
    return (
      v.nombre.toLowerCase().includes(q) ||
      v.especialidad.toLowerCase().includes(q) ||
      v.cedula_profesional.toLowerCase().includes(q)
    )
  })

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(v: Veterinario) {
    setEditing(v)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  async function handleSubmit(formData: VeterinarioInput) {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id_veterinario, body: formData })
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
      await deleteMutation.mutateAsync(deletingItem.id_veterinario)
      showToast('Registro eliminado correctamente.')
    } catch (err) {
      showToast((err as ApiError).message)
    } finally {
      setDeletingItem(null)
    }
  }

  if (isLoading) return <div className="py-20 text-center text-sm text-slate-400">Cargando veterinarios…</div>

  return (
    <>
      <PageHeading
        title="Veterinarios"
        subtitle="Mantén organizada la información del personal médico."
        newLabel="Nuevo veterinario"
        onNew={openNew}
      />

      <TablePanel
        icon={ICON}
        tableTitle="Equipo veterinario"
        totalCount={data.length}
        shownCount={filtered.length}
        search={search}
        onSearch={setSearch}
      >
        <VeterinariosTable rows={filtered} onEdit={openEdit} onDelete={setDeletingItem} />
      </TablePanel>

      <PageNote>Cada registro ayuda a brindar una mejor atención.</PageNote>

      <VeterinarioForm
        open={formOpen}
        editing={editing}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteModal
        open={!!deletingItem}
        message={deletingItem ? `Se eliminará al veterinario "${deletingItem.nombre}". Esta acción no se puede deshacer.` : ''}
        onCancel={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </>
  )
}

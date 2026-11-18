import { useState } from 'react'
import {
  useMascotas,
  useCreateMascota,
  useUpdateMascota,
  useDeleteMascota,
} from '../../hooks/useMascotas'
import { useClientes }  from '../../hooks/useClientes'
import { useToast }     from '../ui/useToast'
import { PageHeading, PageNote } from '../ui/PageHeading'
import { TablePanel }   from '../ui/TablePanel'
import { MascotasTable }  from './MascotasTable'
import { MascotaForm }    from './MascotaForm'
import { DeleteModal }    from '../ui/DeleteModal'
import { humanizeApiError } from '../../utils/apiErrorMessage'
import type { Mascota, MascotaInput, ApiError } from '../../types'

const ICON = (
  <svg className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 20.5c-3.8 0-7-2.2-7-5.2 0-2.2 1.8-3.8 4-3.8 1.3 0 2.2.5 3 1.3.8-.8 1.7-1.3 3-1.3 2.2 0 4 1.6 4 3.8 0 3-3.2 5.2-7 5.2Z" />
    <ellipse cx="5.2" cy="7.3" rx="2" ry="2.7" />
    <ellipse cx="10.1" cy="4.8" rx="2" ry="2.7" />
    <ellipse cx="16" cy="4.8" rx="2" ry="2.7" />
    <ellipse cx="20.2" cy="7.8" rx="2" ry="2.7" />
  </svg>
)

export function MascotasPage() {
  const { data = [], isLoading } = useMascotas()
  const { data: clientes = [] }  = useClientes()
  const createMutation = useCreateMascota()
  const updateMutation = useUpdateMascota()
  const deleteMutation = useDeleteMascota()
  const { showToast }  = useToast()

  const [search,       setSearch]       = useState('')
  const [formOpen,     setFormOpen]     = useState(false)
  const [editing,      setEditing]      = useState<Mascota | null>(null)
  const [deletingItem, setDeletingItem] = useState<Mascota | null>(null)
  const [formError,    setFormError]    = useState<string | null>(null)
  const [deleteError,  setDeleteError]  = useState<string | null>(null)

  const filtered = data.filter((m) => {
    const q = search.toLowerCase()
    return (
      m.nombre.toLowerCase().includes(q) ||
      (m.cliente_nombre ?? '').toLowerCase().includes(q) ||
      m.especie.toLowerCase().includes(q) ||
      (m.raza ?? '').toLowerCase().includes(q)
    )
  })

  function openNew() {
    setEditing(null)
    setFormOpen(true)
    setFormError(null)
  }

  function openEdit(m: Mascota) {
    setEditing(m)
    setFormOpen(true)
    setFormError(null)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
    setFormError(null)
  }

  async function handleSubmit(formData: MascotaInput) {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id_mascota, body: formData })
        showToast('Cambios guardados correctamente.', 'success')
      } else {
        await createMutation.mutateAsync(formData)
        showToast('Registro agregado correctamente.', 'success')
      }
      closeForm()
    } catch (err) {
      const msg = humanizeApiError(err as ApiError)
      showToast(msg, 'error')
      setFormError(msg)
    }
  }

  async function handleDelete() {
    if (!deletingItem) return
    setDeleteError(null)
    try {
      await deleteMutation.mutateAsync(deletingItem.id_mascota)
      showToast('Registro eliminado correctamente.', 'success')
      setDeletingItem(null)
    } catch (err) {
      const msg = humanizeApiError(err as ApiError)
      showToast(msg, 'error')
      setDeleteError(msg)
    }
  }

  if (isLoading) return <div className="py-20 text-center text-sm text-slate-400">Cargando mascotas…</div>

  return (
    <>
      <PageHeading
        title="Mascotas"
        subtitle="Consulta las mascotas registradas y el cliente al que pertenecen."
        newLabel="Nueva mascota"
        onNew={openNew}
      />

      <TablePanel
        icon={ICON}
        tableTitle="Registro de mascotas"
        totalCount={data.length}
        shownCount={filtered.length}
        search={search}
        onSearch={setSearch}
      >
        <MascotasTable rows={filtered} onEdit={openEdit} onDelete={setDeletingItem} />
      </TablePanel>

      <PageNote>Cada registro ayuda a brindar una mejor atención.</PageNote>

      <MascotaForm
        open={formOpen}
        editing={editing}
        clientes={clientes}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
        formError={formError}
        onClearError={() => setFormError(null)}
      />

      <DeleteModal
        open={!!deletingItem}
        message={deletingItem ? `Se eliminará a la mascota "${deletingItem.nombre}". Esta acción no se puede deshacer.` : ''}
        onCancel={() => { setDeletingItem(null); setDeleteError(null) }}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        deleteError={deleteError}
      />
    </>
  )
}

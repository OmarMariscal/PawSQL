import { useState } from 'react'
import { useClientes, useCreateCliente, useUpdateCliente, useDeleteCliente } from '../../hooks/useClientes'
import { useToast } from '../ui/useToast'
import { PageHeading, PageNote } from '../ui/PageHeading'
import { TablePanel }      from '../ui/TablePanel'
import { ClientesTable }   from './ClientesTable'
import { ClienteForm }     from './ClienteForm'
import { DeleteModal }     from '../ui/DeleteModal'
import type { Cliente, ClienteInput, ApiError } from '../../types'

const ICON = (
  <svg className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" strokeLinecap="round" />
  </svg>
)

export function ClientesPage() {
  const { data = [], isLoading } = useClientes()
  const createMutation = useCreateCliente()
  const updateMutation = useUpdateCliente()
  const deleteMutation = useDeleteCliente()
  const { showToast }  = useToast()

  const [search,       setSearch]       = useState('')
  const [formOpen,     setFormOpen]     = useState(false)
  const [editing,      setEditing]      = useState<Cliente | null>(null)
  const [deletingItem, setDeletingItem] = useState<Cliente | null>(null)

  const filtered = data.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.nombre.toLowerCase().includes(q) ||
      (c.telefono ?? '').toLowerCase().includes(q) ||
      (c.email    ?? '').toLowerCase().includes(q)
    )
  })

  function openNew()          { setEditing(null); setFormOpen(true) }
  function openEdit(c: Cliente) { setEditing(c);    setFormOpen(true) }
  function closeForm()        { setFormOpen(false); setEditing(null)  }

  async function handleSubmit(data: ClienteInput) {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id_cliente, body: data })
        showToast('Cambios guardados correctamente.')
      } else {
        await createMutation.mutateAsync(data)
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
      await deleteMutation.mutateAsync(deletingItem.id_cliente)
      showToast('Registro eliminado correctamente.')
    } catch (err) {
      showToast((err as ApiError).message)
    } finally {
      setDeletingItem(null)
    }
  }

  if (isLoading) return <div className="py-20 text-center text-sm text-slate-400">Cargando clientes…</div>

  return (
    <>
      <PageHeading
        title="Clientes"
        subtitle="Administra los datos de las personas responsables de cada mascota."
        newLabel="Nuevo cliente"
        onNew={openNew}
      />

      <TablePanel
        icon={ICON}
        tableTitle="Directorio de clientes"
        totalCount={data.length}
        shownCount={filtered.length}
        search={search}
        onSearch={setSearch}
      >
        <ClientesTable rows={filtered} onEdit={openEdit} onDelete={setDeletingItem} />
      </TablePanel>

      <PageNote>Cada registro ayuda a brindar una mejor atención.</PageNote>

      <ClienteForm
        open={formOpen}
        editing={editing}
        onClose={closeForm}
        onSubmit={handleSubmit}
        submitting={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteModal
        open={!!deletingItem}
        message={deletingItem ? `Se eliminará a "${deletingItem.nombre}" y todas sus mascotas. Esta acción no se puede deshacer.` : ''}
        onCancel={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </>
  )
}


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastProvider }     from './components/ui/Toast'
import { Layout }            from './components/layout/Layout'
import { ClientesPage }      from './components/clientes/ClientesPage'
import { MascotasPage }      from './components/mascotas/MascotasPage'
import { VeterinariosPage }  from './components/veterinarios/VeterinariosPage'
import { TratamientosPage }  from './components/tratamientos/TratamientosPage'
import { ConsultasPage }     from './components/consultas/ConsultasPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:              1,
      staleTime:          30_000,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/clientes" replace />} />
              <Route path="clientes"     element={<ClientesPage />}     />
              <Route path="mascotas"     element={<MascotasPage />}     />
              <Route path="veterinarios" element={<VeterinariosPage />} />
              <Route path="tratamientos" element={<TratamientosPage />} />
              <Route path="consultas"    element={<ConsultasPage />}    />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

// Importar la configuración de axios
import './config/axios'

// Crear el cliente de React Query para gestionar peticiones a la API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // No refrescar datos al volver a la ventana
      retry: 1, // Reintentar una vez si falla
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster 
            position="top-center"
            toastOptions={{
              // Estilos personalizados para las notificaciones toast
              style: {
                background: '#171717',
                color: '#EDEDED',
                border: '1px solid #DA0037'
              },
              success: {
                iconTheme: {
                  primary: '#36D399',
                  secondary: '#EDEDED',
                },
              },
              error: {
                iconTheme: {
                  primary: '#DA0037',
                  secondary: '#EDEDED',
                },
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

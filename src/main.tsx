import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Toaster} from "sonner"
const queryClient = new QueryClient({
  defaultOptions:{
      queries:{
          refetchOnWindowFocus: false
      }
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster richColors/>
      </QueryClientProvider>
    </ModalProvider>
  </StrictMode>,
)

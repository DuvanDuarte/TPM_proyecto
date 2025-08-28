import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // escucha en todas las interfaces de red (incluyendo tu IP local)
    port: 5173,        // puerto que quieres usar, por defecto es 5173
    strictPort: true,  // si el puerto ya está ocupado, no intenta otro puerto sino que falla
  }
})

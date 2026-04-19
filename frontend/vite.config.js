import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: false,
    allowedHosts: true,
    proxy: {
      '/save-location': 'http://localhost:5000',
      '/save-login': 'http://localhost:5000'
    }
  }
})

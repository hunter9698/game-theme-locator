import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: 'all',
    proxy: {
      '/save-location': 'http://localhost:5000'
    }
  }
})

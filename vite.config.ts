import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    // Allow all hosts for Replit proxy support
    allowedHosts: true,
    headers: {
      'Cache-Control': 'no-cache'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
})
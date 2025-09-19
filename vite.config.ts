import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
    watch: {
      // Exclude directories to prevent file descriptor overflow
      ignored: [
        '**/node_modules/**',
        '**/.cache/**',
        '**/dist/**',
        '**/build/**'
      ],
      usePolling: false
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    headers: {
      'Cache-Control': 'no-cache'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@server': path.resolve(__dirname, './server'),
    },
  },
})
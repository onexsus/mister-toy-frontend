import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build:{
    outDir:'../mister-toy-backend/public',
    chunkSizeWarningLimit: 1600,
    emptyOutDir: true
  }
})

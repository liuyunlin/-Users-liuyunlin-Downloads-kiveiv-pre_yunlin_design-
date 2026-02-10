import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic'
    }),
  ],
  esbuild: {
    jsx: 'automatic'
  },
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.min.js': 'pdfjs-dist/build/pdf.worker.mjs',
      'pdfjs-dist/build/pdf.worker.js': 'pdfjs-dist/build/pdf.worker.mjs',
      'pdfjs-dist/build/pdf': 'pdfjs-dist/build/pdf.mjs'
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.mjs']
  }
})

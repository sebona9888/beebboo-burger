import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Kun dogoggora 'process is not defined' jedhu si duraa fura
    'process.env': {}
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  VIT_BASE:'/Rahul-college-use/GECJ-TPO-2026.git',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/get':"http://localhost:3000"
    }
  }
})

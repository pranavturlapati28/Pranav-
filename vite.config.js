import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // root path for Vercel custom domain
  plugins: [react()],
})
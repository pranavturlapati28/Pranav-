import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Pranav-/', // GitHub repo name
  plugins: [react()],
})
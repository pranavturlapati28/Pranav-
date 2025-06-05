import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  base: '/', // or your repo name if deploying to user.github.io/repo
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
}
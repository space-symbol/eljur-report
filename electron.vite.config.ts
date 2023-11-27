import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    define: {
      __API__: JSON.stringify(`https://kmpo.eljur.ru/api`)
    },
    plugins: [
      react(),

    ],
    build: {
      sourcemap: process.env.NODE_ENV === 'development'
    }
  }
})

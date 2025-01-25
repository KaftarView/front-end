import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: parseInt(process.env.PREVIEW_PORT ?? "3000"),
    host: process.env.PREVIEW_HOST ?? "0.0.0.0",
    allowedHosts: ["frontend"]
  }
})

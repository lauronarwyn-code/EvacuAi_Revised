import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// To handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allows you to use '@' as a shortcut for the 'src' folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Port 5173 is the standard Vite port. 
    // Your backend CORS is configured to allow this specific port.
    port: 5173,
    // Automatically opens the browser when you start the server
    open: true,
    // Security setting to allow these hostnames to access the dev server
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'sb-4vd1f8enl72g.vercel.run',
      '.vercel.run',
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
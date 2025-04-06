import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,        // Listen on all network interfaces (0.0.0.0)
    port: 5173,        // Optional: explicitly set the port
    strictPort: true,  // Fail if port is already in use
    cors: true,         // Allow CORS for external access
    allowedHosts: [
      '8f4f-49-37-115-170.ngrok-free.app'
    ]
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        // Add your manifest configuration here
        name: 'News 2',
        short_name: 'News 2',
        description: 'Up to Date & Full of Anxiety',
        theme_color: '#000000',
        icons: [
          // Add your icon configurations here
        ]
      }
    })
  ],
})

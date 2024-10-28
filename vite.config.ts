import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";
import {registerSW} from 'virtual:pwa-register';

registerSW({immediate: true});

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      VitePWA({
         registerType: "autoUpdate",
         devOptions: {
            enabled: true,
         },
         manifest: {
            name: "News",
            short_name: "News",
            description: "Up to Date & Full of Anxiety",
            theme_color: "#ffffff",
            icons: [
               {
                  src: "/icon.jpeg",
                  sizes: "192x192",
                  type: "image/jpeg",
               },
               {
                  src: "/icon.jpeg",
                  sizes: "512x512",
                  type: "image/jpeg",
               },
            ],
         },
         workbox: {
            skipWaiting: true,
            clientsClaim: true,
            cleanupOutdatedCaches: true, // Cleans old caches
         },
      }),
   ],
});

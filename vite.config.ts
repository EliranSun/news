import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			devOptions: {
				enabled: true,
			},
			manifest: {
				name: "News",
				short_name: "News",
				description: "Up to Date & Full of Anxiety",
				// iOS and Android open start_url, not the page that was added to the
				// home screen. Without it the plugin defaults to "/", the app index.
				start_url: "/news",
				scope: "/",
				display: "standalone",
				theme_color: "#f5f1e8",
				background_color: "#f5f1e8",
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

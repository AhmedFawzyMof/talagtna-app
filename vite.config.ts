import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";
const CURRENT_VERSION = "1.5";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Talagtna | تالجتنا",
        short_name: "Talagtna | تالجتنا",
        start_url: "/?v=1.5",
        description: "Best place to buy frozen food",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/talgtna/img/new-192.png?v=1.5",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/talgtna/img/new-512.png?v=1.5",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/talgtna/img/new-512.png?v=1.5",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        cacheId: `Talagtna-${CURRENT_VERSION}`,
        clientsClaim: true,
        navigationPreload: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache-" + CURRENT_VERSION,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 3 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|gif|ico)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache-" + Date.now(),
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 3 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      filename: `sw-v${CURRENT_VERSION}.js`,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

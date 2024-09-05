import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Customize the file name patterns for JavaScript and CSS files
        entryFileNames: "assets/script.js",
        // chunkFileNames: "assets/[name]-custom-[hash].js",
        assetFileNames: ({ name }) => {
          if (name && name.endsWith(".css")) {
            return "assets/styles[extname]"
          }
          return "assets/[name][extname]"
        },
      },
    },
  },
})

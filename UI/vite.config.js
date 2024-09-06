import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    build: {
      sourcemap: true,
      // minify: mode === "production", // Only minify in production
      minify: "terser", // Use Terser for minification
      terserOptions: {
        ecma: 6,
        output: {
          ascii_only: true, // Ensure output is ASCII only
        },
        compress: {
          drop_console: mode === "production", // Drop console statements in production
          drop_debugger: mode === "production", // Drop debugger statements in production
        },
        // format: {
        //   comments: false, // Remove all comments
        // },
      },
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
    esbuild: {
      charset: "utf8", // Ensure esbuild outputs files in UTF-8
    },
  }
})

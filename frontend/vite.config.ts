import { defineConfig, loadEnv  } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default  ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3001,//parseInt(process.env.PORT),
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
      proxy: {
        // Proxy API requests to the backend
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue','.png','.jpeg','.jpg'],
    },
    build: {
      // Build Target
      // https://vitejs.dev/config/build-options.html#build-target
      target: 'esnext',
      // Minify option
      // https://vitejs.dev/config/build-options.html#build-minify
      minify: 'esbuild',
      // Rollup Options
      // https://vitejs.dev/config/build-options.html#build-rollupoptions
      rollupOptions: {
        output: {
          manualChunks: {
            // Split external library from transpiled code.
            react: [
              'react',
              'react-dom',
              'react-router-dom',
              'react-router',
              '@emotion/react',
              '@emotion/styled',
            ],
            mui: ['@mui/material', '@mui/icons-material'],
            mui_tables: ['mui-datatables'],
            axios: ['axios'],
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      coverage: {
        reporter: ['lcov', 'text-summary','text', 'json', 'html'],
      }
    },
  });
}

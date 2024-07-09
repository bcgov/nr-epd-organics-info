import { loadEnv, defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const define: Record<string, any> = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3001, //parseInt(process.env.PORT),
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
      watch: {
        ignored: ['**/coverage/**', '**/playwright-report/**'],
      },
    },
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
        '.png',
        '.svg',
        '.jpeg',
        '.jpg',
        '.ico',
      ],
    },
    assetsInclude: [
      '**/*.svg',
      '**/*.ico',
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
    ],
    build: {
      assetsInlineLimit: 0,
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
            axios: ['axios'],
            reactLeaflet: ['react-leaflet', 'react-leaflet-cluster'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            leaflet: ['leaflet'],
            rfdc: ['rfdc'],
          },
        },
      },
    },
    define,
    // @ts-ignore
    test: {
      exclude: ['**/node_modules/**', '**/e2e/**'],
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test-setup.ts',
      coverage: {
        reporter: ['lcov', 'text-summary', 'text', 'json', 'html'],
      },
    },
  })
}

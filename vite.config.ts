import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/quantum': resolve(__dirname, 'src/quantum'),
      '@/blockchain': resolve(__dirname, 'src/blockchain'),
      '@/crypto': resolve(__dirname, 'src/crypto'),
      '@/ui': resolve(__dirname, 'src/ui'),
      '@/utils': resolve(__dirname, 'src/utils'),
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quantum: resolve(__dirname, 'quantum.html'),
        demo: resolve(__dirname, 'demo.html')
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'crypto-js', 'mathjs']
  },
  define: {
    __QUANTUM_VERSION__: JSON.stringify('2.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})
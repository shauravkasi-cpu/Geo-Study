import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: {
    'import.meta.env.VITE_BUNDLE_SFX': JSON.stringify('true'),
  },
  build: {
    outDir: 'codehs',
    emptyOutDir: true,
    assetsInlineLimit: 1_000_000,
    rollupOptions: {
      input: 'index.codehs.html',
    },
  },
})

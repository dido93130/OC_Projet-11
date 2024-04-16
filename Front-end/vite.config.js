import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Configuration de Vite avec esbuild pour la minification
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    minify: 'esbuild',  // Utilise esbuild pour la minification du JavaScript et du CSS
    esbuild: {
      // Options spécifiques pour la minification
      minifyWhitespace: true,
      minifyIdentifiers: true,
      minifySyntax: true
    }
  }
});
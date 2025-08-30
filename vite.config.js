import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  
  // Optimisation du cache et des performances
  build: {
    rollupOptions: {
      output: {
        // Séparer les chunks pour un meilleur cache
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
        },
      },
    },
    // Améliorer la compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  
  // Configuration du serveur pour les headers de cache
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000', // 1 an pour les assets
    },
  },
  
  // Optimisation des assets
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
  
  // Préfetch des modules
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap'],
  },
})

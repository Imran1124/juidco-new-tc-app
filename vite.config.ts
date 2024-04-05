import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger']
  },

  // rollup
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom'],
          react: ['react', 'react-dom'],
          lodash: ['lodash'],
          moment: ['moment'],
          axios: ['axios'],
          tailwind: ['@material-tailwind/react'],
          reactQuery: ['react-query'],
          reactQueryDevtools: ['react-query/devtools'],
          heroicons: ['@heroicons/react'],
          headlessui: ['@headlessui/react'],
          reactIcons: ['react-icons']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
});

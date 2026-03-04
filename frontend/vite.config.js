import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const env = loadEnv(mode, '.', '');
  const devBackendUrl = env.VITE_DEV_BACKEND_URL || 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: devBackendUrl,
          changeOrigin: true,
          secure: false,
        },
        '/uploads': {
          target: devBackendUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  }
  // resolve: {
  //   alias: {
  //     '@components': path.resolve(__dirname, './src/components'),
  //     '@pages': path.resolve(__dirname, './src/pages'),
  //     '@assets': path.resolve(__dirname, './src/assets')
  //   }
  // }
});

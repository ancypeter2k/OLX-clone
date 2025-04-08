import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import flowbiteReact from 'flowbite-react/plugin/vite';

export default defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), flowbiteReact()],
});

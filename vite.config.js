import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/clother-site/",
  plugins: [react()],
  server: {
    host: true,
  }
});

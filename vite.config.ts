import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/critical-path-mapper/',
  plugins: [react()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitest from 'vitest';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});

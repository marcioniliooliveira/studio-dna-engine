import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'clientes/marcionilio-oliveira/site/assets/_astro',
    emptyOutDir: false,
    lib: {
      entry: path.resolve('src/components/WorkStage/mount.tsx'),
      name: 'WorkStage',
      formats: ['es'],
      fileName: () => 'workStage.bundle.js',
    },
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});

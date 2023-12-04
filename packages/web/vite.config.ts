/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import obfuscator from './vite_obfuscate_plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/web',
  build: { outDir: '' },
  base: './',
  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    react(),
    nxViteTsPaths(),
    obfuscator(),
    splitVendorChunkPlugin(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
});

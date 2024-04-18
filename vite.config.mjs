// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import ESLintPlugin from 'vite-plugin-eslint';
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), ESLintPlugin(), legacy()],
  base: './',
  // publicDir: true,
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 @ 别名为 src 目录的绝对路径

    },
  }
});

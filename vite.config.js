// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), legacy()],
  base: './',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 @ 别名为 src 目录的绝对路径
      '@images': path.resolve(__dirname, 'assets/images'),
    },
  },
});

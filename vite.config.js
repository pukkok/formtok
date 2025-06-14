import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'), // 선택: 절대경로 import 지원
  //   },
  // },
  server: {
    port: 5454,
  },
})
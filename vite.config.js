// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// export default defineConfig({
//   plugins: [react()],
//   base: process.env.NODE_ENV === 'production' ? '/AI_Trip_Planner/' : '/',
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),  // Alias for the `src` directory
    },
  },
});

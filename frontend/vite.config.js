// filepath: /c:/Users/TurismoProyect/Documents/GatilinDigital/be_recolectores_desechos/frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss7-compat';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
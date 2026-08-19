import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://skazmasters.github.io',
  trailingSlash: 'always',
  outDir: 'build',
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})

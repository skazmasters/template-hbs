import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import site from './src/data/site.json' with { type: 'json' }

export default defineConfig({
  site: site.site,
  base: site.base,
  trailingSlash: 'always',
  outDir: 'build',
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})

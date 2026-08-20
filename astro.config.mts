// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [react(), markdoc()],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server'
})

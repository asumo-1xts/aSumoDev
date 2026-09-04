import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const hero = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/hero' }),
  schema: ({ image }) =>
    z.object({
      message: z.string().optional(),
      avatar: image(),
      name: z.string(),
      title: z.string(),
      location: z.string().optional(),
      email: z.string(),
      discord: z.string(),
      socialLinks: z.array(
        z.object({
          url: z.url(),
          icon: z.string(),
          label: z.string()
        })
      )
    })
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      sourceLink: z.url(),
      featured: z.boolean().default(false)
    })
})

export const collections = { hero, projects }

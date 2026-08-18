import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

// Hero singleton
const hero = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc,yaml}', base: './src/content/hero' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      description: z.string(),
      avatar: image(),
      location: z.string().optional(),
      socialLinks: z.array(
        z.object({
          url: z.string(),
          icon: z.enum([
            'GitHub',
            'LinkedIn',
            'Twitter',
            'Bluesky',
            'Instagram',
            'YouTube',
            'Email',
            'FolderCode'
          ]),
          label: z.string()
        })
      )
    })
})

// Projects collection
const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdoc,yaml}',
    base: './src/content/projects'
  }),
  schema: ({ image }) =>
    z.object({
      featured: z.boolean().optional().default(false),
      category: z.string().optional(),
      title: z.string(),
      description: z.string(),
      image: image(),
      demoLink: z.url().optional(),
      sourceLink: z.url().optional()
    })
})

// General singleton
const general = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdoc,yaml}',
    base: './src/content/general'
  }),
  schema: z.object({
    extraLinksEnabled: z.boolean(),
    extraLinks: z.array(
      z.object({
        link: z.string(),
        icon: z.enum([
          'Flower2',
          'BookOpen',
          'FileText',
          'CodeXml',
          'Mail',
          'Home',
          'User',
          'Briefcase',
          'GraduationCap',
          'Link'
        ]),
        label: z.string()
      })
    ),
    showProjectsSection: z.boolean(),
    projectsLayout: z
      .enum(['grid', 'tabs-horizontal', 'tabs-vertical'])
      .optional()
      .default('grid')
  })
})

export const collections = {
  hero,
  projects,
  general
}

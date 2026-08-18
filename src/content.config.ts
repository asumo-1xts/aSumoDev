import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const contentSidebarSchema = z
  .object({
    discriminant: z.boolean(),
    value: z
      .object({
        show: z.boolean().optional().default(true),
        position: z.enum(['left', 'right']).optional().default('right')
      })
      .nullable()
      .optional()
  })
  .optional()

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

// Project Categories collection
const projectCategories = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdoc,yaml}',
    base: './src/content/projectCategories'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    sortOrder: z.number().optional().default(0)
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
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      demoLink: z.url().optional(),
      sourceLink: z.url().optional(),
      contentSidebar: contentSidebarSchema
    })
})

// Blog collection
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc,yaml}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      published: z.boolean().optional().default(true),
      title: z.string(),
      description: z.string(),
      image: image(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      contentSidebar: contentSidebarSchema
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
        label: z.string(),
        displayOn: z.enum(['both', 'dock', 'fab']).optional().default('both')
      })
    ),
    showProjectsSection: z.boolean(),
    projectsLayout: z
      .enum(['grid', 'tabs-horizontal', 'tabs-vertical'])
      .optional()
      .default('grid'),
    showContentSidebar: z.boolean().optional().default(true),
    contentSidebarPosition: z
      .enum(['left', 'right'])
      .optional()
      .default('right')
  })
})

export const collections = {
  hero,
  projectCategories,
  projects,
  blog,
  general
}

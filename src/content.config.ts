import { defineCollection, z } from 'astro:content'

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    authorUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    websiteUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    logo: z.string().optional(),
    category: z.enum([
      'CLI',
      'Web',
      'Mobile',
      'API',
      'Library',
      'Framework',
      'DevTool',
      'Data',
      'AI/ML',
      'IoT',
      'Game',
      'Other'
    ]).default('Other'),
    featured: z.boolean().default(false),
    sponsor: z.boolean().default(false),
    publishDate: z.coerce.date(),
  }),
})

export const collections = { projects }

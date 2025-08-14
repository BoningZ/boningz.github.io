import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        category: z.enum(['tech', 'devlog', 'life', 'emotion']),
        pinned: z.boolean().optional(),
        description: z.string().optional()
      })
    }),
    gallery: defineCollection({
      type: 'data',
      source: 'gallery/**/*.json',
      schema: z.object({
        slug: z.string(),
        date: z.string(),
        location: z.string(),
        caption: z.string().optional(),
        image: z.string()
      })
    })
  }
})



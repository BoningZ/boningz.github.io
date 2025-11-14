// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync } from 'fs'
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content'
  ],
  css: [
    '@/assets/css/main.css'
  ],
  nitro: {
    prerender: {
      routes: [
        ...readdirSync(resolve('./content/posts'))
          .filter(file => file.endsWith('.md'))
          .map(file => `/posts/${file.replace('.md', '')}`),
        ...readdirSync(resolve('./content/gallery'))
          .filter(file => file.endsWith('.md'))
          .map(file => `/gallery/${file.replace('.md', '')}`)
      ]
    }
  },
  content: {
    experimental: {
      stripQueryParameters: true
    },
    build: {
      markdown: {
        remarkPlugins: {
          'remark-math': {},
          'remark-gfm': { singleTilde: false }
        } as any,
        rehypePlugins: {
          'rehype-katex': {}
        } as any,
        highlight: {
          theme: {
            default: 'one-dark-pro',
            dark: 'one-dark-pro',
            light: 'min-light'
          },
          langs: ['qml', 'ini']
        }
      }
    },
    renderer: {
      anchorLinks: false
    }
  },
  app: {
    head: {
      title: '陋室',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '基于 Nuxt 与 Markdown 的个人博客' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css' }
      ]
    }
  }
})

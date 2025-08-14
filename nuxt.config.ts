// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content'
  ],
  css: [
    '@/assets/css/main.css'
  ],
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['typescript', 'bash', 'json', 'markdown']
    }
  },
  app: {
    head: {
      title: '我的个人博客',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '基于 Nuxt 与 Markdown 的个人博客' }
      ]
    }
  }
})

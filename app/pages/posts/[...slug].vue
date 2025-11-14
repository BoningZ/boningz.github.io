<template>
  <article v-if="doc && doc.title" class="container glass card is-article-cover" :style="coverVars(doc.cover)">
    <header>
      <h1>{{ doc.title }}</h1>
      <div class="muted" style="margin:6px 0 6px;">{{ doc.date }} · {{ categoryZh(doc.category) }}</div>
      <div v-if="doc.description" class="muted" style="margin:0 0 16px;">{{ doc.description }}</div>
    </header>
    <ContentRenderer :value="doc" />
  </article>
  <div v-else class="container">
    <p>文章加载中...</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ key: (route) => route.fullPath })
import { useCategory } from '../../../composables/useCategory'
const route = useRoute()
const slug = route.params.slug as string[]
const path = slug.join('/')

const { data } = await useAsyncData(
  `post-detail-${path}`,
  async () => {
    const rows = await queryCollection('posts')
      .where('path', '=', `/posts/${path}`)
      .limit(1)
      .all()
    return JSON.parse(JSON.stringify(rows?.[0] || null))
  }
)
const doc = computed(() => data.value || {})

const { categoryLabel: categoryZh } = useCategory()

function coverVars(cover?: string){
  if(!cover) return { padding: '24px' } as any
  const url = cover.startsWith('/') ? cover : `/covers/${cover}`
  return { '--cover-url': `url('${url}')`, padding: '24px' } as any
}
</script>


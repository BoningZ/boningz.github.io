<template>
  <article v-if="doc && doc.title" class="container glass card is-article-cover" :style="coverVars(doc.cover)">
    <header>
      <h1>{{ doc.title }}</h1>
      <div class="muted" style="margin:6px 0 6px;">{{ doc.date }} · {{ categoryZh(doc.category) }}</div>
      <div v-if="doc.description" class="muted" style="margin:0 0 16px;">{{ doc.description }}</div>
    </header>
    <ContentRenderer :value="doc" />
  </article>
  <div v-else-if="loading" class="container">
    <p>文章加载中...</p>
  </div>
  <div v-else class="container">
    <p>文章未找到</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ key: (route) => route.fullPath })
import { useCategory } from '../../../composables/useCategory'
const route = useRoute()
const slug = route.params.slug as string[]
const path = slug.join('/')

// 使用客户端数据获取，避免预渲染问题
const doc = ref(null)
const loading = ref(true)

const { categoryLabel: categoryZh } = useCategory()

// 在客户端获取数据
onMounted(async () => {
  try {
    // 移除末尾斜杠进行匹配
    const searchPath = `/posts/${path}`.replace(/\/$/, '')

    const rows = await queryCollection('posts')
      .where('path', '=', searchPath)
      .limit(1)
      .all()

    doc.value = rows?.[0] || null
  } catch (error) {
    console.error('Failed to load post:', error)
  } finally {
    loading.value = false
  }
})

function coverVars(cover?: string){
  if(!cover) return { padding: '24px' } as any
  const url = cover.startsWith('/') ? cover : `/covers/${cover}`
  return { '--cover-url': `url('${url}')`, padding: '24px' } as any
}
</script>


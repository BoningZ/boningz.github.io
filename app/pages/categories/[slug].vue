<template>
  <div class="container grid" style="gap:16px;">
    <section class="glass card">
      <h1>{{ categoryMeta.title }}</h1>
      <p class="muted">{{ categoryMeta.signature }}</p>
    </section>

    <section class="glass card">
      <div class="grid">
        <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="post-item glass">
          <h3 style="color: var(--fg);">{{ post.title }}</h3>
          <div class="muted">{{ post.date }}</div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCategory } from '../../../composables/useCategory'
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { categoryLabel } = useCategory()
const CATEGORY_META: Record<string, { title: string; signature: string }> = {
  tech: { title: categoryLabel('tech'), signature: '以工程方法探索技术的边界。' },
  devlog: { title: categoryLabel('devlog'), signature: '记录问题、思考与修复。' },
  life: { title: categoryLabel('life'), signature: '在日常中感受微小之美。' },
  emotion: { title: categoryLabel('emotion'), signature: '用文字收纳情绪与故事。' }
}

const categoryMeta = computed(() => CATEGORY_META[slug.value] || { title: slug.value, signature: '' })
const { data } = await useAsyncData('category-posts', async () => {
  const rows = await queryCollection('posts').where('category', '=', slug.value as string).order('date', 'DESC').all()
  return JSON.parse(JSON.stringify(rows))
})
const posts = computed(() => data.value || [])
</script>


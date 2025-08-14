<template>
  <article class="container glass card" style="padding:24px;">
    <header>
      <h1>{{ doc.title }}</h1>
      <div class="muted" style="margin:6px 0 6px;">{{ doc.date }} · {{ categoryZh(doc.category) }}</div>
      <div v-if="doc.description" class="muted" style="margin:0 0 16px;">{{ doc.description }}</div>
    </header>
    <ContentRenderer :value="doc" />
  </article>
</template>

<script setup lang="ts">
definePageMeta({ key: (route) => route.fullPath })
import { useCategory } from '../../../composables/useCategory'
const route = useRoute()
const currentPath = computed(() => String(route.path))
const { data } = await useAsyncData(
  () => `post-detail-${currentPath.value}`,
  async () => {
    const rows = await queryCollection('posts')
      .where('path', '=', currentPath.value)
      .limit(1)
      .all()
    return JSON.parse(JSON.stringify(rows?.[0] || null))
  },
  { watch: [currentPath] }
)
const doc = computed(() => data.value || {})

const { categoryLabel: categoryZh } = useCategory()
</script>


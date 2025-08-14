<template>
  <div class="container glass card">
    <h1>归档</h1>
    <div class="grid" style="margin-top:12px;">
      <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="post-item glass">
        <h3 style="color: var(--fg);">{{ post.title }}</h3>
        <div class="muted">{{ post.date }} · {{ post.category }}</div>
        <div v-if="post.description" class="muted" style="margin-top:4px;">{{ post.description }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('archive-posts', async () => {
  const rows = await queryCollection('posts').order('date', 'DESC').all()
  return JSON.parse(JSON.stringify(rows))
})
const posts = computed(() => data.value || [])
</script>



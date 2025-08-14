<template>
  <article class="container glass card" style="padding:24px;">
    <header>
      <h1>{{ doc.title }}</h1>
      <div class="muted" style="margin:6px 0 16px;">{{ doc.date }} · {{ doc.category }}</div>
    </header>
    <ContentRenderer :value="doc" />
  </article>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`post-${path}`, async () => {
  const item = await queryCollection('posts').path(path).first()
  return JSON.parse(JSON.stringify(item))
})
const doc = computed(() => data.value || {})
</script>


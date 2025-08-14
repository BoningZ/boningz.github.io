<template>
  <div class="container">
    <h1>摄影作品</h1>
    <div class="gallery-grid" style="margin-top:12px;">
      <div v-for="photo in photos" :key="photo.slug" class="gallery-item">
        <img :src="photo.image" :alt="photo.caption || photo.location" />
        <div class="meta">
          <div>{{ photo.location }}</div>
          <div class="muted">{{ photo.caption }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('gallery-all', async () => {
  const rows = await queryCollection('gallery').order('date', 'DESC').all()
  return JSON.parse(JSON.stringify(rows))
})
const photos = computed(() => data.value || [])
</script>


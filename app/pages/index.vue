<template>
  <div class="container grid" style="gap:24px;">
    <section class="hero glass">
      <h1>欢迎来到我的博客</h1>
      <p>记录：技术分享、开发日志、生活随想、情感电台，以及摄影作品集。</p>
    </section>

    <section class="grid cols-3">
      <div class="glass card">
        <h2>最近文章</h2>
        <div class="grid">
          <NuxtLink v-for="post in recentPosts" :key="post.path" :to="post.path" class="post-item glass">
            <h3 style="color: var(--fg);">{{ post.title }}</h3>
            <div class="muted">{{ post.date }} · {{ categoryZh(post.category) }}</div>
          </NuxtLink>
        </div>
      </div>

      <div class="glass card">
        <h2>置顶文章</h2>
        <div class="grid">
          <NuxtLink v-for="post in pinnedPosts" :key="post.path" :to="post.path" class="post-item glass">
            <h3 style="color: var(--fg);">{{ post.title }}</h3>
            <div class="muted">{{ post.date }} · {{ categoryZh(post.category) }}</div>
          </NuxtLink>
        </div>
      </div>

      <div class="glass card">
        <h2>个人简介</h2>
        <p class="muted">热爱全栈开发与影像创作，关注可维护性与用户体验。这里是我的知识笔记与生活记录。</p>
        <div style="margin-top:8px;">
          <a href="https://github.com/boningz" target="_blank" class="muted">GitHub</a>
          ·
          <NuxtLink to="/about" class="muted">更多</NuxtLink>
        </div>
      </div>
    </section>

    <section class="glass card">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap: wrap;">
        <h2>摄影作品</h2>
        <NuxtLink to="/gallery" class="muted">查看全部 →</NuxtLink>
      </div>
      <div class="gallery-grid" style="margin-top:12px;">
        <div v-for="photo in topPhotos" :key="photo.slug" class="gallery-item">
          <img :src="photo.image" :alt="photo.caption || photo.location" />
          <div class="meta">
            <div>{{ photo.location }}</div>
            <div class="muted">{{ photo.caption }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script setup lang="ts">
import { useCategory } from '../../composables/useCategory'
const { data: recent } = await useAsyncData('recent-posts', async () => {
  const rows = await queryCollection('posts').order('date', 'DESC').all()
  return JSON.parse(JSON.stringify(rows))
})
const { data: pinned } = await useAsyncData('pinned-posts', async () => {
  const rows = await queryCollection('posts').where('pinned', '=', true).order('date', 'DESC').all()
  return JSON.parse(JSON.stringify(rows))
})
const { data: gallery } = await useAsyncData('gallery', async () => {
  const rows = await queryCollection('gallery').order('date', 'DESC').all()
  return JSON.parse(JSON.stringify(rows))
})

const recentPosts = computed(() => recent.value || [])
const pinnedPosts = computed(() => pinned.value || [])
const photos = computed(() => Array.isArray(gallery.value) ? gallery.value : [])
const topPhotos = computed(() => photos.value.slice(0, 6))

const { categoryLabel: categoryZh } = useCategory()
</script>


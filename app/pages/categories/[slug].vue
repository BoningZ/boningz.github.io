<template>
  <div class="container grid" style="gap:16px;">
    <section class="glass card">
      <h1>{{ categoryMeta.title }}</h1>
      <p class="muted">{{ categoryMeta.signature }}</p>
    </section>

    <section class="glass card">
      <div class="grid">
        <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="post-item glass has-cover" :style="coverVars(post.cover)">
          <h3 style="color: var(--fg);">{{ post.title }}</h3>
          <div class="muted">{{ post.date }}</div>
          <div v-if="post.description" class="muted" style="margin-top:4px;">{{ post.description }}</div>
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
  algorithm: { title: categoryLabel('algorithm'), signature: '……他们恢复了调查信标的数据链，并重新启用了那些在他们退缩到目前边境之时废弃的侦察哨站。情报显示，他们的意图是重新回到银河系这张大棋盘上。……舰队正在集结，军队已经下达了征召令，那些古老的工厂再一次发出轰鸣声。……' },
  devlog: { title: categoryLabel('devlog'), signature: '记录问题、思考与修复。' },
  life: { title: categoryLabel('life'), signature: '在日常中感受微小之美。' },
  emotion: { title: categoryLabel('emotion'), signature: '用文字收纳情绪与故事。' }
}

const categoryMeta = computed(() => CATEGORY_META[slug.value] || { title: slug.value, signature: '' })
const { data } = await useAsyncData(
  () => `category-posts-${slug.value}`,
  async () => {
    const rows = await queryCollection('posts')
      .where('category', '=', slug.value as string)
      .order('date', 'DESC')
      .all()
    return JSON.parse(JSON.stringify(rows))
  },
  { watch: [slug] }
)
const posts = computed(() => data.value || [])

function coverVars(cover?: string){
  if(!cover) return {}
  const url = cover.startsWith('/') ? cover : `/covers/${cover}`
  return { '--cover-url': `url('${url}')` } as any
}
</script>


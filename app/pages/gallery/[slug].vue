<template>
  <div class="container">
    <article class="glass card is-article-cover" :style="coverVars(doc?.image)">
      <header>
        <h1>{{ titleText }}</h1>
        <div class="muted" style="margin:6px 0 12px;">{{ doc?.location }} · {{ doc?.date }}</div>
      </header>
      <img :src="doc?.image" :alt="doc?.caption" style="width:100%;border-radius:12px;border:1px solid var(--glass-border);" />
      <div class="muted" style="margin-top:8px;">{{ doc?.caption }}</div>
      <div style="margin-top:16px;">
        <ContentRenderer v-if="mdDoc" :value="mdDoc" />
        <div v-else class="muted">暂无详情。</div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ key: (route) => route.fullPath })
const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data } = await useAsyncData(
  () => `gallery-${slug.value}`,
  async () => {
    const rows = await queryCollection('gallery')
      .where('slug', '=', slug.value)
      .limit(1)
      .all()
    return JSON.parse(JSON.stringify(rows?.[0] || null))
  },
  { watch: [slug] }
)
const doc = computed(() => data.value as any)
const titleText = computed(() => doc.value?.caption || doc.value?.location || doc.value?.slug || '摄影作品')
const { data: mdData } = await useAsyncData(
  () => `gallery-md-${slug.value}`,
  async () => {
    const rows = await queryCollection('gallery_md')
      .where('path', '=', `/gallery-md/${slug.value}`)
      .limit(1)
      .all()
    return JSON.parse(JSON.stringify(rows?.[0] || null))
  },
  { watch: [slug] }
)
const mdDoc = computed(() => mdData.value as any)

function coverVars(src?: string){
  if(!src) return {}
  return { '--cover-url': `url('${src}')` } as any
}
</script>



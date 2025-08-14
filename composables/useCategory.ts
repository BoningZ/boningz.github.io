export type CategoryKey = 'tech' | 'devlog' | 'life' | 'emotion' | 'algorithm' | string

export const CATEGORY_LABEL: Record<string, string> = {
  tech: '技术分享',
  devlog: '开发日志',
  life: '生活随想',
  emotion: '情感电台',
  algorithm: '传统算法'
}

export function categoryLabel(key?: CategoryKey): string {
  if (!key) return ''
  return CATEGORY_LABEL[key] || String(key)
}

export const useCategory = () => ({ CATEGORY_LABEL, categoryLabel })

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import { useSearchDialog } from '../composables/useSearchDialog'

const route = useRoute()
const { toggle: toggleSearch } = useSearchDialog()

const mainNavItems = [
  { label: '专业介绍', to: '/about-major' },
  { label: '企业名录', to: '/companies' },
  { label: '院校一览', to: '/universities' },
  { label: '考研方向', to: '/graduate' },
  { label: '关于', to: '/about' },
]

const contextLink = computed(() => {
  if (/^\/companies\/\d+/.test(route.path)) {
    return { label: '返回企业列表', to: '/companies' }
  }

  if (route.path.startsWith('/universities/') && route.path !== '/universities') {
    return { label: '返回院校列表', to: '/universities' }
  }

  if (route.name === 'not-found') {
    return { label: '返回首页', to: '/' }
  }

  return null
})

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

function onKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault()
    toggleSearch()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeyDown)
  }
})
</script>

<template>
  <header
    class="site-nav sticky top-0 z-[60] w-full border-b backdrop-blur-xl"
    :style="{
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow)',
    }"
  >
    <div
      class="mx-auto max-w-6xl px-4 py-2.5 flex min-w-0 flex-wrap items-center gap-2 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-3"
    >
      <div class="flex min-w-0 flex-wrap items-center gap-2 md:justify-self-start lg:flex-nowrap">
        <RouterLink
          to="/"
          class="inline-flex shrink-0 items-center rounded-lg px-3 py-1.5 text-sm font-semibold transition hover:text-[var(--accent)]"
          :style="{
            color: route.path === '/' ? 'var(--accent)' : 'var(--text-primary)',
          }"
        >
          弹药工程导航
        </RouterLink>

        <RouterLink
          v-if="contextLink"
          :to="contextLink.to"
          class="inline-flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:text-[var(--accent)]"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }"
        >
          <span class="text-base leading-none text-[var(--accent)]" aria-hidden="true">&larr;</span>
          {{ contextLink.label }}
        </RouterLink>
      </div>

      <nav class="order-3 w-full min-w-0 overflow-x-auto md:order-none md:w-auto md:justify-self-center" aria-label="全站主导航">
        <div class="flex w-max min-w-full items-center gap-1 md:min-w-0 md:justify-center">
          <RouterLink
            v-for="item in mainNavItems"
            :key="item.to"
            :to="item.to"
            class="shrink-0 rounded-lg px-2 py-1.5 text-[13px] font-medium transition hover:-translate-y-0.5 sm:px-3 sm:text-sm"
            :style="{
              backgroundColor: isActive(item.to) ? 'var(--accent-soft)' : 'transparent',
              color: isActive(item.to) ? 'var(--accent)' : 'var(--text-secondary)',
            }"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-2 md:ml-0 md:justify-self-end">
        <button
          type="button"
          class="flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition hover:scale-[1.03]"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }"
          aria-label="全站搜索"
          title="全站搜索 (Ctrl/⌘ + K)"
          @click="toggleSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" class="h-4.5 w-4.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span class="hidden sm:inline">搜索</span>
          <kbd
            class="ml-0.5 hidden rounded border px-1 py-0.5 text-[10px] leading-none md:inline"
            :style="{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', backgroundColor: 'var(--surface)' }"
          >
            ⌘K
          </kbd>
        </button>

        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-nav nav {
  scrollbar-width: none;
}

.site-nav nav::-webkit-scrollbar {
  display: none;
}
</style>

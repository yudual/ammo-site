<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import { useSearchDialog } from '../composables/useSearchDialog'

const route = useRoute()
const { toggle: toggleSearch } = useSearchDialog()
const lastCompanyList = ref('/companies')
const lastUniversityList = ref('/universities')

const mainNavItems = [
  { label: '专业介绍', to: '/about-major' },
  { label: '企业名录', to: '/companies' },
  { label: '院校一览', to: '/universities' },
  { label: '考研方向', to: '/graduate' },
  { label: '关于', to: '/about' },
]

const contextLink = computed(() => {
  if (/^\/companies\/\d+/.test(route.path)) {
    return { label: '返回企业列表', to: lastCompanyList.value }
  }

  if (route.path.startsWith('/universities/') && route.path !== '/universities') {
    return { label: '返回院校列表', to: lastUniversityList.value }
  }

  if (route.name === 'not-found') {
    return { label: '返回首页', to: '/' }
  }

  return null
})

watch(
  () => route.fullPath,
  (fullPath) => {
    if (route.path === '/companies') {
      lastCompanyList.value = fullPath
    } else if (route.path === '/universities') {
      lastUniversityList.value = fullPath
    }
  },
  { immediate: true },
)

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
    lastCompanyList.value = sessionStorage.getItem('ammo:last-list:companies') || '/companies'
    lastUniversityList.value = sessionStorage.getItem('ammo:last-list:universities') || '/universities'
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
    class="site-nav sticky top-0 z-[60] w-full border-b backdrop-blur-xl transition-colors duration-200"
    :style="{
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow)',
    }"
  >
    <div
      class="site-nav-shell mx-auto max-w-6xl px-3.5 py-2.5 flex min-w-0 flex-wrap items-center justify-between gap-2 sm:px-6 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4"
    >
      <!-- 左侧：品牌 Logo 与上下文返回按钮 -->
      <div class="flex min-w-0 flex-wrap items-center gap-2 md:justify-self-start lg:flex-nowrap">
        <RouterLink
          to="/"
          class="group inline-flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-bold tracking-tight transition hover:text-[var(--accent)]"
          :style="{
            color: route.path === '/' ? 'var(--accent)' : 'var(--text-primary)',
          }"
        >
          <span
            class="flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-black transition group-hover:scale-105 group-hover:bg-[var(--accent)] group-hover:text-white"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--accent)',
            }"
          >
            弹
          </span>
          <span class="tracking-tight font-extrabold text-[15px]">弹药导航</span>
        </RouterLink>

        <RouterLink
          v-if="contextLink"
          :to="contextLink.to"
          class="inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition hover:-translate-y-0.5 hover:text-[var(--accent)] sm:px-3 sm:py-1.5 sm:text-xs"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }"
        >
          <span class="text-sm leading-none text-[var(--accent)]" aria-hidden="true">&larr;</span>
          <span>{{ contextLink.label }}</span>
        </RouterLink>
      </div>

      <!-- 中间：全站主导航 -->
      <nav class="site-main-nav order-3 w-full min-w-0 overflow-x-auto md:order-none md:w-auto md:justify-self-center no-scrollbar" aria-label="全站主导航">
        <div class="flex w-max min-w-full items-center gap-1 rounded-xl p-1 md:min-w-0 md:justify-center md:bg-[var(--surface-muted)]/50 md:border md:border-[var(--border)]">
          <RouterLink
            v-for="item in mainNavItems"
            :key="item.to"
            :to="item.to"
            class="shrink-0 rounded-lg px-3 py-1.5 text-xs sm:text-[13px] font-semibold transition duration-150"
            :style="{
              backgroundColor: isActive(item.to) ? 'var(--surface-strong)' : 'transparent',
              color: isActive(item.to) ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: isActive(item.to) ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
            }"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>

      <!-- 右侧：全站搜索与主题切换 -->
      <div class="ml-auto flex shrink-0 items-center gap-2 md:ml-0 md:justify-self-end">
        <button
          type="button"
          class="group flex h-9 sm:h-10 shrink-0 items-center gap-2 rounded-full border px-3 sm:px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 hover:border-[var(--accent-border)] hover:scale-105 active:scale-95 cursor-pointer select-none"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--glass-shadow)',
          }"
          aria-label="全站搜索"
          title="全站搜索 (Ctrl/⌘ + K)"
          @click="toggleSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:rotate-12 text-[var(--accent)]">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span class="text-xs font-semibold group-hover:text-[var(--text-primary)] transition-colors">搜索</span>
          <kbd
            class="ml-0.5 hidden rounded-md border px-1.5 py-0.5 text-[10px] font-mono leading-none md:inline group-hover:border-[var(--accent-border)] transition-colors"
            :style="{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', backgroundColor: 'var(--surface-muted)' }"
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

@media (max-width: 767px) {
  .site-nav-shell {
    padding-top: 0.5rem;
    padding-bottom: 0.4rem;
  }
  .site-main-nav {
    margin-inline: -0.875rem;
    width: calc(100% + 1.75rem);
    padding: 0.25rem 0.875rem 0.1rem;
    border-top: 1px solid var(--border);
  }
  .site-main-nav > div {
    min-width: max-content;
    background: transparent;
    border: none;
    padding: 0;
  }
}
</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import SiteNav from './components/SiteNav.vue'
import BackToTop from './components/BackToTop.vue'
import GlobalSearch from './components/GlobalSearch.vue'

const route = useRoute()
const currentYear = new Date().getFullYear()
</script>

<template>
  <a href="#app-main" class="skip-link">跳到主内容</a>
  <SiteNav />
  <main id="app-main" tabindex="-1">
    <router-view v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </main>
  <footer class="site-footer border-t border-[var(--border)]">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-[var(--text-secondary)] sm:px-6 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <RouterLink to="/about" class="transition hover:text-[var(--accent)]">关于导航站</RouterLink>
        <a href="mailto:ty368685189@gmail.com" class="transition hover:text-[var(--accent)]">提供线索 / 联系作者</a>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-[var(--text-tertiary)]">
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=34120402001607"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
        >
          <img src="/beian-icon.png" alt="公安备案图标" class="h-4 w-4 object-contain" />
          <span>皖公网安备34120402001607号</span>
        </a>
        <span>© {{ currentYear }} 弹药工程与爆炸技术导航站</span>
      </div>
    </div>
  </footer>
  <BackToTop />
  <GlobalSearch />
</template>

<style>
/* 无障碍：跳到主内容。仅键盘聚焦时显现 */
.skip-link {
  position: fixed;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--border);
  border-top: none;
  border-bottom-right-radius: 0.6rem;
  background-color: var(--surface-strong);
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: var(--glass-shadow);
}
.skip-link:focus {
  left: 0;
  outline: none;
}
.skip-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 全局路由过渡：轻量淡入位移，避免整页硬切 */
.page-enter-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.page-leave-active {
  transition: none;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active {
    transition: opacity 0.12s ease;
  }
  .page-leave-active {
    transition: none;
  }
  .page-enter-from,
  .page-leave-to {
    transform: none;
    opacity: 0;
  }
}
</style>

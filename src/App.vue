<script setup lang="ts">
import { useRoute } from 'vue-router'
import SiteNav from './components/SiteNav.vue'
import BackToTop from './components/BackToTop.vue'
import GlobalSearch from './components/GlobalSearch.vue'

const route = useRoute()
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

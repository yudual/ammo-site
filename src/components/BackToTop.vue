<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const visible = ref(false)
let ticking = false

function handleScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    const y = window.scrollY || document.documentElement.scrollTop || 0
    visible.value = y > 600
    ticking = false
  })
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function scrollToTop() {
  if (prefersReducedMotion()) {
    window.scrollTo(0, 0)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function bind() {
  if (typeof window === 'undefined') return
  window.addEventListener('scroll', handleScroll, { passive: true })
}

function unbind() {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', handleScroll)
}

onMounted(() => {
  bind()
  handleScroll()
})

onUnmounted(unbind)

// 路由切换后先隐藏，待滚动判定再决定是否出现
watch(
  () => route.fullPath,
  () => {
    visible.value = false
  },
)
</script>

<template>
  <Transition name="backtotop">
    <button
      v-if="visible"
      type="button"
      class="back-to-top"
      :style="{
        backgroundColor: 'var(--surface-strong)',
        borderColor: 'var(--border)',
        color: 'var(--text-primary)',
        boxShadow: 'var(--glass-shadow)',
      }"
      aria-label="返回顶部"
      title="返回顶部"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="h-5 w-5"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1rem;
  bottom: 1.25rem;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  border: 1px solid;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (min-width: 768px) {
  .back-to-top {
    right: 1.5rem;
    bottom: 1.75rem;
  }
}

.back-to-top:hover {
  transform: translateY(-2px);
}

.back-to-top:active {
  transform: translateY(0);
}

.back-to-top:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.backtotop-enter-active,
.backtotop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.backtotop-enter-from,
.backtotop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .back-to-top {
    transition: none;
  }
  .backtotop-enter-active,
  .backtotop-leave-active {
    transition: opacity 0.12s ease;
  }
  .backtotop-enter-from,
  .backtotop-leave-to {
    transform: none;
  }
}
</style>
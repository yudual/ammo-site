<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const progress = ref(0)
let ticking = false

function compute() {
  const doc = document.documentElement
  const scrollTop = window.scrollY || doc.scrollTop || 0
  const max = (doc.scrollHeight - window.innerHeight) || 0
  progress.value = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    compute()
    ticking = false
  })
}

function bind() {
  if (typeof window === 'undefined') return
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
}

function unbind() {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
}

onMounted(() => {
  bind()
  compute()
})

onUnmounted(unbind)

// 路由切换后重算（内容高度变化）
void route.fullPath
</script>

<template>
  <div class="reading-progress" aria-hidden="true">
    <div
      class="reading-progress-bar"
      :style="{ transform: 'scaleX(' + progress + ')' }"
    ></div>
  </div>
</template>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 70;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--accent) 14%, transparent);
}

.reading-progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left center;
  transform: scaleX(0);
  background-image: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #d18b5f));
  transition: transform 0.12s linear;
  box-shadow: 0 0 6px color-mix(in srgb, var(--accent) 50%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .reading-progress-bar {
    transition: none;
  }
}
</style>
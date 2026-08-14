<script setup lang="ts">
import { useRoute } from 'vue-router'

type NavItem = {
  label: string
  to: string
}

defineProps<{
  items: NavItem[]
  ariaLabelText: string
}>()

const route = useRoute()
</script>

<template>
  <div class="topic-nav-shell mx-auto mb-6 w-full max-w-6xl">
    <div
      class="flex w-full min-w-0 items-center overflow-x-auto rounded-2xl border p-1.5 no-scrollbar"
      :style="{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--glass-shadow)',
      }"
    >
      <nav
        class="flex min-w-full sm:min-w-0 items-center gap-1.5 justify-start sm:justify-center px-1 py-0.5"
        :aria-label="ariaLabelText"
      >
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="shrink-0 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition duration-150"
          :style="{
            backgroundColor: route.path === item.to ? 'var(--surface-strong)' : 'transparent',
            color: route.path === item.to ? 'var(--accent)' : 'var(--text-secondary)',
            boxShadow: route.path === item.to ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
            border: route.path === item.to ? '1px solid var(--border)' : '1px solid transparent',
          }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

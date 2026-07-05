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
  <header
    class="relative z-30 mx-auto mb-5 w-full max-w-6xl border-y px-0 py-2 backdrop-blur-xl md:mb-6 md:w-fit md:rounded-lg md:border md:px-3"
    :style="{
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow)',
    }"
  >
    <div class="flex min-w-0 items-center gap-2">
      <nav class="w-full min-w-0 overflow-x-auto" :aria-label="ariaLabelText">
        <div class="flex w-max min-w-full items-center gap-2 md:min-w-0">
          <RouterLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="shrink-0 rounded-lg px-2.5 py-1.5 text-[13px] transition hover:-translate-y-0.5 sm:text-sm md:px-3"
            :style="{
              backgroundColor: route.path === item.to ? 'var(--accent-soft)' : 'var(--surface-strong)',
              color: route.path === item.to ? 'var(--accent)' : 'var(--text-secondary)',
            }"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav {
  scrollbar-width: none;
}

nav::-webkit-scrollbar {
  display: none;
}
</style>

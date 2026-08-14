<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    @click="toggleTheme"
    class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border transition duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none"
    :style="{
      backgroundColor: 'var(--surface-strong)',
      borderColor: 'var(--border)',
      color: 'var(--text-secondary)',
      boxShadow: 'var(--glass-shadow)',
    }"
    :aria-label="isDark ? '切换为亮色主题' : '切换为暗色主题'"
  >
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.8"
      class="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-300 rotate-0 hover:rotate-45"
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.8"
      class="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-300 -rotate-12 hover:rotate-0"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
    </svg>
  </button>
</template>

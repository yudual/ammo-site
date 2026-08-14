<script setup lang="ts">
type SourceItem = {
  title: string
  type: string
  date: string
  url: string
}

defineProps<{
  sources: readonly SourceItem[]
  title?: string
}>()
</script>

<template>
  <div v-if="sources.length" class="mt-6 border-t pt-5" :style="{ borderColor: 'var(--border)' }">
    <div class="flex items-center justify-between mb-3">
      <p class="text-sm font-bold text-[var(--text-primary)]">{{ title || '调研权威参考来源' }}</p>
      <span class="text-xs text-[var(--text-tertiary)] font-numeric">共 {{ sources.length }} 个公开信源</span>
    </div>

    <div class="overflow-hidden rounded-xl border flex flex-col divide-y" :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-strong)' }">
      <a
        v-for="source in sources"
        :key="source.url"
        :href="source.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group grid gap-2 p-3.5 text-xs sm:text-sm transition hover:bg-[var(--surface-muted)]/50 md:grid-cols-[minmax(0,1fr)_auto_auto] items-center"
        :style="{
          color: 'var(--text-primary)',
        }"
      >
        <span class="font-medium leading-relaxed group-hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 min-w-0">
          <span class="truncate">{{ source.title }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </span>
        <span class="inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium w-fit" :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }">
          {{ source.type }}
        </span>
        <span class="text-[11px] font-numeric text-[var(--text-tertiary)] sm:text-right shrink-0">
          {{ source.date }}
        </span>
      </a>
    </div>
  </div>
</template>

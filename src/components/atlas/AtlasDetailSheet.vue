<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { GeoItem } from '../../data/geoCoordinates'
import ActionButton from '../ActionButton.vue'
import StatusPill from '../StatusPill.vue'

defineProps<{
  item: GeoItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Transition name="sheet">
    <div
      v-if="item"
      class="atlas-detail-sheet pointer-events-auto fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-40 flex flex-col p-4 sm:p-5 rounded-2xl border backdrop-blur-2xl transition-all duration-300"
      :style="{
        backgroundColor: 'var(--surface-strong)',
        borderColor: 'var(--border-strong)',
        boxShadow: 'var(--glass-shadow-hover)',
      }"
    >
      <!-- 头部：类型徽章、对口程度与关闭按钮 -->
      <div class="flex items-center justify-between pb-3 border-b" :style="{ borderColor: 'var(--border)' }">
        <div class="flex items-center gap-2">
          <span
            class="px-2 py-0.5 rounded-md text-[11px] font-bold text-white shadow-xs"
            :style="{
              backgroundColor: item.type === 'university' ? '#2563eb' : 'var(--accent)',
            }"
          >
            {{ item.type === 'university' ? '🏛️ 重点高校' : '🏭 军工/企业院所' }}
          </span>

          <StatusPill
            :status="item.verificationStatus"
            :tone="item.verificationStatus === '已核验' ? 'positive' : 'warning'"
            size="xs"
          />
        </div>

        <button
          type="button"
          class="h-7 w-7 rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition active:scale-90 cursor-pointer"
          title="关闭"
          @click="emit('close')"
        >
          &times;
        </button>
      </div>

      <!-- 主体信息 -->
      <div class="mt-3 flex flex-col gap-2">
        <div class="flex items-start justify-between gap-2">
          <h2 class="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
            {{ item.name }}
          </h2>
        </div>

        <div class="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium">
          <span class="inline-flex items-center gap-1">
            <span>📍</span>
            <span>{{ item.province }} · {{ item.city }}</span>
          </span>
          <span>&bull;</span>
          <span class="font-numeric">对口度：{{ item.relevanceLevel }}相关</span>
        </div>

        <p class="text-xs sm:text-[13px] leading-relaxed text-[var(--text-secondary)] line-clamp-3 mt-1">
          {{ item.summary }}
        </p>

        <!-- 标签群 -->
        <div class="flex flex-wrap gap-1.5 mt-2">
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="rounded-md border px-2 py-0.5 text-[11px] font-medium"
            :style="{
              backgroundColor: 'var(--surface-muted)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 底部动作直达 -->
      <div class="mt-4 pt-3 border-t flex items-center justify-between gap-2" :style="{ borderColor: 'var(--border)' }">
        <span class="text-[11px] text-[var(--text-tertiary)]">
          坐标：{{ item.lng }}°E, {{ item.lat }}°N
        </span>

        <RouterLink :to="item.targetUrl" class="shrink-0">
          <ActionButton variant="primary" size="sm">
            查看详细档案 &rarr;
          </ActionButton>
        </RouterLink>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}
</style>

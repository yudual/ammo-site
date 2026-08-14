<script setup lang="ts">
import { computed } from 'vue'
import { getStatusTone, statusPillStyle } from '../utils/status'

const props = withDefaults(
  defineProps<{
    value?: string
    prefix?: string
    size?: 'xs' | 'sm'
    showDot?: boolean
  }>(),
  {
    size: 'sm',
    showDot: true,
  },
)

const label = computed(() => {
  const value = props.value || '待核对'

  return props.prefix ? `${props.prefix} ${value}` : value
})

const tone = computed(() => getStatusTone(props.value))

const pillClass = computed(() =>
  props.size === 'xs'
    ? 'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium leading-none'
    : 'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium leading-tight',
)
</script>

<template>
  <span :class="pillClass" :style="statusPillStyle(value)">
    <span
      v-if="showDot"
      class="h-1.5 w-1.5 rounded-full shrink-0"
      :style="{ backgroundColor: `var(--status-${tone})` }"
      aria-hidden="true"
    />
    <span>{{ label }}</span>
  </span>
</template>

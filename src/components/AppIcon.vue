<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  { size: 16 },
)

// Heroicons 风格的描边图标，颜色继承 currentColor。未知 name 渲染空路径（不报错）。
const PATHS: Record<string, string> = {
  school:
    'M4.26 11.16a1.65 1.65 0 0 0 0 1.18l3.04 6.58M4.26 11.16 2.4 9.84a.6.6 0 0 1 0-1.05l9.6-4.79 9.6 4.79a.6.6 0 0 1 0 1.05l-9.6 4.8-4.96-2.48M19.74 11.16v5.7l-7.74 3.86L4.26 16.86M9 13.5l3-1.5',
  building:
    'M3 21h18M5 21V8.5l7-3.5 7 3.5V21M9 21v-6h6v6M9.5 11h.01M14.5 11h.01',
  route:
    'M8 7a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM8 17a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM11 10v4',
  search:
    'm21 21-4.34-4.34m0 0a8 8 0 1 0-11.32 11.32 8 8 0 0 0 11.32-11.32Z',
  warning:
    'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
  link:
    'M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-.403.404a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.36-.012a4.5 4.5 0 0 1-1.242-7.244l.403-.404a4.5 4.5 0 0 1 6.364 6.364l-1.757 1.757',
  check: 'm4.5 12.75 6 6 9-13.5',
  'arrow-left': 'M10.5 19 3 12m0 0 7.5-7.5M3 12h18',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="inline-block shrink-0"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="PATHS[name] ?? ''" />
  </svg>
</template>
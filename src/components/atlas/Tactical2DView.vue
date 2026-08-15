<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { GeoArc, GeoItem, GeoRegionCluster } from '../../data/geoCoordinates'

const props = defineProps<{
  items: GeoItem[]
  selectedItem: GeoItem | null
  arcs: GeoArc[]
  showArcs: boolean
  activeCluster: GeoRegionCluster | null
}>()

const emit = defineEmits<{
  (e: 'select', item: GeoItem): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const hoveredItem = ref<GeoItem | null>(null)
const mousePos = ref({ x: 0, y: 0 })

// 缩放和平移状态
const zoom = ref(1)
const pan = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

// 中国大致地理经纬度范围映射边界
const GEO_BOUNDS = {
  minLng: 75,
  maxLng: 135,
  minLat: 18,
  maxLat: 53,
}

// 投影算法：经纬度 -> [0..1000, 0..700] 笛卡尔坐标
function project(lng: number, lat: number): { x: number; y: number } {
  const normX = (lng - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng)
  // 墨卡托微调纬度投影
  const normY = (GEO_BOUNDS.maxLat - lat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)
  return {
    x: normX * 1000,
    y: normY * 700,
  }
}

// 监听聚集区切换并平滑居中平移
watch(
  () => props.activeCluster,
  (cluster) => {
    if (!cluster) return
    if (cluster.id === 'all') {
      zoom.value = 1
      pan.value = { x: 0, y: 0 }
    } else {
      const target = project(cluster.center[0], cluster.center[1])
      zoom.value = cluster.zoom2D
      pan.value = {
        x: 500 - target.x * cluster.zoom2D,
        y: 350 - target.y * cluster.zoom2D,
      }
    }
  },
  { immediate: true },
)

function onMouseDown(e: MouseEvent) {
  isDragging.value = true
  dragStart.value = { x: e.clientX - pan.value.x, y: e.clientY - pan.value.y }
}

function onMouseMove(e: MouseEvent) {
  if (isDragging.value) {
    pan.value = {
      x: e.clientX - dragStart.value.x,
      y: e.clientY - dragStart.value.y,
    }
  }
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    mousePos.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
}

function onMouseUp() {
  isDragging.value = false
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const factor = e.deltaY < 0 ? 1.15 : 0.85
  const newZoom = Math.max(0.8, Math.min(5, zoom.value * factor))
  zoom.value = newZoom
}

function resetView() {
  zoom.value = 1
  pan.value = { x: 0, y: 0 }
}

function zoomIn() {
  zoom.value = Math.min(5, zoom.value * 1.25)
}

function zoomOut() {
  zoom.value = Math.max(0.8, zoom.value * 0.8)
}

// 生成二次贝塞尔飞线路径
function getArcPath(from: [number, number], to: [number, number]): string {
  const p1 = project(from[0], from[1])
  const p2 = project(to[0], to[1])
  const midX = (p1.x + p2.x) / 2
  const midY = (p1.y + p2.y) / 2 - Math.hypot(p2.x - p1.x, p2.y - p1.y) * 0.22
  return `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`
}

onMounted(() => {
  window.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div
    ref="containerRef"
    class="tactical-2d-viewport relative w-full h-full min-h-[560px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-3xl border"
    :style="{
      backgroundColor: 'var(--surface-strong)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow)',
    }"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @wheel="onWheel"
  >
    <!-- 背景战术网格与雷达同心环 -->
    <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,var(--accent)_1px,transparent_1px)] bg-[size:32px_32px]" />

    <!-- 缩放控制浮动栏 -->
    <div class="absolute top-4 right-4 z-20 flex flex-col gap-1.5 p-1.5 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] shadow-md">
      <button
        type="button"
        class="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm text-[var(--text-primary)] hover:bg-[var(--surface-strong)] transition cursor-pointer active:scale-90"
        title="放大"
        @click="zoomIn"
      >
        +
      </button>
      <button
        type="button"
        class="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm text-[var(--text-primary)] hover:bg-[var(--surface-strong)] transition cursor-pointer active:scale-90"
        title="缩小"
        @click="zoomOut"
      >
        &minus;
      </button>
      <button
        type="button"
        class="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-strong)] transition cursor-pointer active:scale-90"
        title="重置居中"
        @click="resetView"
      >
        ⌖
      </button>
    </div>

    <!-- 战术沙盘 SVG 渲染图层 -->
    <svg
      class="w-full h-full"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid meet"
    >
      <g :transform="`translate(${pan.x}, ${pan.y}) scale(${zoom})`" class="transition-transform duration-75">
        <!-- 经纬度参考线 -->
        <g class="opacity-15 stroke-[var(--text-tertiary)]" stroke-dasharray="3,3" stroke-width="0.8">
          <line x1="100" y1="0" x2="100" y2="700" />
          <line x1="300" y1="0" x2="300" y2="700" />
          <line x1="500" y1="0" x2="500" y2="700" />
          <line x1="700" y1="0" x2="700" y2="700" />
          <line x1="900" y1="0" x2="900" y2="700" />
          <line x1="0" y1="200" x2="1000" y2="200" />
          <line x1="0" y1="400" x2="1000" y2="400" />
          <line x1="0" y1="600" x2="1000" y2="600" />
        </g>

        <!-- 中国主干疆界战术底图轮廓示意 (抽象高阶多边形) -->
        <path
          d="M 230 180 L 320 150 L 450 140 L 580 120 L 720 100 L 840 120 L 890 200 L 840 280 L 880 340 L 820 450 L 750 560 L 680 620 L 590 600 L 500 540 L 400 520 L 300 460 L 210 380 L 150 300 L 180 220 Z"
          fill="var(--surface-muted)"
          stroke="var(--border-strong)"
          stroke-width="1.5"
          class="opacity-60"
        />

        <!-- 产学研动态飞线 (Flight Arcs) -->
        <g v-if="showArcs">
          <path
            v-for="arc in arcs"
            :key="`${arc.fromId}-${arc.toId}`"
            :d="getArcPath(arc.fromCoords, arc.toCoords)"
            fill="none"
            :stroke="arc.color || 'var(--accent)'"
            stroke-width="1.8"
            stroke-linecap="round"
            class="opacity-70 animate-pulse-dash"
            stroke-dasharray="6,4"
          />
        </g>

        <!-- 所有地标 Pinpoints (高校 & 企业) -->
        <g v-for="item in items" :key="item.id" class="cursor-pointer">
          <!-- 投影坐标位置 -->
          <g
            :transform="`translate(${project(item.lng, item.lat).x}, ${project(item.lng, item.lat).y})`"
            @click.stop="emit('select', item)"
            @mouseenter="hoveredItem = item"
            @mouseleave="hoveredItem = null"
          >
            <!-- 脉冲光环 (选中的或 Hover 的) -->
            <circle
              v-if="selectedItem?.id === item.id || hoveredItem?.id === item.id"
              r="14"
              fill="none"
              :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'"
              stroke-width="1.5"
              class="animate-ping opacity-60"
            />

            <!-- 选中瞄准靶心 (Reticle) -->
            <g v-if="selectedItem?.id === item.id">
              <circle r="9" fill="none" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="-12" y1="0" x2="-6" y2="0" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="6" y1="0" x2="12" y2="0" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="0" y1="-12" x2="0" y2="-6" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="0" y1="6" x2="0" y2="12" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
            </g>

            <!-- 核心地标实心圆点 -->
            <circle
              :r="selectedItem?.id === item.id ? 6 : (item.type === 'university' ? 5 : 4)"
              :fill="item.type === 'university' ? '#3b82f6' : 'var(--accent)'"
              stroke="#ffffff"
              stroke-width="1.5"
              class="transition-all duration-150"
            />

            <!-- 极简地名/校名微标签 (仅在适度放大或选中时呈现) -->
            <text
              v-if="zoom > 1.4 || selectedItem?.id === item.id"
              x="8"
              y="3"
              class="text-[9px] font-bold fill-[var(--text-primary)] pointer-events-none drop-shadow-sm select-none"
            >
              {{ item.name.length > 8 ? item.name.slice(0, 7) + '..' : item.name }}
            </text>
          </g>
        </g>
      </g>
    </svg>

    <!-- 鼠标悬停实时微 Tooltip -->
    <div
      v-if="hoveredItem"
      class="pointer-events-none fixed z-50 flex flex-col gap-0.5 px-3 py-2 rounded-xl border backdrop-blur-xl shadow-lg transform -translate-x-1/2 -translate-y-full -mt-3"
      :style="{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        backgroundColor: 'var(--surface-strong)',
        borderColor: 'var(--border)',
        color: 'var(--text-primary)',
      }"
    >
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full" :class="hoveredItem.type === 'university' ? 'bg-[#3b82f6]' : 'bg-[var(--accent)]'" />
        <strong class="text-xs font-bold">{{ hoveredItem.name }}</strong>
      </div>
      <span class="text-[11px] text-[var(--text-secondary)]">📍 {{ hoveredItem.province }} · {{ hoveredItem.city }}</span>
    </div>

    <!-- 左下角战术沙盘图例 HUD -->
    <div class="absolute bottom-4 left-4 z-20 flex items-center gap-3 p-2.5 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] text-xs font-medium shadow-md">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-sm" />
        <span class="text-[var(--text-secondary)]">高校 (34)</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm" />
        <span class="text-[var(--text-secondary)]">企业院所 (80)</span>
      </div>
      <div v-if="showArcs" class="hidden sm:flex items-center gap-1.5 border-l pl-2.5 border-[var(--border)]">
        <span class="w-3 h-0.5 bg-[var(--accent)]" />
        <span class="text-[var(--text-secondary)]">产学研飞线</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulseDash {
  to {
    stroke-dashoffset: -20;
  }
}
.animate-pulse-dash {
  animation: pulseDash 1.5s linear infinite;
}
</style>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { geoMercator, geoPath } from 'd3-geo'
import type { GeoArc, GeoItem, GeoRegionCluster } from '../../data/geoCoordinates'
import { chinaGeoJson, getProvinceStats, type ProvinceStat } from '../../data/chinaGeoJson'

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
const hoveredProvince = ref<ProvinceStat | null>(null)
const mousePos = ref({ x: 0, y: 0 })

// 缩放与平移状态
const zoom = ref(1)
const pan = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const provinceStatsMap = getProvinceStats()

// D3 墨卡托高精投影器 (针对中国大陆经纬度精准校准)
const projection = geoMercator().center([105, 36]).scale(840).translate([500, 350])
const pathGenerator = geoPath().projection(projection)

// 生成 34 个真实省份的高精矢量 Path
const provincePaths = computed(() => {
  if (!chinaGeoJson || !chinaGeoJson.features) return []
  return chinaGeoJson.features.map((feature: any) => {
    const name = feature.properties.name || ''
    const pathData = pathGenerator(feature) || ''
    const stats = provinceStatsMap[name] || {
      id: name,
      name,
      center: feature.properties.cp || [105, 35],
      universities: [],
      companies: [],
      totalCount: 0,
    }
    return {
      name,
      pathData,
      stats,
    }
  })
})

// 投影算法：[lng, lat] -> [x, y]
function project(lng: number, lat: number): { x: number; y: number } {
  const coords = projection([lng, lat])
  return coords ? { x: coords[0], y: coords[1] } : { x: 500, y: 350 }
}

// 监听聚集区平滑定焦 (以聚集区中心为锚点平移缩放)
watch(
  () => props.activeCluster,
  (cluster) => {
    if (!cluster) return
    if (cluster.id === 'all') {
      zoom.value = 1
      pan.value = { x: 0, y: 0 }
    } else {
      const target = project(cluster.center[0], cluster.center[1])
      const newZoom = cluster.zoom2D
      zoom.value = newZoom
      pan.value = {
        x: 500 - target.x * newZoom,
        y: 350 - target.y * newZoom,
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

// 彻底修复中心缩放算法：以鼠标光标所在点为中心进行缩放，不偏离目标
function onWheel(e: WheelEvent) {
  e.preventDefault()
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  // 映射到 SVG 坐标空间
  const svgX = (mouseX / rect.width) * 1000
  const svgY = (mouseY / rect.height) * 700

  const factor = e.deltaY < 0 ? 1.15 : 0.85
  const oldZoom = zoom.value
  const newZoom = Math.max(0.8, Math.min(5, oldZoom * factor))

  // 保持鼠标下的地图点位坐标绝对不变
  pan.value.x = svgX - (svgX - pan.value.x) * (newZoom / oldZoom)
  pan.value.y = svgY - (svgY - pan.value.y) * (newZoom / oldZoom)
  zoom.value = newZoom
}

function resetView() {
  zoom.value = 1
  pan.value = { x: 0, y: 0 }
}

function zoomIn() {
  const oldZoom = zoom.value
  const newZoom = Math.min(5, oldZoom * 1.25)
  // 以画布中心 (500, 350) 为锚点放大
  pan.value.x = 500 - (500 - pan.value.x) * (newZoom / oldZoom)
  pan.value.y = 350 - (350 - pan.value.y) * (newZoom / oldZoom)
  zoom.value = newZoom
}

function zoomOut() {
  const oldZoom = zoom.value
  const newZoom = Math.max(0.8, oldZoom * 0.8)
  // 以画布中心 (500, 350) 为锚点缩小
  pan.value.x = 500 - (500 - pan.value.x) * (newZoom / oldZoom)
  pan.value.y = 350 - (350 - pan.value.y) * (newZoom / oldZoom)
  zoom.value = newZoom
}

function getArcPath(from: [number, number], to: [number, number]): string {
  const p1 = project(from[0], from[1])
  const p2 = project(to[0], to[1])
  const midX = (p1.x + p2.x) / 2
  const midY = (p1.y + p2.y) / 2 - Math.hypot(p2.x - p1.x, p2.y - p1.y) * 0.2
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
    class="tactical-2d-viewport relative w-full h-full min-h-[580px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-3xl border"
    :style="{
      backgroundColor: 'var(--surface-strong)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow-hover)',
    }"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @wheel="onWheel"
  >
    <!-- 背景战术网格 -->
    <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,var(--accent)_1px,transparent_1px)] bg-[size:36px_36px]" />

    <!-- 缩放控制浮动栏 -->
    <div class="absolute top-4 right-4 z-20 flex flex-col gap-1.5 p-1.5 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] shadow-md">
      <button
        type="button"
        class="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm text-[var(--text-primary)] hover:bg-[var(--surface-strong)] transition cursor-pointer active:scale-90"
        title="中心放大"
        @click="zoomIn"
      >
        +
      </button>
      <button
        type="button"
        class="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm text-[var(--text-primary)] hover:bg-[var(--surface-strong)] transition cursor-pointer active:scale-90"
        title="中心缩小"
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

    <!-- 战术沙盘 SVG 真实矢量图层 -->
    <svg
      class="w-full h-full"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid meet"
    >
      <g :transform="`translate(${pan.x}, ${pan.y}) scale(${zoom})`" class="transition-transform duration-75">
        <!-- 经纬度网格 -->
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

        <!-- 中国真实 34 个省份多边形几何图层 -->
        <g class="provinces-layer">
          <path
            v-for="prov in provincePaths"
            :key="prov.name"
            :d="prov.pathData"
            :fill="hoveredProvince?.name === prov.name ? 'var(--accent-soft)' : 'var(--surface-muted)'"
            :stroke="hoveredProvince?.name === prov.name ? 'var(--accent)' : 'var(--border-strong)'"
            :stroke-width="hoveredProvince?.name === prov.name ? 1.8 : 0.8"
            class="transition-colors duration-150 cursor-pointer"
            @mouseenter="hoveredProvince = prov.stats"
            @mouseleave="hoveredProvince = null"
          />
        </g>

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
            class="opacity-75 animate-pulse-dash"
            stroke-dasharray="6,4"
          />
        </g>

        <!-- 所有地标 Pinpoints (高校 & 企业：使用精致微光点，彻底移除黑乎乎的重叠文字标签) -->
        <g v-for="item in items" :key="item.id" class="cursor-pointer">
          <g
            :transform="`translate(${project(item.lng, item.lat).x}, ${project(item.lng, item.lat).y})`"
            @click.stop="emit('select', item)"
            @mouseenter="hoveredItem = item"
            @mouseleave="hoveredItem = null"
          >
            <!-- 脉冲雷达波 (选中/Hover) -->
            <circle
              v-if="selectedItem?.id === item.id || hoveredItem?.id === item.id"
              r="14"
              fill="none"
              :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'"
              stroke-width="1.5"
              class="animate-ping opacity-60"
            />

            <!-- 战术瞄准靶心 (Reticle) -->
            <g v-if="selectedItem?.id === item.id">
              <circle r="9" fill="none" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="-12" y1="0" x2="-6" y2="0" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="6" y1="0" x2="12" y2="0" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="0" y1="-12" x2="0" y2="-6" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
              <line x1="0" y1="6" x2="0" y2="12" :stroke="item.type === 'university' ? '#3b82f6' : 'var(--accent)'" stroke-width="1.5" />
            </g>

            <!-- 核心地标圆点 -->
            <circle
              :r="selectedItem?.id === item.id ? 6 : (item.type === 'university' ? 4 : 3.5)"
              :fill="item.type === 'university' ? '#3b82f6' : 'var(--accent)'"
              stroke="#ffffff"
              stroke-width="1.2"
              class="transition-all duration-150"
            />

            <!-- 仅在极深度放大或选中时呈现精致半透明白色微文字徽章（杜绝黑乎乎杂乱） -->
            <g v-if="selectedItem?.id === item.id || (zoom > 2.8 && hoveredItem?.id === item.id)">
              <rect
                x="8"
                y="-12"
                :width="item.name.length * 11 + 16"
                height="20"
                rx="6"
                :fill="item.type === 'university' ? 'rgba(37, 99, 235, 0.92)' : 'rgba(190, 85, 67, 0.92)'"
                stroke="#ffffff"
                stroke-width="1"
                class="shadow-sm"
              />
              <text
                x="14"
                y="2"
                fill="#ffffff"
                class="text-[10px] font-bold select-none pointer-events-none"
              >
                {{ item.type === 'university' ? '🏛️ ' : '🏭 ' }}{{ item.name }}
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <!-- 鼠标悬停省份情报 HUD -->
    <div
      v-if="hoveredProvince"
      class="absolute top-4 left-4 z-20 flex flex-col gap-1 p-3 rounded-2xl border backdrop-blur-xl pointer-events-none select-none text-[11px] font-numeric"
      :style="{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--glass-shadow)',
        color: 'var(--text-secondary)',
      }"
    >
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[var(--accent)]" />
        <strong class="font-bold text-xs text-[var(--text-primary)]">{{ hoveredProvince.name }}省 / 直辖市</strong>
      </div>
      <div class="flex items-center gap-3 mt-1 border-t pt-1.5 border-[var(--border)] text-xs">
        <span>收录高校: <strong class="text-[#3b82f6] font-bold">{{ hoveredProvince.universities.length }}</strong> 所</span>
        <span>&bull;</span>
        <span>收录企业: <strong class="text-[var(--accent)] font-bold">{{ hoveredProvince.companies.length }}</strong> 家</span>
      </div>
    </div>

    <!-- 鼠标悬停地标微 Tooltip (高对比度毛玻璃卡片，告别黑乎乎文本) -->
    <div
      v-if="hoveredItem"
      class="pointer-events-none fixed z-50 flex flex-col gap-0.5 px-3.5 py-2.5 rounded-xl border backdrop-blur-2xl shadow-xl transform -translate-x-1/2 -translate-y-full -mt-3"
      :style="{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        backgroundColor: 'var(--surface-strong)',
        borderColor: 'var(--border-strong)',
        color: 'var(--text-primary)',
      }"
    >
      <div class="flex items-center gap-2">
        <span
          class="px-1.5 py-0.2 rounded text-[10px] font-bold text-white shadow-xs"
          :style="{ backgroundColor: hoveredItem.type === 'university' ? '#2563eb' : 'var(--accent)' }"
        >
          {{ hoveredItem.type === 'university' ? '高校' : '企业' }}
        </span>
        <strong class="text-xs font-bold">{{ hoveredItem.name }}</strong>
      </div>
      <span class="text-[11px] text-[var(--text-secondary)] mt-0.5">
        📍 {{ hoveredItem.province }} · {{ hoveredItem.city }} &bull; {{ hoveredItem.relevanceLevel }}相关
      </span>
    </div>

    <!-- 左下角图例 -->
    <div class="absolute bottom-4 left-4 z-20 flex items-center gap-3 p-2.5 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] text-xs font-medium shadow-md select-none">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-sm" />
        <span class="text-[var(--text-secondary)] font-semibold">高校 (34)</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm" />
        <span class="text-[var(--text-secondary)] font-semibold">企业院所 (80)</span>
      </div>
      <div v-if="showArcs" class="hidden sm:flex items-center gap-1.5 border-l pl-2.5 border-[var(--border)]">
        <span class="w-3 h-0.5 bg-[var(--accent)]" />
        <span class="text-[var(--text-secondary)] font-semibold">产学研飞线</span>
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

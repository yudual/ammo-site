<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import AtlasConsole from '../components/atlas/AtlasConsole.vue'
import AtlasDetailSheet from '../components/atlas/AtlasDetailSheet.vue'
import Tactical2DView from '../components/atlas/Tactical2DView.vue'
import {
  geoRegionClusters,
  getGeoItems,
  ordnanceFlightArcs,
  type GeoItem,
  type GeoRegionCluster,
} from '../data/geoCoordinates'

// 3D 地球组件采用异步加载，保证首屏轻量流畅
const Globe3DView = defineAsyncComponent(
  () => import('../components/atlas/Globe3DView.vue'),
)

const allGeoItems = getGeoItems()
const mode = ref<'3d' | '2d'>('3d')
const filterType = ref<'all' | 'university' | 'company'>('all')
const showArcs = ref(true)
const searchKeyword = ref('')
const selectedItem = ref<GeoItem | null>(null)
const activeClusterId = ref('all')

const activeCluster = computed(() => {
  return (
    geoRegionClusters.find((c) => c.id === activeClusterId.value) ||
    geoRegionClusters[0]
  )
})

// 根据分类与搜索词筛选地标实体
const filteredItems = computed(() => {
  let list = allGeoItems

  if (filterType.value !== 'all') {
    list = list.filter((item) => item.type === filterType.value)
  }

  const kw = searchKeyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(kw) ||
        item.city.toLowerCase().includes(kw) ||
        item.province.toLowerCase().includes(kw) ||
        item.tags.some((t) => t.toLowerCase().includes(kw)),
    )
  }

  return list
})

const totalCount = computed(() => allGeoItems.length)
const uniCount = computed(
  () => allGeoItems.filter((x) => x.type === 'university').length,
)
const compCount = computed(
  () => allGeoItems.filter((x) => x.type === 'company').length,
)

function onSelectCluster(cluster: GeoRegionCluster) {
  activeClusterId.value = cluster.id
}

function onSelectItem(item: GeoItem) {
  selectedItem.value = item
}
</script>

<template>
  <div class="atlas-page min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-[var(--page-bg)] px-3.5 py-4 sm:px-6 sm:py-6">
    <main class="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <!-- 顶部控制中枢 -->
      <AtlasConsole
        v-model:mode="mode"
        v-model:filter-type="filterType"
        v-model:show-arcs="showArcs"
        v-model:search-keyword="searchKeyword"
        :active-cluster-id="activeClusterId"
        :total-count="totalCount"
        :uni-count="uniCount"
        :comp-count="compCount"
        @select-cluster="onSelectCluster"
      />

      <!-- 核心地理沙盘视窗 (高度自适应) -->
      <div class="relative w-full h-[68vh] min-h-[520px] max-h-[760px]">
        <!-- 3D 拟态数字地球模式 -->
        <Globe3DView
          v-if="mode === '3d'"
          :items="filteredItems"
          :selected-item="selectedItem"
          :arcs="ordnanceFlightArcs"
          :show-arcs="showArcs"
          :active-cluster="activeCluster"
          @select="onSelectItem"
        />

        <!-- 2D 战术平面沙盘模式 -->
        <Tactical2DView
          v-else
          :items="filteredItems"
          :selected-item="selectedItem"
          :arcs="ordnanceFlightArcs"
          :show-arcs="showArcs"
          :active-cluster="activeCluster"
          @select="onSelectItem"
        />

        <!-- 浮动地标微档案卡片 -->
        <AtlasDetailSheet
          :item="selectedItem"
          @close="selectedItem = null"
        />
      </div>

      <!-- 底部地域解读与知识大纲 -->
      <footer
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }"
      >
        <div class="flex items-center gap-2.5">
          <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-xs">
            🧭
          </span>
          <div class="flex flex-col">
            <span class="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
              {{ activeCluster.name }}
            </span>
            <span class="text-xs text-[var(--text-tertiary)]">
              {{ activeCluster.description }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
          <span class="font-numeric">高校 <strong>{{ uniCount }}</strong> 所</span>
          <span>&bull;</span>
          <span class="font-numeric">企业院所 <strong>{{ compCount }}</strong> 家</span>
          <span>&bull;</span>
          <span class="font-numeric">产学研飞线 <strong>{{ ordnanceFlightArcs.length }}</strong> 条</span>
        </div>
      </footer>
    </main>
  </div>
</template>

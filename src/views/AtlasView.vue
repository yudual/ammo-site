<script setup lang="ts">
import { computed, ref } from 'vue'
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

const allGeoItems = getGeoItems()
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

// 根据分类、搜索词与省份筛选地标实体
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

function onSelectProvince(provinceName: string) {
  searchKeyword.value = provinceName
}
</script>

<template>
  <div class="atlas-page min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-[var(--page-bg)] px-3 py-3 sm:px-6 sm:py-5">
    <main class="mx-auto flex w-full max-w-7xl flex-col gap-3">
      <!-- 顶部控制中枢 -->
      <AtlasConsole
        v-model:filter-type="filterType"
        v-model:show-arcs="showArcs"
        v-model:search-keyword="searchKeyword"
        :active-cluster-id="activeClusterId"
        :total-count="totalCount"
        :uni-count="uniCount"
        :comp-count="compCount"
        @select-cluster="onSelectCluster"
      />

      <!-- 核心沙盘工作台 (左侧情报目录 + 2D 高精度战术沙盘) -->
      <div class="relative w-full h-[74vh] min-h-[600px] max-h-[860px] flex gap-3">
        <!-- 左侧：战术情报名录速查栏 (桌面端常驻，可滚动) -->
        <aside
          class="hidden lg:flex flex-col w-72 shrink-0 rounded-3xl border p-3.5 backdrop-blur-xl transition-all duration-300 z-30"
          :style="{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="flex items-center justify-between pb-2.5 border-b" :style="{ borderColor: 'var(--border)' }">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <strong class="text-xs font-bold tracking-wide uppercase text-[var(--text-primary)]">
                情报名录 ({{ filteredItems.length }})
              </strong>
            </div>

            <span v-if="searchKeyword" class="text-[11px] text-[var(--accent)] font-semibold cursor-pointer" @click="searchKeyword = ''">
              清除筛选
            </span>
          </div>

          <!-- 列表可滚动区域 -->
          <div class="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1.5 mt-2.5 pr-0.5">
            <div v-if="filteredItems.length === 0" class="py-8 text-center text-xs text-[var(--text-tertiary)]">
              未找到匹配的单位或院校
            </div>

            <button
              v-for="item in filteredItems"
              :key="item.id"
              type="button"
              class="flex flex-col text-left p-2.5 rounded-xl border transition-all duration-150 active:scale-98 cursor-pointer select-none"
              :style="{
                backgroundColor: selectedItem?.id === item.id ? 'var(--accent-soft)' : 'var(--surface-strong)',
                borderColor: selectedItem?.id === item.id ? 'var(--accent)' : 'var(--border)',
              }"
              @click="onSelectItem(item)"
            >
              <div class="flex items-center justify-between gap-1.5">
                <span class="text-xs font-bold text-[var(--text-primary)] truncate">
                  {{ item.name }}
                </span>
                <span
                  class="text-[10px] font-bold px-1.5 py-0.2 rounded"
                  :style="{
                    backgroundColor: item.type === 'university' ? 'rgba(37, 99, 235, 0.12)' : 'var(--accent-soft)',
                    color: item.type === 'university' ? '#2563eb' : 'var(--accent)',
                  }"
                >
                  {{ item.type === 'university' ? '高校' : '企业' }}
                </span>
              </div>

              <div class="flex items-center justify-between mt-1 text-[11px] text-[var(--text-tertiary)]">
                <span>📍 {{ item.province }} · {{ item.city }}</span>
                <span class="font-numeric">{{ item.relevanceLevel }}相关</span>
              </div>
            </button>
          </div>
        </aside>

        <!-- 主视窗渲染区 (2D 战术沙盘) -->
        <div class="relative flex-1 h-full min-w-0">
          <Tactical2DView
            :items="filteredItems"
            :selected-item="selectedItem"
            :arcs="ordnanceFlightArcs"
            :show-arcs="showArcs"
            :active-cluster="activeCluster"
            @select="onSelectItem"
            @select-province="onSelectProvince"
          />

          <!-- 浮动地标微档案卡片 -->
          <AtlasDetailSheet
            :item="selectedItem"
            @close="selectedItem = null"
          />
        </div>
      </div>

      <!-- 底部地域解读与知识大纲 -->
      <footer
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl border"
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

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

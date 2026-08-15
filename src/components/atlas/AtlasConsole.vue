<script setup lang="ts">
import { ref } from 'vue'
import { geoRegionClusters, type GeoRegionCluster } from '../../data/geoCoordinates'

const props = defineProps<{
  mode: '3d' | '2d'
  filterType: 'all' | 'university' | 'company'
  showArcs: boolean
  activeClusterId: string
  searchKeyword: string
  totalCount: number
  uniCount: number
  compCount: number
}>()

const emit = defineEmits<{
  (e: 'update:mode', value: '3d' | '2d'): void
  (e: 'update:filterType', value: 'all' | 'university' | 'company'): void
  (e: 'update:showArcs', value: boolean): void
  (e: 'update:searchKeyword', value: string): void
  (e: 'selectCluster', cluster: GeoRegionCluster): void
}>()

const isClusterDrawerOpen = ref(false)

function onClusterClick(cluster: GeoRegionCluster) {
  emit('selectCluster', cluster)
  isClusterDrawerOpen.value = false
}
</script>

<template>
  <div class="atlas-console-container pointer-events-auto flex flex-col gap-2.5 w-full max-w-5xl mx-auto">
    <!-- 主控制中枢栏 (Glassmorphic HUD Bar) -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl border backdrop-blur-xl transition-colors duration-200"
      :style="{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--glass-shadow)',
      }"
    >
      <!-- 左侧：3D/2D 模式切换胶囊滑块 -->
      <div
        class="flex items-center p-1 rounded-xl border bg-[var(--surface-muted)]"
        :style="{ borderColor: 'var(--border)' }"
      >
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none"
          :style="{
            backgroundColor: mode === '3d' ? 'var(--surface-strong)' : 'transparent',
            color: mode === '3d' ? 'var(--accent)' : 'var(--text-secondary)',
            boxShadow: mode === '3d' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }"
          @click="emit('update:mode', '3d')"
        >
          <span>🌐</span>
          <span>3D 地球</span>
        </button>

        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none"
          :style="{
            backgroundColor: mode === '2d' ? 'var(--surface-strong)' : 'transparent',
            color: mode === '2d' ? 'var(--accent)' : 'var(--text-secondary)',
            boxShadow: mode === '2d' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }"
          @click="emit('update:mode', '2d')"
        >
          <span>🗺️</span>
          <span>2D 沙盘</span>
        </button>
      </div>

      <!-- 中间：实体分类筛选 (全部/高校/企业) -->
      <div class="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
        <button
          type="button"
          class="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap"
          :style="{
            backgroundColor: filterType === 'all' ? 'var(--accent-soft)' : 'var(--surface-strong)',
            borderColor: filterType === 'all' ? 'var(--accent)' : 'var(--border)',
            color: filterType === 'all' ? 'var(--accent)' : 'var(--text-secondary)',
          }"
          @click="emit('update:filterType', 'all')"
        >
          <span>全部</span>
          <span class="text-[11px] font-numeric opacity-80">({{ totalCount }})</span>
        </button>

        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap"
          :style="{
            backgroundColor: filterType === 'university' ? 'rgba(77, 144, 254, 0.14)' : 'var(--surface-strong)',
            borderColor: filterType === 'university' ? '#4d90fe' : 'var(--border)',
            color: filterType === 'university' ? '#2563eb' : 'var(--text-secondary)',
          }"
          @click="emit('update:filterType', 'university')"
        >
          <span class="inline-block w-2 h-2 rounded-full bg-[#3b82f6] shadow-sm animate-pulse" />
          <span>高校</span>
          <span class="text-[11px] font-numeric opacity-80">({{ uniCount }})</span>
        </button>

        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer whitespace-nowrap"
          :style="{
            backgroundColor: filterType === 'company' ? 'var(--accent-soft)' : 'var(--surface-strong)',
            borderColor: filterType === 'company' ? 'var(--accent)' : 'var(--border)',
            color: filterType === 'company' ? 'var(--accent)' : 'var(--text-secondary)',
          }"
          @click="emit('update:filterType', 'company')"
        >
          <span class="inline-block w-2 h-2 rounded-full bg-[var(--accent)] shadow-sm animate-pulse" />
          <span>企业院所</span>
          <span class="text-[11px] font-numeric opacity-80">({{ compCount }})</span>
        </button>

        <!-- 产学研飞线开关 (3D模式下特别亮眼) -->
        <button
          type="button"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer select-none whitespace-nowrap"
          :style="{
            backgroundColor: showArcs ? 'rgba(235, 124, 101, 0.16)' : 'var(--surface-strong)',
            borderColor: showArcs ? 'var(--accent)' : 'var(--border)',
            color: showArcs ? 'var(--accent)' : 'var(--text-tertiary)',
          }"
          title="点击开启/关闭重点高校产学研合作与人才流动飞线"
          @click="emit('update:showArcs', !showArcs)"
        >
          <span>✨ 产学研飞线</span>
          <span class="text-[10px] px-1 py-0.2 rounded font-bold" :class="showArcs ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface-muted)] text-[var(--text-tertiary)]'">
            {{ showArcs ? 'ON' : 'OFF' }}
          </span>
        </button>
      </div>

      <!-- 右侧：快速搜索输入框 -->
      <div class="relative flex-1 sm:flex-none sm:w-52">
        <input
          :value="searchKeyword"
          type="text"
          placeholder="查找大学或军工企业..."
          class="w-full rounded-xl border px-3 py-1.5 pl-8 text-xs sm:text-sm font-medium outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }"
          @input="emit('update:searchKeyword', ($event.target as HTMLInputElement).value)"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-tertiary)]"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
    </div>

    <!-- 下层：四大核心聚集区速达镜头条 (Quick Cluster Presets) -->
    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth px-1">
      <span class="text-[11px] font-bold text-[var(--text-tertiary)] shrink-0 hidden sm:inline select-none">
        重点聚集区：
      </span>

      <button
        v-for="cluster in geoRegionClusters"
        :key="cluster.id"
        type="button"
        class="flex items-center gap-1 shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all duration-200 active:scale-95 cursor-pointer select-none"
        :style="{
          backgroundColor: activeClusterId === cluster.id ? 'var(--accent)' : 'var(--surface)',
          borderColor: activeClusterId === cluster.id ? 'var(--accent)' : 'var(--border)',
          color: activeClusterId === cluster.id ? '#ffffff' : 'var(--text-secondary)',
          boxShadow: 'var(--glass-shadow)',
        }"
        @click="onClusterClick(cluster)"
      >
        <span>{{ cluster.name }}</span>
      </button>
    </div>
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

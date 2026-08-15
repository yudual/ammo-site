<script setup lang="ts">
import { companies } from '../data/companies'
import { universities } from '../data/universities'

type HeroRouteItem = {
  label: string
  note: string
  to: string
  icon: string
  tag: string
}

type ResourceMark = {
  name: string
  logo?: string
  note: string
  to: string
}

const heroRouteItems: HeroRouteItem[] = [
  {
    label: '专业介绍',
    note: '培养方案、四年节奏与报考核对',
    to: '/about-major',
    tag: '培养全景',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    label: '院校一览',
    note: '层次分布、专业方向与招生网入口',
    to: '/universities',
    tag: '报考入口',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    label: '企业名录',
    note: '企业性质、岗位线索与作息现场条件',
    to: '/companies',
    tag: '就业档案',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: '考研方向',
    note: '顺接、半跨、跨考对比与四年备考',
    to: '/graduate',
    tag: '深造地图',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
]

const schoolMarks: ResourceMark[] = [
  { name: '北京理工大学', logo: '/logos/schools/北京理工大学.png', note: '兵器与弹药方向', to: '/universities/bit' },
  { name: '南京理工大学', logo: '/logos/schools/南京理工大学.png', note: '招生网可查专业入口', to: '/universities/njust' },
  { name: '中北大学', logo: '/logos/schools/中北大学.png', note: '兵工特色院校', to: '/universities/nuc' },
  { name: '沈阳理工大学', logo: '/logos/schools/沈阳理工大学.png', note: '东北装备制造', to: '/universities/syit' },
  { name: '安徽理工大学', logo: '/logos/schools/安徽理工大学.png', note: '民爆与工程应用', to: '/universities/aust' },
  { name: '西安工业大学', logo: '/logos/schools/西安工业大学.png', note: '西北兵工资源', to: '/universities/xatu' },
]

const schoolTickerItems = [...schoolMarks, ...schoolMarks].map((item, index) => ({
  ...item,
  key: `school-${index}-${item.name}`,
}))

const highRelevanceCount =
  companies.filter((company) => company.verification.relevanceLevel === '高').length +
  universities.filter((university) => university.verification.relevanceLevel === '高').length

const withResearchCount =
  companies.filter((company) => Boolean(company.research)).length +
  universities.filter((university) => Boolean(university.research)).length
</script>

<template>
  <div class="home-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--text-primary)]">
    <!-- Ambient background -->
    <div class="fixed inset-0 pointer-events-none z-0 home-bg-glow" />

    <div class="home-shell mx-auto flex min-h-screen w-full min-w-0 max-w-6xl flex-col px-4 pb-14 pt-4 sm:px-6 sm:pb-20 sm:pt-8 md:pt-10 relative z-10">
      
      <!-- 第一屏：主入口 Hero -->
      <header class="home-hero flex flex-col items-center text-center py-6 sm:py-10 md:py-14">
        <div class="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold shadow-xs" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }">
          <span class="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span>弹药工程与爆炸技术 · 垂直信息看板</span>
        </div>

        <h1 class="mt-5 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] text-[var(--text-primary)]">
          给弹药工程人一个<span class="text-gradient">客观严谨</span>的导航
        </h1>

        <p class="home-hero-note mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal">
          按现实条件查院校培养、企业现场与考研方向，去营销化、重可核验线索。
        </p>
      </header>

      <!-- 四个核心入口 Bento Grid 卡片 -->
      <section class="home-route-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-2">
        <RouterLink
          v-for="(item, index) in heroRouteItems"
          :key="item.to"
          :to="item.to"
          class="bento-card group flex flex-col justify-between p-5 rounded-2xl border transition duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none"
          :style="{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="flex items-center justify-between">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
                color: 'var(--accent)',
              }"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
              </svg>
            </div>
            
            <span
              class="text-xs font-bold font-numeric px-2 py-0.5 rounded-full border"
              :style="{
                backgroundColor: 'var(--surface-muted)',
                borderColor: 'var(--border)',
                color: 'var(--text-tertiary)',
              }"
            >
              0{{ index + 1 }}
            </span>
          </div>

          <div class="mt-6">
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {{ item.label }}
              </h2>
              <span class="text-xs font-semibold px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)]">
                {{ item.tag }}
              </span>
            </div>
            <p class="mt-2 text-xs sm:text-[13px] leading-5 text-[var(--text-secondary)]">
              {{ item.note }}
            </p>
          </div>

          <div class="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-1">
            <span>进入查看</span>
            <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
          </div>
        </RouterLink>
      </section>

      <!-- 院校滚动流 (School Ticker) -->
      <section
        class="overflow-hidden relative flex flex-col justify-center py-3.5 rounded-2xl border mt-6 sm:mt-8"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--page-bg)] to-transparent z-10 pointer-events-none" />
        <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--page-bg)] to-transparent z-10 pointer-events-none" />
        
        <div class="flex flex-col gap-2">
          <div class="flex w-max animate-marquee-left hover:play-state-paused">
            <RouterLink
              v-for="school in schoolTickerItems"
              :key="school.key"
              :to="school.to"
              class="flex items-center gap-2 mx-2 px-3 py-1.5 rounded-full border transition hover:border-[var(--accent-border)] hover:scale-102"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
              }"
            >
              <img v-if="school.logo" :src="school.logo" :alt="school.name" class="w-4.5 h-4.5 object-contain bg-white rounded-full p-0.5 shrink-0" />
              <span class="text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">{{ school.name }}</span>
              <span class="text-[11px] text-[var(--text-tertiary)] whitespace-nowrap">· {{ school.note }}</span>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- 全宽数据看板 (4 列平衡指标) -->
      <section class="home-overview mt-8 sm:mt-12">
        <div class="flex items-center justify-between mb-3 px-1">
          <h3 class="text-xs sm:text-sm font-bold tracking-wider uppercase text-[var(--text-tertiary)]">
            全站收录与核验大盘
          </h3>
          <span class="text-xs text-[var(--text-tertiary)]">持续更新维护</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div
            class="flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition hover:-translate-y-0.5"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
          >
            <span class="text-xs font-medium text-[var(--text-tertiary)]">已收录高校</span>
            <div class="mt-2 flex items-baseline gap-1">
              <strong class="text-2xl sm:text-3xl font-black font-numeric text-[var(--text-primary)]">{{ universities.length }}</strong>
              <span class="text-xs text-[var(--text-secondary)]">所</span>
            </div>
            <p class="mt-2 text-[11px] text-[var(--text-tertiary)]">覆盖 985/211/普通本科</p>
          </div>

          <div
            class="flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition hover:-translate-y-0.5"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
          >
            <span class="text-xs font-medium text-[var(--text-tertiary)]">已收录企业</span>
            <div class="mt-2 flex items-baseline gap-1">
              <strong class="text-2xl sm:text-3xl font-black font-numeric text-[var(--text-primary)]">{{ companies.length }}</strong>
              <span class="text-xs text-[var(--text-secondary)]">家</span>
            </div>
            <p class="mt-2 text-[11px] text-[var(--text-tertiary)]">军工所/民爆/工程/智能装备</p>
          </div>

          <div
            class="flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition hover:-translate-y-0.5"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
          >
            <span class="text-xs font-medium text-[var(--text-tertiary)]">高对口条目</span>
            <div class="mt-2 flex items-baseline gap-1">
              <strong class="text-2xl sm:text-3xl font-black font-numeric text-[var(--accent)]">{{ highRelevanceCount }}</strong>
              <span class="text-xs text-[var(--text-secondary)]">条</span>
            </div>
            <p class="mt-2 text-[11px] text-[var(--text-tertiary)]">弹药/引信/爆破专业强对口</p>
          </div>

          <div
            class="flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition hover:-translate-y-0.5"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
          >
            <span class="text-xs font-medium text-[var(--text-tertiary)]">深度调研档案</span>
            <div class="mt-2 flex items-baseline gap-1">
              <strong class="text-2xl sm:text-3xl font-black font-numeric text-[var(--status-positive)]">{{ withResearchCount }}</strong>
              <span class="text-xs text-[var(--text-secondary)]">份</span>
            </div>
            <p class="mt-2 text-[11px] text-[var(--text-tertiary)]">多源交叉比对与客观评述</p>
          </div>
        </div>
      </section>

      <!-- 全新特色功能：空间沙盘引流卡片 (GeoAtlas Banner) -->
      <section class="home-atlas-banner mt-8 sm:mt-12">
        <RouterLink
          to="/atlas"
          class="group relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:border-[var(--accent-border)] cursor-pointer select-none"
          :style="{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="relative z-10 flex flex-col gap-2 max-w-xl">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--accent)] text-white shadow-xs">
                全新功能
              </span>
              <span class="text-xs font-semibold text-[var(--accent)]">
                3D 地球 &bull; 2D 平面沙盘双模
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              弹药工程与爆炸技术「全国产业与高校空间沙盘」
            </h3>

            <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              将全国 34 所高校、80 家企业院所置于数字空间沙盘。支持 3D 旋转探索、四大军工聚集区定焦与产学研关联飞线！
            </p>
          </div>

          <div class="relative z-10 shrink-0">
            <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[var(--accent)] text-white shadow-md transition group-hover:scale-105 group-hover:shadow-lg">
              <span>立即进入沙盘探索</span>
              <span class="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>

          <!-- 背景拟态微光晕 -->
          <div class="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[var(--accent)] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity" />
        </RouterLink>
      </section>

    </div>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
}

.home-bg-glow {
  background:
    radial-gradient(circle at 15% 10%, rgba(190, 85, 67, 0.07), transparent 45vw),
    radial-gradient(circle at 85% 20%, rgba(42, 122, 76, 0.05), transparent 40vw);
  filter: blur(50px);
}

:global(:root[data-theme='dark']) .home-bg-glow {
  background:
    radial-gradient(circle at 15% 10%, rgba(235, 124, 101, 0.08), transparent 45vw),
    radial-gradient(circle at 85% 20%, rgba(120, 201, 145, 0.05), transparent 40vw);
}

.animate-marquee-left {
  animation: marquee-left 32s linear infinite;
}

.hover\:play-state-paused:hover {
  animation-play-state: paused;
}

@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 0.5rem)); }
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee-left {
    animation: none;
  }
}
</style>

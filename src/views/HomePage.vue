<script setup lang="ts">
import { companies } from '../data/companies'
import { universities } from '../data/universities'

type HeroRouteItem = {
  label: string
  note: string
  to: string
  icon?: string
}

type ResourceMark = {
  name: string
  logo?: string
  note: string
  actionLabel: string
  to: string
}

const heroRouteItems: HeroRouteItem[] = [
  { label: '专业介绍', note: '课程与四年节奏', to: '/about-major', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { label: '院校一览', note: '高校层次与专业线索', to: '/universities', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { label: '企业名录', note: '性质分布与工作作息', to: '/companies', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: '考研方向', note: '路线对比与四年准备', to: '/graduate', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
]

const schoolMarks: ResourceMark[] = [
  { name: '北京理工大学', logo: '/logos/schools/北京理工大学.png', note: '兵器相关方向', actionLabel: '查看详情', to: '/universities/bit' },
  { name: '南京理工大学', logo: '/logos/schools/南京理工大学.png', note: '招生网有专业入口', actionLabel: '查看详情', to: '/universities/njust' },
  { name: '中北大学', logo: '/logos/schools/中北大学.png', note: '兵器与爆炸线索', actionLabel: '查看详情', to: '/universities/nuc' },
  { name: '沈阳理工大学', logo: '/logos/schools/沈阳理工大学.png', note: '北方院校线索', actionLabel: '查看详情', to: '/universities/syit' },
  { name: '安徽理工大学', logo: '/logos/schools/安徽理工大学.png', note: '民爆与工程应用', actionLabel: '查看详情', to: '/universities/aust' },
  { name: '西安工业大学', logo: '/logos/schools/西安工业大学.png', note: '西北方向入口', actionLabel: '查看详情', to: '/universities/xatu' },
]

const schoolTickerItems = [...schoolMarks, ...schoolMarks].map((item, index) => ({
  ...item,
  key: `school-${index}-${item.name}`,
}))

const highRelevanceCount =
  companies.filter((company) => company.verification.relevanceLevel === '高').length +
  universities.filter((university) => university.verification.relevanceLevel === '高').length

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="home-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--text-primary)]">
    <!-- Background overlay -->
    <div class="fixed inset-0 pointer-events-none z-0 home-bg-aurora"></div>

    <div class="home-shell mx-auto flex min-h-screen w-full min-w-0 max-w-6xl flex-col px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6 md:pt-8 relative z-10">
      
      <!-- 第一屏：主入口区 -->
      <header class="home-hero flex flex-col items-center text-center py-7 md:py-16">
        <p class="mb-3 text-xs sm:text-sm tracking-[0.18em] text-[var(--text-tertiary)] font-bold uppercase">
          弹药工程与爆炸技术专业导航站
        </p>
        <h1 class="text-[1.75rem] sm:text-5xl font-extrabold leading-[1.22] tracking-tight text-[var(--text-primary)]">
          给弹药孩子一个温暖的家
        </h1>
        <p class="home-hero-note mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
          院校、企业、专业和考研方向，从这里开始查。
        </p>
      </header>

      <!-- 四个核心入口卡片 -->
      <section class="home-route-grid grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 mt-1 sm:mt-2">
        <RouterLink
          v-for="(item, index) in heroRouteItems"
          :key="item.to"
          :to="item.to"
          class="bento-card home-route-card bento-glass group flex flex-col justify-between hover-lift min-h-[132px] sm:min-h-[160px]"
        >
          <div class="flex justify-between items-start">
            <div class="p-2.5 rounded-xl bg-[var(--surface-strong)]/60 text-[var(--text-secondary)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
              </svg>
            </div>
            <span class="text-2xl font-black opacity-[0.03] text-[var(--text-primary)] font-sans pointer-events-none select-none">
              0{{ index + 1 }}
            </span>
          </div>
          <div class="mt-6">
            <h3 class="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {{ item.label }}
            </h3>
            <p class="mt-1.5 text-xs text-[var(--text-tertiary)] font-medium">
              {{ item.note }}
            </p>
          </div>
        </RouterLink>
      </section>

      <!-- 轮播图栏 -->
      <section class="border-soft bento-glass overflow-hidden relative flex flex-col justify-center py-4 rounded-xl border mt-8">
        <div class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--page-bg)] to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--page-bg)] to-transparent z-10 pointer-events-none"></div>
        
        <div class="flex flex-col gap-2.5">
          <!-- 滚动学校 -->
          <div class="flex w-max animate-marquee-left hover:play-state-paused">
            <RouterLink
              v-for="school in schoolTickerItems"
              :key="school.key"
              :to="school.to"
              class="flex items-center gap-2.5 mx-2 px-3 py-1.5 rounded-full bg-[var(--surface-strong)]/40 border border-[var(--border)]/50 backdrop-blur-sm hover:border-[var(--accent)]/50 transition-colors"
            >
              <img v-if="school.logo" :src="school.logo" :alt="school.name" class="w-5 h-5 object-contain bg-white rounded-full p-0.5" />
              <span class="text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">{{ school.name }}</span>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- 数据概览 -->
      <section class="home-overview mt-10 grid gap-6 md:mt-16 md:grid-cols-5 items-center">
        <div class="md:col-span-2 grid grid-cols-3 gap-3">
          <div class="bento-glass-inset rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span class="text-xs text-[var(--text-tertiary)] mb-1">已收录高校</span>
            <strong class="text-2xl font-black text-[var(--text-primary)]">{{ universities.length }} 所</strong>
          </div>
          <div class="bento-glass-inset rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span class="text-xs text-[var(--text-tertiary)] mb-1">已收录企业</span>
            <strong class="text-2xl font-black text-[var(--text-primary)]">{{ companies.length }} 家</strong>
          </div>
          <div class="bento-glass-inset rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span class="text-xs text-[var(--text-tertiary)] mb-1">高匹配条目</span>
            <strong class="text-2xl font-black text-[var(--accent)]">{{ highRelevanceCount }} 条</strong>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="mt-16 border-t border-[var(--border)] pt-6 w-full mx-auto">
        <div class="flex flex-col gap-4 text-xs sm:text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
          <div class="flex flex-wrap items-center gap-6">
            <RouterLink to="/about" class="transition hover:text-[var(--accent)]">关于导航站</RouterLink>
            <a href="mailto:ty368685189@gmail.com" class="transition hover:text-[var(--accent)]">提供线索 / 联系作者</a>
          </div>
          <div class="text-[var(--text-tertiary)]">
            © {{ currentYear }} 弹药工程与爆炸技术导航站. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Base Page Styles */
.home-page {
  position: relative;
}

.home-bg-aurora {
  background:
    radial-gradient(circle at 15% 10%, rgba(214, 137, 85, 0.12), transparent 40vw),
    radial-gradient(circle at 85% 20%, rgba(222, 118, 118, 0.1), transparent 35vw),
    radial-gradient(circle at 50% 80%, rgba(47, 125, 79, 0.08), transparent 40vw);
  filter: blur(60px);
}

:global(:root[data-theme='dark']) .home-bg-aurora {
  background:
    radial-gradient(circle at 15% 10%, rgba(214, 137, 85, 0.08), transparent 40vw),
    radial-gradient(circle at 85% 20%, rgba(222, 118, 118, 0.06), transparent 35vw),
    radial-gradient(circle at 50% 80%, rgba(47, 125, 79, 0.05), transparent 40vw);
}



/* Bento Card Aesthetics */
.bento-card {
  position: relative;
  border-radius: 1.5rem;
  padding: 1.5rem;
  overflow: hidden;
  z-index: 1;
}

@media (min-width: 640px) {
  .bento-card {
    padding: 1.8rem;
  }
}

.bento-glass {
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 40%, rgba(255,255,255,0.1));
  box-shadow: 
    0 4px 24px -8px rgba(0,0,0,0.05),
    inset 0 1px 1px rgba(255,255,255,0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

:global(:root[data-theme='dark']) .bento-glass {
  background: color-mix(in srgb, var(--surface) 40%, transparent);
  box-shadow: 
    0 8px 32px -8px rgba(0,0,0,0.3),
    inset 0 1px 1px rgba(255,255,255,0.05);
}

.bento-glass-inset {
  background: color-mix(in srgb, var(--surface-muted) 50%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 30%, transparent);
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
}

:global(:root[data-theme='dark']) .bento-glass-inset {
  background: color-mix(in srgb, var(--surface-muted) 30%, rgba(0,0,0,0.2));
  box-shadow: inset 0 4px 20px rgba(0,0,0,0.2);
}

/* Interactions */
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
  border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
}

:global(:root[data-theme='dark']) .hover-lift:hover {
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.4);
}

/* Marquee Animations */
.animate-marquee-left {
  animation: marquee-left 35s linear infinite;
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

@media (max-width: 639px) {
  .home-hero p:first-child { margin-bottom: 0.6rem; letter-spacing: 0.1em; }
  .home-hero-note { margin-top: 0.75rem; line-height: 1.6; }
  .home-route-card { padding: 1rem; min-height: 124px; }
  .home-route-card > div:last-child { margin-top: 1rem; }
  .home-route-card h3 { font-size: 1rem; }
  .home-route-card p { line-height: 1.45; }
  .home-route-card > div:first-child > span { display: none; }
  .home-overview { margin-top: 2.5rem; }
  .home-overview strong { font-size: 1.25rem; }
  .home-overview span { font-size: 0.68rem; }
}
</style>

<script setup lang="ts">
import { companies } from '../data/companies'
import { universities } from '../data/universities'
import AppIcon from '../components/AppIcon.vue'

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

    <div class="home-shell mx-auto flex min-h-screen w-full min-w-0 max-w-6xl flex-col px-5 pb-16 pt-6 sm:px-6 md:pt-8 relative z-10">
      
      <!-- 第一屏：主入口区 -->
      <header class="flex flex-col items-center text-center py-10 md:py-16">
        <p class="mb-3 text-xs sm:text-sm tracking-[0.18em] text-[var(--text-tertiary)] font-bold uppercase">
          弹药工程与爆炸技术专业导航站
        </p>
        <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)]">
          本专业去哪查院校、单位和考研线索
        </h1>
        <p class="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          收录本专业对口高校与兵工民爆单位，附考研方向对比。每条附来源与可信度标注，待核对内容不写成确定事实，使用前以官方公告为准。
        </p>
      </header>

      <!-- 四个核心入口卡片 -->
      <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-2">
        <RouterLink
          v-for="(item, index) in heroRouteItems"
          :key="item.to"
          :to="item.to"
          class="bento-card bento-glass group flex flex-col justify-between hover-lift min-h-[160px]"
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

      <!-- 第二屏：你可以用它查什么 -->
      <section class="mt-16 sm:mt-24">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold tracking-tight text-[var(--text-primary)]">本站能查到什么</h2>
          <p class="mt-2 text-xs sm:text-sm text-[var(--text-tertiary)]">每条都附来源与可信度标注，不替你下结论。</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div class="border-soft rounded-xl border p-5 bg-[var(--surface)]">
            <h3 class="text-base font-bold text-[var(--accent)] flex items-center gap-2">
              <AppIcon name="school" class="w-4 h-4" /> 高校入口与招生线索
            </h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              收录本专业对口高校，标注层次与主攻方向，附研招网、招生简章与学院官网入口。具体招生计划与专业方向以当年学校官方公告为准。
            </p>
          </div>
          <div class="border-soft rounded-xl border p-5 bg-[var(--surface)]">
            <h3 class="text-base font-bold text-[var(--accent)] flex items-center gap-2">
              <AppIcon name="building" class="w-4 h-4" /> 兵工与民爆单位名录
            </h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              汇集兵工、民爆主要单位，列出地区、作息风评参考与学历起步要求。作息与加班风评为历史样本，受具体部门与项目周期影响明显，仅供参考。
            </p>
          </div>
          <div class="border-soft rounded-xl border p-5 bg-[var(--surface)]">
            <h3 class="text-base font-bold text-[var(--accent)] flex items-center gap-2">
              <AppIcon name="route" class="w-4 h-4" /> 考研方向与路线对比
            </h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              对比顺接本行业、半跨近缘专业、彻底跨考三类路线，附考试科目、准备节点与录取线参考。具体招生方向与名额以目标院校当年研招公告为准。
            </p>
          </div>
        </div>
      </section>

      <!-- 第三屏：当前资料状态与数据校验说明 -->
      <section class="mt-16 sm:mt-24 grid gap-6 md:grid-cols-5 items-center">
        <!-- 统计部分占2列 -->
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

        <!-- 边界说明占3列 -->
        <div class="border-soft md:col-span-3 rounded-xl border p-5 bg-[var(--surface)]">
          <h3 class="text-base font-bold text-[var(--text-primary)] flex items-center gap-2"><AppIcon name="search" class="w-4 h-4" /> 资料核验边界说明</h3>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            每条目都带<strong>【核验状态标签】</strong>（已核验、部分核验、过期待复查）。官方招生指标与工商信息定期同步；薪资、作息等动态信息仅作"学长风评 / 招聘线索"补充参考，并标注可信度边界，不写成确定事实。
          </p>
        </div>
      </section>

      <!-- 第四屏：使用提醒与免责公告 -->
      <section class="mt-16 sm:mt-24 rounded-xl border p-6" :style="{ backgroundColor: 'color-mix(in srgb, var(--surface) 90%, var(--accent-soft) 10%)', borderColor: 'var(--border)' }">
          <h3 class="text-base font-bold text-[var(--accent)] flex items-center gap-2"><AppIcon name="warning" class="w-4 h-4" /> 报考与求职前的核对提醒</h3>
        <ul class="mt-4 space-y-3 text-xs sm:text-sm leading-6 text-[var(--text-secondary)] list-disc pl-5">
          <li><strong>官方公告为准</strong>：由于各高校研招规模、专业方向及企业的编制指标每年都有变动，报考及求职前请务必前往官方研招网或用人单位招聘主页再次确认。</li>
          <li><strong>动态信息局限性</strong>：网站中收集的作息与加班风评代表历史样本，受具体部门及项目周期影响极大，请理性看待，勿作绝对化推论。</li>
          <li><strong>非官方背景</strong>：本站为客观学术导航，无任何官方代招、带路中介性质，所有内容皆为公益性质开放阅读。</li>
        </ul>
      </section>

      <!-- Footer -->
      <footer class="mt-16 border-t border-[var(--border)] pt-6 w-full mx-auto">
        <div class="flex flex-col gap-4 text-xs sm:text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
          <div class="flex flex-wrap items-center gap-6">
            <span class="font-bold text-[var(--text-primary)] tracking-wide">CODEX</span>
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
</style>

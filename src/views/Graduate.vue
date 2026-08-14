<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import {
  graduateDecisionHints,
  graduateDirectionTags,
  graduateNavItems,
  graduateQuickJudgements,
} from '../data/graduate'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-3.5 pb-14 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-20 sm:pt-6 md:pt-8">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
      <!-- 头部 Hero -->
      <header
        class="graduate-hero grid gap-6 rounded-2xl border p-5 sm:p-7 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-start"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(16px)',
        }"
      >
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold mb-3" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }">
            <span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>深造导航总览</span>
          </div>

          <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
            弹药专业本科生，考研往哪走？
          </h1>
          <p class="mt-3.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            先分清本专业顺接、工科半跨（机械/材料/力学/兵器）与主动转向，再核对招生目录与复试线。
          </p>

          <div class="mt-5 flex flex-wrap gap-1.5">
            <span
              v-for="tag in graduateDirectionTags"
              :key="tag"
              class="rounded-md border px-2.5 py-1 text-xs font-medium"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <aside
          class="rounded-xl border p-4.5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
          }"
        >
          <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
            💡 先想清楚
          </p>
          <div class="space-y-3">
            <article
              v-for="hint in graduateDecisionHints"
              :key="hint.title"
              class="border-l-2 pl-3"
              :style="{ borderColor: 'var(--accent)' }"
            >
              <h2 class="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                {{ hint.title }}
              </h2>
              <p class="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                {{ hint.body }}
              </p>
            </article>
          </div>
        </aside>
      </header>

      <!-- 快速判断 4 项 -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <article
          v-for="item in graduateQuickJudgements"
          :key="item.label"
          class="rounded-2xl border p-4.5 flex flex-col justify-between"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <span class="text-xs font-medium text-[var(--text-tertiary)]">{{ item.label }}</span>
          <p class="mt-2 text-sm sm:text-base font-bold text-[var(--text-primary)]">
            {{ item.value }}
          </p>
          <p class="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
            {{ item.note }}
          </p>
        </article>
      </section>

      <!-- 4 个方向子页面卡片 -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <RouterLink
          v-for="item in graduateNavItems.slice(1)"
          :key="item.to"
          :to="item.to"
          class="group flex flex-col justify-between rounded-2xl border p-4.5 transition duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div>
            <span class="text-[11px] font-semibold text-[var(--text-tertiary)]">继续看</span>
            <h2 class="mt-1.5 text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {{ item.label }}
            </h2>
            <p class="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
              {{
                item.to.endsWith('directions')
                  ? '顺接、半跨、跨考三大梯队详细拆解。'
                  : item.to.endsWith('compare')
                    ? '匹配度、难点、初试科目与去向矩阵。'
                    : item.to.endsWith('schools')
                      ? '对口招生高校名单与研招网直达入口。'
                      : '从大一到大四的阶段备考与能力储备。'
              }}
            </p>
          </div>
          <span class="mt-4 text-xs font-semibold text-[var(--accent)] flex items-center gap-1">
            <span>查看内容</span>
            <span>&rarr;</span>
          </span>
        </RouterLink>
      </section>

      <!-- 快速导流卡片 -->
      <section
        class="rounded-2xl border p-5 sm:p-6"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">方向决策</span>
            <h2 class="mt-1 text-base sm:text-lg font-bold text-[var(--text-primary)]">还不确定选哪个方向？</h2>
            <p class="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              从科目重合度、转行成本与未来去向对比入手。
            </p>
          </div>

          <RouterLink
            to="/graduate/compare"
            class="shrink-0 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
            :style="{ backgroundColor: 'var(--accent)' }"
          >
            查看方向对比矩阵 &rarr;
          </RouterLink>
        </div>
      </section>
    </main>
  </section>
</template>

<style scoped>
.graduate-hero {
  position: relative;
  overflow: hidden;
}

.graduate-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 85, 67, 0.05), transparent 36%),
    linear-gradient(315deg, rgba(42, 122, 76, 0.04), transparent 42%);
  pointer-events: none;
}

.graduate-hero > * {
  position: relative;
  z-index: 1;
}
</style>

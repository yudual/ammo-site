<script setup lang="ts">
import { computed } from 'vue'
import TopicNav from '../components/TopicNav.vue'
import { graduateDirections, graduateLevelStyle, graduateNavItems } from '../data/graduate'

const directionStats = computed(() =>
  [
    {
      label: '本专业顺接',
      value: graduateDirections.filter((direction) => direction.level === '顺接').length,
      note: '承接本科兵器/弹药背景',
    },
    {
      label: '工科半跨',
      value: graduateDirections.filter((direction) => direction.level === '半跨').length,
      note: '力学/机械/材料能力迁移',
    },
    {
      label: '主动跨考',
      value: graduateDirections.filter((direction) => direction.level === '跨考').length,
      note: '控制/电通/计算机需早补基础',
    },
  ],
)
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-3.5 pb-14 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-20 sm:pt-6 md:pt-8">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
      <header
        class="rounded-2xl border p-5 sm:p-7 flex flex-col gap-2"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(16px)',
        }"
      >
        <div class="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold w-fit" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }">
          <span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span>专业方向拆解</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          顺接、半跨与主动转向三大梯度
        </h1>
        <p class="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          从研究主题、初试常见科目、复试需要补充的核心能力与转行风险提示进行全面拆解。
        </p>
      </header>

      <!-- 3 大梯度统计 -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div
          v-for="stat in directionStats"
          :key="stat.label"
          class="rounded-2xl border p-4.5 flex flex-col justify-between"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', boxShadow: 'var(--glass-shadow)' }"
        >
          <span class="text-xs font-medium text-[var(--text-tertiary)]">{{ stat.label }}</span>
          <p class="mt-2 text-2xl font-black font-numeric text-[var(--text-primary)]">
            {{ stat.value }} <span class="text-xs font-normal text-[var(--text-tertiary)]">个主流分支</span>
          </p>
          <p class="mt-1 text-xs text-[var(--text-secondary)]">{{ stat.note }}</p>
        </div>
      </section>

      <!-- 方向卡片列表 -->
      <section class="flex flex-col gap-4">
        <article
          v-for="direction in graduateDirections"
          :key="`${direction.title}-detail`"
          class="rounded-2xl border p-5 sm:p-6 transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="grid gap-4 xl:grid-cols-[14rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] xl:items-start">
            <div>
              <span class="inline-flex rounded-lg border px-2.5 py-0.5 text-xs font-bold" :style="graduateLevelStyle(direction.level)">
                {{ direction.level }}
              </span>
              <h2 class="mt-2.5 text-base sm:text-lg font-bold text-[var(--text-primary)]">
                {{ direction.title }}
              </h2>
              <p class="mt-1.5 text-xs font-numeric text-[var(--text-tertiary)]">
                初试常见：{{ direction.subjects.join(' / ') }}
              </p>
            </div>

            <div class="rounded-xl p-3.5 bg-[var(--surface-muted)]/40 border border-[var(--border)]">
              <span class="text-xs font-bold text-[var(--text-primary)] block mb-2">主要研究主题</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="topic in direction.topics"
                  :key="topic"
                  class="rounded-md px-2 py-0.5 text-xs font-medium"
                  :style="{ backgroundColor: 'var(--surface-strong)', color: 'var(--text-secondary)' }"
                >
                  {{ topic }}
                </span>
              </div>
            </div>

            <div class="rounded-xl p-3.5 bg-[var(--accent-soft)]/40 border border-[var(--accent-border)]">
              <span class="text-xs font-bold text-[var(--accent)] block mb-2">需要补充的能力</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="item in direction.bridge"
                  :key="item"
                  class="rounded-md px-2 py-0.5 text-xs font-medium"
                  :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
                >
                  {{ item }}
                </span>
              </div>
            </div>

            <div class="rounded-xl p-3.5 bg-[var(--surface-muted)]/40 border border-[var(--border)]">
              <span class="text-xs font-bold text-[var(--status-warning)] block mb-1">风险提醒</span>
              <p class="text-xs leading-relaxed text-[var(--text-secondary)]">
                {{ direction.warning }}
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  </section>
</template>

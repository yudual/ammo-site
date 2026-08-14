<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorCautionFor, majorDirections, majorNavItems, majorSuitableFor } from '../data/aboutMajor'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-3.5 pb-14 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-20 sm:pt-6 md:pt-8">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

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
          <span>就业与毕业走向</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          毕业去向与真实工作场景差异
        </h1>
        <p class="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          方向名称只是表象，关键要对比的是单位性质、工作地点、保密涉密级别、学历门槛与真实生活环境。
        </p>
      </header>

      <!-- 常见去向 -->
      <section class="flex flex-col gap-4">
        <article
          v-for="direction in majorDirections"
          :key="direction.title"
          class="rounded-2xl border p-5 sm:p-6 transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="grid gap-4 xl:grid-cols-[14rem_minmax(0,1.2fr)_minmax(0,1fr)] xl:items-start">
            <div>
              <h2 class="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                {{ direction.title }}
              </h2>
              <div class="mt-2.5 flex flex-wrap gap-1.5">
                <span
                  v-for="example in direction.examples"
                  :key="example"
                  class="rounded-md px-2 py-0.5 text-xs font-medium"
                  :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
                >
                  {{ example }}
                </span>
              </div>
            </div>

            <div>
              <span class="text-xs font-semibold text-[var(--text-tertiary)] block mb-1">主要职责与场景</span>
              <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                {{ direction.summary }}
              </p>
            </div>

            <div class="rounded-xl p-3.5 border" :style="{ backgroundColor: 'var(--surface-muted)/40', borderColor: 'var(--border)' }">
              <span class="text-xs font-bold text-[var(--status-warning)] block mb-1">核对要点与门槛</span>
              <p class="text-xs leading-relaxed text-[var(--text-secondary)]">
                {{ direction.check }}
              </p>
            </div>
          </div>
        </article>
      </section>

      <!-- 适合与慎选 -->
      <section class="grid gap-5 md:grid-cols-2">
        <div
          class="rounded-2xl border p-5 sm:p-6 flex flex-col"
          :style="{ backgroundColor: 'var(--status-positive-soft)', borderColor: 'var(--status-positive-border)' }"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="h-2.5 w-2.5 rounded-full bg-[var(--status-positive)]" />
            <h2 class="text-base font-bold text-[var(--status-positive)]">
              具备这些特质，会走得更顺
            </h2>
          </div>
          <div class="space-y-3.5 divide-y divide-[var(--status-positive-border)]">
            <article v-for="item in majorSuitableFor" :key="item.title" class="pt-3.5 first:pt-0">
              <h3 class="text-xs sm:text-sm font-bold text-[var(--text-primary)]">{{ item.title }}</h3>
              <p class="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>

        <div
          class="rounded-2xl border p-5 sm:p-6 flex flex-col"
          :style="{ backgroundColor: 'var(--status-warning-soft)', borderColor: 'var(--status-warning-border)' }"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="h-2.5 w-2.5 rounded-full bg-[var(--status-warning)]" />
            <h2 class="text-base font-bold text-[var(--status-warning)]">
              存在这些顾虑，需提前想清楚
            </h2>
          </div>
          <div class="space-y-3.5 divide-y divide-[var(--status-warning-border)]">
            <article v-for="item in majorCautionFor" :key="item.title" class="pt-3.5 first:pt-0">
              <h3 class="text-xs sm:text-sm font-bold text-[var(--text-primary)]">{{ item.title }}</h3>
              <p class="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

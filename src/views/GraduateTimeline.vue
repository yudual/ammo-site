<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { graduateNavItems, graduateTimeline } from '../data/graduate'
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
          <span>备考全周期</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          本科四年的准备节奏与关键节点
        </h1>
        <p class="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          按学年规划课程绩点、数理基础、实验项目和目标院校锁定时间线。
        </p>
      </header>

      <!-- 时间线卡片群 -->
      <section class="flex flex-col gap-4">
        <article
          v-for="stage in graduateTimeline"
          :key="stage.time"
          class="rounded-2xl border p-5 sm:p-6 transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="grid gap-4 md:grid-cols-[8.5rem_minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
            <div>
              <span
                class="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold font-numeric"
                :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
              >
                <span class="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>{{ stage.time }}</span>
              </span>
            </div>

            <div>
              <h2 class="text-base sm:text-lg font-bold leading-tight text-[var(--text-primary)]">
                {{ stage.title }}
              </h2>
              <p class="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                {{ stage.focus }}
              </p>
            </div>

            <div class="rounded-xl p-3.5 border" :style="{ backgroundColor: 'var(--surface-muted)/40', borderColor: 'var(--border)' }">
              <span class="text-xs font-bold text-[var(--text-tertiary)] block mb-2">行动建议清单</span>
              <ul class="space-y-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                <li v-for="action in stage.actions" :key="action" class="flex items-start gap-1.5">
                  <span class="text-[var(--accent)] font-bold">✓</span>
                  <span>{{ action }}</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </main>
  </section>
</template>

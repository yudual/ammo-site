<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorAbilities, majorNavItems, majorStudyStages } from '../data/aboutMajor'
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
          <span>大学全景规划</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          四年学习节奏与能力沉淀
        </h1>
        <p class="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          每一年具体的课程攻关重心、实验参与和毕业应有的核心材料清单。
        </p>
      </header>

      <section class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <!-- 课程节奏 -->
        <div
          class="overflow-hidden rounded-2xl border flex flex-col gap-0"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="border-b px-5 py-4 flex items-center justify-between" :style="{ borderColor: 'var(--border)' }">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">学年进阶路径</span>
            <span class="text-xs text-[var(--text-tertiary)]">从大一到大四</span>
          </div>

          <div class="divide-y" :style="{ borderColor: 'var(--border)' }">
            <article
              v-for="stage in majorStudyStages"
              :key="stage.year"
              class="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start"
            >
              <span class="shrink-0 rounded-xl px-3 py-1 text-xs sm:text-sm font-bold font-numeric" :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }">
                {{ stage.year }}
              </span>

              <div class="flex-1 min-w-0">
                <h2 class="text-base font-bold text-[var(--text-primary)]">
                  {{ stage.title }}
                </h2>
                <p class="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                  {{ stage.focus }}
                </p>
                <ul class="mt-3 space-y-1.5 text-xs text-[var(--text-tertiary)]">
                  <li v-for="action in stage.actions" :key="action" class="flex items-start gap-1.5">
                    <span class="text-[var(--accent)] font-bold">·</span>
                    <span>{{ action }}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>

        <!-- 能力材料清单 -->
        <div
          class="overflow-hidden rounded-2xl border"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="border-b px-5 py-4 flex items-center justify-between" :style="{ borderColor: 'var(--border)' }">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">核心能力清单</span>
            <span class="text-xs text-[var(--text-tertiary)]">毕业时务必保留</span>
          </div>

          <div class="p-4 sm:p-5 grid gap-3 sm:grid-cols-2">
            <article
              v-for="ability in majorAbilities"
              :key="ability.name"
              class="rounded-xl border p-4 flex flex-col justify-between"
              :style="{ backgroundColor: 'var(--surface-muted)/40', borderColor: 'var(--border)' }"
            >
              <div>
                <h3 class="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                  {{ ability.name }}
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {{ ability.detail }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

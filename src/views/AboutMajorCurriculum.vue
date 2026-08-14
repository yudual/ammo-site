<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorLearningBlocks, majorNavItems } from '../data/aboutMajor'

const totalCourseKeywords = majorLearningBlocks.reduce((total, block) => total + block.items.length, 0)
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-3.5 pb-14 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-20 sm:pt-6 md:pt-8">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
      <header
        class="rounded-2xl border p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(16px)',
        }"
      >
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold w-fit mb-3" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }">
            <span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>核心培养方案</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
            四层课程体系：从数理基础到工程实弹
          </h1>
          <p class="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            不同院校课程名称略有微调，但核心均围绕数理基础、力学机械、火炸药/终点效应与外场实验展开。
          </p>
        </div>

        <div class="flex items-center gap-2 text-xs">
          <div class="px-3 py-2 rounded-xl bg-[var(--surface-strong)] border border-[var(--border)]">
            <span class="text-[var(--text-tertiary)] block text-[11px]">课程层级</span>
            <strong class="text-base font-bold font-numeric text-[var(--text-primary)]">{{ majorLearningBlocks.length }} 层</strong>
          </div>
          <div class="px-3 py-2 rounded-xl bg-[var(--surface-strong)] border border-[var(--border)]">
            <span class="text-[var(--text-tertiary)] block text-[11px]">核心模块</span>
            <strong class="text-base font-bold font-numeric text-[var(--text-primary)]">{{ totalCourseKeywords }} 个</strong>
          </div>
        </div>
      </header>

      <!-- 课程层级 -->
      <section class="flex flex-col gap-4">
        <article
          v-for="block in majorLearningBlocks"
          :key="block.title"
          class="rounded-2xl border p-5 sm:p-6 transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="grid gap-4 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start">
            <div>
              <span class="rounded-lg px-2.5 py-0.5 text-xs font-bold" :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }">
                {{ block.eyebrow }}
              </span>
              <h2 class="mt-2 text-base sm:text-lg font-bold text-[var(--text-primary)]">
                {{ block.title }}
              </h2>
              <p class="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                {{ block.description }}
              </p>
            </div>

            <div class="flex flex-wrap content-start gap-2 pt-1">
              <span
                v-for="item in block.items"
                :key="item"
                class="rounded-xl border px-3 py-1.5 text-xs sm:text-sm font-medium"
                :style="{ backgroundColor: 'var(--surface-muted)/50', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  </section>
</template>

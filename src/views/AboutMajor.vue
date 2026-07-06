<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorFirstInsights, majorNavItems, majorQuickFacts, majorSourceLinks } from '../data/aboutMajor'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-4 text-[var(--text-primary)] sm:px-6 sm:pt-6 md:pt-4">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header
        class="major-hero grid gap-6 rounded-xl border p-5 md:p-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.62fr)] xl:items-end"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="max-w-full">
          <p class="mb-4 text-sm tracking-[0.16em] text-[var(--text-tertiary)]">专业总览</p>
          <h1 class="max-w-full text-2xl font-semibold leading-tight text-[var(--text-primary)] sm:text-3xl md:max-w-5xl md:text-4xl">
            弹药工程与爆炸技术专业介绍
          </h1>
          <p class="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
            先看课程、学校方向、常见去向，再判断适不适合。
          </p>
        </div>

        <div
          class="max-w-full rounded-xl border p-4 md:p-5"
          :style="{
            backgroundColor: 'color-mix(in srgb, var(--surface-strong) 84%, var(--accent-soft) 16%)',
            borderColor: 'var(--border)',
          }"
        >
          <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">先抓住这件事</p>
          <p class="mt-3 text-sm font-semibold leading-6 text-[var(--text-primary)] sm:text-base sm:leading-7 md:text-lg md:leading-8">
            <span class="block md:hidden">不是只背概念，最后要落到工程场景里。</span>
            <span class="hidden md:block">这不是只背概念的专业，很多内容最后都会落到工程场景里。</span>
          </p>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            重点看培养方案、实验条件和近年去向。
          </p>
        </div>
      </header>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{
          backgroundColor: 'var(--surface-strong)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="border-soft border-b px-5 py-4">
          <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">专业档案</p>
        </div>
        <dl class="grid md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="fact in majorQuickFacts"
            :key="fact.label"
            class="border-soft border-t px-5 py-4 xl:border-r xl:last:border-r-0"
          >
            <dt class="text-sm text-[var(--text-tertiary)]">{{ fact.label }}</dt>
            <dd>
              <p class="font-semibold leading-6 text-[var(--text-primary)]">{{ fact.value }}</p>
              <p class="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{{ fact.note }}</p>
            </dd>
          </div>
        </dl>
      </section>

      <section class="surface-card grid gap-0 overflow-hidden rounded-lg border md:grid-cols-3">
        <article
          v-for="(insight, index) in majorFirstInsights"
          :key="insight.title"
          class="border-soft border-b px-5 py-4 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <div class="flex items-start gap-4">
            <p class="pt-0.5 text-sm font-medium text-[var(--accent)]">
              {{ String(index + 1).padStart(2, '0') }}
            </p>
            <div>
              <h2 class="text-base font-semibold leading-6 text-[var(--text-primary)]">
                {{ insight.title }}
              </h2>
              <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {{ insight.body }}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <RouterLink
          v-for="item in majorNavItems.slice(1)"
          :key="item.to"
          :to="item.to"
          class="rounded-lg border p-4 transition hover:-translate-y-0.5"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
        >
          <p class="text-sm text-[var(--text-tertiary)]">继续看</p>
          <h2 class="mt-2 text-lg font-semibold">{{ item.label }}</h2>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            {{
              item.to.endsWith('curriculum')
                ? '数理、力学机械、专业课和实践训练。'
                : item.to.endsWith('path')
                  ? '大一到大四的课程与能力节奏。'
                  : item.to.endsWith('career')
                    ? '军工、民爆、制造、深造等去向。'
                    : '报考前需要核对的问题。'
            }}
          </p>
          <span class="mt-4 block text-sm font-medium text-[var(--accent)]">查看</span>
        </RouterLink>
      </section>

      <details class="surface-card rounded-lg border p-4">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span class="block text-sm tracking-[0.14em] text-[var(--text-tertiary)]">参考入口</span>
            <span class="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">
              专业目录和公开介绍。
            </span>
          </span>
          <span class="shrink-0 rounded-lg px-3 py-1 text-sm text-[var(--accent)]" :style="{ backgroundColor: 'var(--accent-soft)' }">
            {{ majorSourceLinks.length }} 项
          </span>
        </summary>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          <a
            v-for="source in majorSourceLinks"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg border p-4 text-sm transition hover:-translate-y-0.5"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <span class="block font-medium leading-6">{{ source.title }}</span>
            <span class="mt-2 block leading-6 text-[var(--text-tertiary)]">
              {{ source.meta }}
            </span>
          </a>
        </div>
      </details>
    </main>
  </section>
</template>

<style scoped>
.major-hero {
  position: relative;
  overflow: hidden;
}

.major-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 36%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.06), transparent 42%);
  pointer-events: none;
}

.major-hero > * {
  position: relative;
  z-index: 1;
}
</style>

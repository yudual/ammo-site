<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { graduateNavItems, graduateSchoolSignals, graduateSourceLinks } from '../data/graduate'
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
          <span>研招院校与院所</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          常见对口招收院校与科研院所
        </h1>
        <p class="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          包含兵工七校、国防特色高校与中物院、兵器集团研究院所的招考信号与核对提示。
        </p>
      </header>

      <!-- 院校列表 -->
      <section
        class="overflow-hidden rounded-2xl border flex flex-col divide-y"
        :style="{
          backgroundColor: 'var(--surface-strong)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <a
          v-for="school in graduateSchoolSignals"
          :key="school.name"
          :href="school.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group grid gap-3 p-4 sm:p-5 transition hover:bg-[var(--surface-muted)]/50 md:grid-cols-[14rem_minmax(0,1.2fr)_minmax(0,1fr)_auto] items-center"
        >
          <div>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-secondary)]">
              {{ school.position }}
            </span>
            <h2 class="mt-1.5 text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
              {{ school.name }}
            </h2>
          </div>

          <div>
            <span class="text-xs font-semibold text-[var(--text-primary)] block mb-1">方向与信号</span>
            <p class="text-xs leading-relaxed text-[var(--text-secondary)]">
              {{ school.signal }}
            </p>
          </div>

          <div>
            <span class="text-xs font-semibold text-[var(--status-warning)] block mb-1">核对重点</span>
            <p class="text-xs leading-relaxed text-[var(--text-tertiary)]">
              {{ school.check }}
            </p>
          </div>

          <div class="md:text-right shrink-0">
            <span class="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
              <span>研招网入口</span>
              <span>&rarr;</span>
            </span>
          </div>
        </a>
      </section>

      <!-- 资料来源 -->
      <details class="rounded-2xl border p-4.5" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3 select-none">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">权威研招资料来源（{{ graduateSourceLinks.length }}项）</span>
          <span class="text-xs text-[var(--accent)] font-semibold">展开查看</span>
        </summary>
        <div class="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 pt-3 border-t" :style="{ borderColor: 'var(--border)' }">
          <a
            v-for="source in graduateSourceLinks"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl border p-3.5 text-xs transition hover:bg-[var(--surface-muted)]/50"
            :style="{
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <span class="block font-bold leading-relaxed truncate">{{ source.title }}</span>
            <span class="mt-1 block text-[11px] text-[var(--text-tertiary)] truncate">
              {{ source.meta }}
            </span>
          </a>
        </div>
      </details>
    </main>
  </section>
</template>

<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorCheckItems, majorNavItems, majorSourceLinks } from '../data/aboutMajor'
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
          <span>志愿报考决策</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          高考报考前必看的核对清单
        </h1>
        <p class="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          从学院归属、专业特色、往届去向与城市地域进行多维求证，避免因信息差产生决策偏差。
        </p>
      </header>

      <!-- 核对清单 -->
      <section
        class="overflow-hidden rounded-2xl border flex flex-col divide-y"
        :style="{
          backgroundColor: 'var(--surface-strong)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <article
          v-for="(item, index) in majorCheckItems"
          :key="item.label"
          class="p-5 sm:p-6 grid gap-3 md:grid-cols-[4rem_10rem_minmax(0,1fr)] md:items-start"
        >
          <span class="text-xs font-bold font-numeric text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-lg w-fit">
            0{{ index + 1 }}
          </span>

          <h2 class="text-sm sm:text-base font-bold text-[var(--text-primary)]">
            {{ item.label }}
          </h2>

          <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            {{ item.detail }}
          </p>
        </article>
      </section>

      <!-- 资料来源 -->
      <details class="rounded-2xl border p-4.5" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3 select-none">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">参考资料与公开信息源（{{ majorSourceLinks.length }}项）</span>
          <span class="text-xs text-[var(--accent)] font-semibold">展开查看</span>
        </summary>
        <div class="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 pt-3 border-t" :style="{ borderColor: 'var(--border)' }">
          <a
            v-for="source in majorSourceLinks"
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

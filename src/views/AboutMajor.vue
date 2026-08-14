<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorFirstInsights, majorNavItems, majorQuickFacts, majorSourceLinks } from '../data/aboutMajor'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-3.5 pb-14 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-20 sm:pt-6 md:pt-8">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
      <!-- 头部 Hero -->
      <header
        class="major-hero grid gap-6 rounded-2xl border p-5 sm:p-7 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-center"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(16px)',
        }"
      >
        <div class="max-w-full">
          <div class="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold mb-3" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }">
            <span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>专业全景总览</span>
          </div>

          <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
            弹药工程与爆炸技术专业介绍
          </h1>
          <p class="mt-3.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            先看课程体系、四年节奏与毕业真实去向，再判断是否适合报考与深造。
          </p>
        </div>

        <div
          class="rounded-xl border p-4.5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--accent-border)',
          }"
        >
          <p class="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
            <span>⚡ 先说核心结论</span>
          </p>
          <p class="mt-2 text-xs sm:text-sm font-bold leading-relaxed text-[var(--text-primary)]">
            背概念只是入门，真正的功夫都在工程与实验场景里。
          </p>
          <p class="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
            重点看院校具体培养方案、试验室条件与近年头部企业签约去向。
          </p>
        </div>
      </header>

      <!-- 专业档案 4 项 -->
      <section
        class="overflow-hidden rounded-2xl border"
        :style="{
          backgroundColor: 'var(--surface-strong)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="border-b px-5 py-3.5 flex items-center justify-between" :style="{ borderColor: 'var(--border)' }">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">专业档案要点</span>
          <span class="text-xs text-[var(--text-tertiary)] font-numeric">全国 10 余所高校开设</span>
        </div>
        <dl class="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x" :style="{ borderColor: 'var(--border)' }">
          <div
            v-for="fact in majorQuickFacts"
            :key="fact.label"
            class="p-4 sm:p-5 flex flex-col justify-between"
          >
            <dt class="text-xs font-medium text-[var(--text-tertiary)]">{{ fact.label }}</dt>
            <dd class="mt-2">
              <strong class="block text-sm sm:text-base font-bold text-[var(--text-primary)]">{{ fact.value }}</strong>
              <p class="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{{ fact.note }}</p>
            </dd>
          </div>
        </dl>
      </section>

      <!-- 核心洞察 3 条 -->
      <section class="grid gap-4 md:grid-cols-3">
        <article
          v-for="(insight, index) in majorFirstInsights"
          :key="insight.title"
          class="rounded-2xl border p-5 transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-xs font-black font-numeric text-[var(--accent)]">
              0{{ index + 1 }}
            </span>
            <h2 class="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              {{ insight.title }}
            </h2>
          </div>
          <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            {{ insight.body }}
          </p>
        </article>
      </section>

      <!-- 继续深入 4 个子页面 -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <RouterLink
          v-for="item in majorNavItems.slice(1)"
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
                item.to.endsWith('curriculum')
                  ? '数理、力学机械、专业课与工程实践。'
                  : item.to.endsWith('path')
                    ? '大一到大四学习与能力积累节奏。'
                    : item.to.endsWith('career')
                      ? '军工所、民爆、制造与考研深造去向。'
                      : '报考前务必核对的现实问题清单。'
              }}
            </p>
          </div>
          <span class="mt-4 text-xs font-semibold text-[var(--accent)] flex items-center gap-1">
            <span>查看内容</span>
            <span>&rarr;</span>
          </span>
        </RouterLink>
      </section>

      <!-- 参考入口 -->
      <details class="rounded-2xl border p-4.5" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3 select-none">
          <div>
            <span class="block text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">权威参考资料与来源</span>
            <span class="mt-0.5 block text-xs text-[var(--text-secondary)]">
              教育部专业目录与各高校公开培养方案介绍。
            </span>
          </div>
          <span class="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)]">
            {{ majorSourceLinks.length }} 项
          </span>
        </summary>
        <div class="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 pt-3 border-t" :style="{ borderColor: 'var(--border)' }">
          <a
            v-for="source in majorSourceLinks"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group rounded-xl border p-3.5 text-xs transition hover:bg-[var(--surface-muted)]/50"
            :style="{
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <span class="block font-bold leading-relaxed group-hover:text-[var(--accent)] transition-colors truncate">{{ source.title }}</span>
            <span class="mt-1 block text-[11px] text-[var(--text-tertiary)] truncate">
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
    linear-gradient(135deg, rgba(190, 85, 67, 0.05), transparent 36%),
    linear-gradient(315deg, rgba(42, 122, 76, 0.04), transparent 42%);
  pointer-events: none;
}

.major-hero > * {
  position: relative;
  z-index: 1;
}
</style>

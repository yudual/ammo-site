<script setup lang="ts">
import ActionButton from '../components/ActionButton.vue'

const quickLinks = [
  { label: '专业介绍', to: '/about-major', hint: '看这个专业到底学什么' },
  { label: '院校一览', to: '/universities', hint: '查开设院校和方向' },
  { label: '企业名录', to: '/companies', hint: '查就业去向和招聘入口' },
  { label: '考研方向', to: '/graduate', hint: '看考研节奏和院校' },
]
</script>

<template>
  <section class="min-h-screen bg-[var(--page-bg)] px-5 pb-10 pt-28 text-[var(--text-primary)] sm:px-6 sm:pb-12 sm:pt-32">
    <div class="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-4xl flex-col">
      <main class="flex flex-1 items-center py-14">
        <div
          class="w-full rounded-lg border p-6 md:p-8"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <p class="text-sm tracking-[0.16em] text-[var(--text-tertiary)]">404</p>
          <h1 class="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            这个页面暂时不存在
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            可能是链接有误、条目未收录，或者页面已经调整。下面是几个常用的入口，直接点回去就好。
          </p>

          <div class="mt-7">
            <ActionButton variant="primary" to="/">
              <span class="text-base leading-none text-white/90" aria-hidden="true">&larr;</span>
              <span class="ml-1.5">回首页</span>
            </ActionButton>
          </div>

          <div class="mt-7 grid gap-3 sm:grid-cols-2">
            <RouterLink
              v-for="item in quickLinks"
              :key="item.to"
              :to="item.to"
              class="group rounded-lg border px-4 py-3 transition hover:-translate-y-0.5"
              :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
            >
              <span class="block text-sm font-semibold">{{ item.label }}</span>
              <span class="mt-1 block text-xs text-[var(--text-tertiary)]">{{ item.hint }}</span>
            </RouterLink>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>
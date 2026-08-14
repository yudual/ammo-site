<script setup lang="ts">
const contentScopes = [
  { name: '专业介绍', desc: '课程体系、四年进阶路径、毕业走向与报考核对' },
  { name: '院校一览', desc: '全国开设高校、层次梯队、学科特色与研招入口' },
  { name: '企业名录', desc: '军工科研院所、民爆产品工程、智能装备企业档案' },
  { name: '考研方向', desc: '顺接/半跨/跨考三梯队对比、初试科目与研招信号' },
]

const notes = [
  { title: '数据来源', desc: '教育部公开目录、高校招生网、企业官网与招聘公告' },
  { title: '站点性质', desc: '完全开源静态公益导航站，定期核对与维护更新' },
  { title: '建议反馈', desc: '欢迎补充院校/企业线索，邮箱：ty368685189@gmail.com' },
]
</script>

<template>
  <section class="min-h-screen bg-[var(--page-bg)] px-3.5 pb-16 pt-6 text-[var(--text-primary)] sm:px-6 md:pt-10">
    <div class="mx-auto flex w-full max-w-4xl flex-col gap-6 sm:gap-8">
      <header
        class="rounded-2xl border p-6 sm:p-8"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(16px)',
        }"
      >
        <div class="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold mb-3" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }">
          <span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span>关于本站</span>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          弹药工程与爆炸技术导航站
        </h1>
        <p class="mt-3.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          面向兵工学子、弹药与爆炸技术专业同学、高考生及家长的公益信息与数据归档导航站。
        </p>
      </header>

      <!-- 主要版块 -->
      <section
        class="rounded-2xl border p-6"
        :style="{
          backgroundColor: 'var(--surface-strong)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <h2 class="text-base font-bold text-[var(--text-primary)] mb-4">核心内容版块</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="item in contentScopes"
            :key="item.name"
            class="rounded-xl border p-4"
            :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }"
          >
            <h3 class="text-sm font-bold text-[var(--text-primary)]">{{ item.name }}</h3>
            <p class="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 站点说明 -->
      <section class="grid gap-3.5 sm:grid-cols-3">
        <div
          v-for="item in notes"
          :key="item.title"
          class="rounded-2xl border p-5 flex flex-col justify-between"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <span class="text-xs font-bold text-[var(--accent)]">{{ item.title }}</span>
          <p class="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{{ item.desc }}</p>
        </div>
      </section>

      <!-- 联系反馈 -->
      <footer class="flex items-center justify-between p-4 rounded-xl border" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
        <span class="text-xs text-[var(--text-tertiary)]">发现信息有误或需要补充条目？</span>
        <a
          href="mailto:ty368685189@gmail.com"
          class="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition hover:opacity-90"
          :style="{ backgroundColor: 'var(--accent)' }"
        >
          邮件联系维护者
        </a>
      </footer>
    </div>
  </section>
</template>

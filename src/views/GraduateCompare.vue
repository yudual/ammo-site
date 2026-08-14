<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { graduateCompareRows, graduateNavItems } from '../data/graduate'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-3.5 pb-14 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-20 sm:pt-6 md:pt-8">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
      <header
        class="rounded-2xl border p-5 sm:p-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(16px)',
        }"
      >
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold mb-3" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }">
            <span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>横向评估</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
            常见考研方向多维对比
          </h1>
          <p class="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            从本科匹配度、考试难点、科目重合度与毕业去向进行横向横评。
          </p>
        </div>
        <p class="text-xs text-[var(--text-tertiary)]">
          * 科目仅供参考，以目标院校当年官方招生简章为准
        </p>
      </header>

      <!-- 移动端卡片视图 (< sm 屏幕) -->
      <section class="flex flex-col gap-3 sm:hidden">
        <article
          v-for="row in graduateCompareRows"
          :key="row.direction"
          class="rounded-2xl border p-4.5 flex flex-col gap-3"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="flex items-center justify-between border-b pb-2.5" :style="{ borderColor: 'var(--border)' }">
            <h2 class="text-base font-black text-[var(--text-primary)]">{{ row.direction }}</h2>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[var(--accent-soft)] text-[var(--accent)]">
              匹配：{{ row.match }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded-xl bg-[var(--surface-muted)]/50 border border-[var(--border)]">
              <span class="text-[11px] text-[var(--text-tertiary)] block">主要难点</span>
              <strong class="text-[var(--text-primary)] mt-1 block">{{ row.difficulty }}</strong>
            </div>
            <div class="p-2.5 rounded-xl bg-[var(--surface-muted)]/50 border border-[var(--border)]">
              <span class="text-[11px] text-[var(--text-tertiary)] block">常见科目</span>
              <strong class="text-[var(--text-primary)] mt-1 block font-numeric">{{ row.commonSubjects }}</strong>
            </div>
          </div>

          <div class="text-xs leading-relaxed text-[var(--text-secondary)]">
            <span class="font-bold text-[var(--text-primary)]">毕业去向：</span>
            <span>{{ row.outcome }}</span>
          </div>

          <div v-if="row.notFor" class="text-xs leading-relaxed text-[var(--status-warning)] bg-[var(--status-warning-soft)] p-2.5 rounded-xl border border-[var(--status-warning-border)]">
            <span class="font-bold">注意：</span>
            <span>{{ row.notFor }}</span>
          </div>
        </article>
      </section>

      <!-- 桌面端表格视图 (>= sm 屏幕) -->
      <section
        class="hidden sm:block overflow-x-auto rounded-2xl border"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
        role="region"
        aria-label="考研方向对比表"
        tabindex="0"
      >
        <table class="graduate-table w-full min-w-[54rem] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr>
              <th class="sticky-col th-sticky">方向</th>
              <th>本科匹配</th>
              <th>主要难点</th>
              <th>常见科目</th>
              <th>毕业去向</th>
              <th>不太适合</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in graduateCompareRows" :key="row.direction">
              <td class="sticky-col td-sticky font-bold text-[var(--text-primary)]">{{ row.direction }}</td>
              <td><span class="rounded-md px-2 py-0.5 bg-[var(--accent-soft)] text-[var(--accent)] font-semibold text-xs">{{ row.match }}</span></td>
              <td>{{ row.difficulty }}</td>
              <td class="font-numeric">{{ row.commonSubjects }}</td>
              <td>{{ row.outcome }}</td>
              <td class="text-[var(--text-tertiary)]">{{ row.notFor }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- 3 条择校决策要点 -->
      <section class="grid gap-4 md:grid-cols-3">
        <article
          class="rounded-2xl border p-5"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <h2 class="text-sm sm:text-base font-bold text-[var(--text-primary)]">共享科目优先</h2>
          </div>
          <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            主目标和备选目标尽量共享数学、专业课或复试基础，减少临时换方向或调剂时的沉没成本。
          </p>
        </article>

        <article
          class="rounded-2xl border p-5"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <h2 class="text-sm sm:text-base font-bold text-[var(--text-primary)]">复试风险要早看</h2>
          </div>
          <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            跨考到控制、电子信息或材料时，要提前准备能解释转向逻辑的实验项目、课设与代码能力。
          </p>
        </article>

        <article
          class="rounded-2xl border p-5"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <h2 class="text-sm sm:text-base font-bold text-[var(--text-primary)]">把硬约束写在前面</h2>
          </div>
          <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
            如果排斥军工涉密、试验场外场、工厂一线或非一二线城市，在择校最初阶段就要作为排除项。
          </p>
        </article>
      </section>
    </main>
  </section>
</template>

<style scoped>
.graduate-table th,
.graduate-table td {
  border-bottom: 1px solid var(--border);
  padding: 0.9rem 1rem;
  vertical-align: top;
  line-height: 1.6;
}

.graduate-table th {
  color: var(--text-tertiary);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  background-color: var(--surface-strong);
}

.graduate-table td {
  color: var(--text-secondary);
  background-color: var(--surface-strong);
}

.graduate-table .th-sticky,
.graduate-table .td-sticky {
  position: sticky;
  left: 0;
  z-index: 2;
  background-color: var(--surface-strong);
  box-shadow: 4px 0 6px -4px rgba(0, 0, 0, 0.1);
}
</style>

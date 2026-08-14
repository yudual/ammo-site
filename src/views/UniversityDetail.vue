<script setup lang="ts">
import ReadingProgress from '../components/ReadingProgress.vue'
import AppIcon from '../components/AppIcon.vue'
import ActionButton from '../components/ActionButton.vue'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import StatusPill from '../components/StatusPill.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { universities, getUniversityById, type UniversityLink } from '../data/universities'
import SchoolLogo from '../components/SchoolLogo.vue'
import SourceList from '../components/SourceList.vue'
import { useShareLink } from '../composables/useShareLink'
import { useDetailNav } from '../composables/useDetailNav'

const route = useRoute()

const universityId = computed(() => String(route.params.id))
const university = computed(() => getUniversityById(String(route.params.id)))
const research = computed(() => university.value?.research)
const verification = computed(() => university.value?.verification)

const { isCopied, copyShareLink } = useShareLink()

const {
  activeSection,
  navSections,
  scrollToSection,
  goBack,
  totalCount,
  currentIndex,
  prevItem,
  nextItem,
} = useDetailNav({
  primaryKey: 'universities',
  items: universities,
  currentId: universityId,
  hasVerification: computed(() => Boolean(verification.value)),
})

const referenceLinks = computed(() => {
  if (!university.value) {
    return []
  }

  const links: UniversityLink[] = [...university.value.links]

  if (!links.some((link) => link.url === university.value?.officialUrl)) {
    links.unshift({
      title: `${university.value.name}官网`,
      type: '学校官网',
      url: university.value.officialUrl,
      note: '学校基础信息、信息公开和院系导航入口。',
    })
  }

  if (university.value.majorUrl && !links.some((link) => link.url === university.value?.majorUrl)) {
    links.push({
      title: '学院 / 专业入口',
      type: '学院官网',
      url: university.value.majorUrl,
      note: '用于核对专业方向、学院设置和培养线索。',
    })
  }

  return links
})

const primaryAction = computed(() => {
  const links = referenceLinks.value

  return (
    links.find((link) => link.type === '招生网') ||
    links.find((link) => link.type === '招生目录') ||
    links.find((link) => link.type === '学院官网') ||
    links[0]
  )
})

const quickFacts = computed(() => {
  if (!university.value) {
    return []
  }

  return [
    { label: '院校层次', value: university.value.tier },
    { label: '所在地区', value: `${university.value.city} · ${university.value.province}` },
    { label: '专业相关度', value: verification.value?.relevanceLevel || '待核对' },
    { label: '最后核验', value: verification.value?.updatedAt || '待补充' },
  ]
})

const profileRows = computed(() => {
  if (!university.value) {
    return []
  }

  return [
    { label: '学校简称', value: university.value.shortName },
    { label: '城市 / 省份', value: `${university.value.city} · ${university.value.province}` },
    { label: '学校层次', value: university.value.tier },
    { label: '专业侧重', value: university.value.focus },
    { label: '特色标签', value: university.value.tags.join(' / ') },
    { label: '学校官网', value: university.value.officialUrl },
    { label: '学院 / 专业入口', value: university.value.majorUrl || '待补充' },
  ]
})

const frontPending = computed(() => verification.value?.pendingFields.slice(0, 3) || [])
const frontReminders = computed(() => university.value?.reminders.slice(0, 2) || [])
const sourceCount = computed(() => research.value?.sources.length || 0)
const verifiedCount = computed(() => verification.value?.verifiedFields.length || 0)
const pendingCount = computed(() => verification.value?.pendingFields.length || 0)

function linkPurpose(type: UniversityLink['type']) {
  const purposeMap: Record<UniversityLink['type'], string> = {
    学校官网: '基础信息',
    招生网: '章程 / 计划',
    学院官网: '专业方向',
    招生目录: '分省计划',
    就业报告: '就业去向',
    教学质量报告: '培养数据',
    研究生招生: '研究生招生',
    新闻资料: '补充线索',
    其他: '延伸资料',
  }

  return purposeMap[type]
}
</script>

<template>
  <div class="university-detail-page-wrap">
    <ReadingProgress />
    <section class="university-detail-page min-h-screen overflow-x-clip bg-[var(--page-bg)] px-3.5 pb-12 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-16 sm:pt-6 md:pt-8">
      <div class="university-detail-shell mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-6">
        <template v-if="university">
          
          <!-- 头部 Header 卡片 -->
          <header
            class="university-detail-hero rounded-2xl border p-5 sm:p-7"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'blur(16px)',
            }"
          >
            <!-- 顶栏操作区：返回 + 快速跨页 + 分享 -->
            <div class="flex flex-wrap items-center justify-between gap-2.5 pb-5 border-b mb-5" :style="{ borderColor: 'var(--border)' }">
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition border hover:bg-[var(--surface-muted)] cursor-pointer"
                  :style="{
                    backgroundColor: 'var(--surface-strong)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }"
                  @click="goBack"
                >
                  <AppIcon name="arrow-left" class="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>回院校一览</span>
                </button>
                <ActionButton to="/companies" variant="secondary" size="sm">
                  看企业名录
                </ActionButton>
                <ActionButton to="/graduate" variant="tonal" size="sm">
                  考研方向
                </ActionButton>
              </div>

              <button
                type="button"
                class="rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition border flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
                :style="{
                  backgroundColor: isCopied ? 'var(--accent-soft)' : 'var(--surface-strong)',
                  borderColor: isCopied ? 'var(--accent)' : 'var(--border)',
                  color: isCopied ? 'var(--accent)' : 'var(--text-secondary)',
                }"
                @click="copyShareLink"
              >
                <AppIcon :name="isCopied ? 'check' : 'link'" :size="15" />
                <span>{{ isCopied ? '链接已复制！' : '分享本页' }}</span>
              </button>
            </div>

            <!-- 主标题与高校 Logo -->
            <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] xl:items-start">
              <div class="flex items-start gap-4 min-w-0">
                <div
                  class="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl border p-2"
                  :style="{
                    backgroundColor: 'var(--surface-strong)',
                    borderColor: 'var(--border)',
                  }"
                >
                  <SchoolLogo :src="university.logo" :name="university.name" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="mb-2 flex flex-wrap items-center gap-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">院校档案</span>
                    <StatusPill :value="verification?.relevanceLevel" prefix="相关度" size="xs" />
                    <StatusPill :value="verification?.status || '资料待核对'" size="xs" />
                  </div>

                  <h1 class="university-name-title text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
                    {{ university.name }}
                  </h1>

                  <p class="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                    {{ university.overview }}
                  </p>

                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                      class="rounded-md px-2.5 py-1 text-xs font-semibold"
                      :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
                    >
                      {{ university.tier }}
                    </span>
                    <span
                      class="rounded-md px-2.5 py-1 text-xs font-semibold"
                      :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                    >
                      {{ university.city }} · {{ university.province }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 待核对提示侧栏 -->
              <aside
                class="rounded-xl border p-4.5"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--status-warning-border)',
                }"
              >
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[var(--status-warning)] flex items-center gap-1.5">
                    <span class="h-2 w-2 rounded-full bg-[var(--status-warning)]" />
                    <span>待核验项目</span>
                  </span>
                  <span
                    class="rounded-md px-2 py-0.5 text-xs font-bold font-numeric"
                    :style="{ backgroundColor: 'var(--status-warning-soft)', color: 'var(--status-warning)' }"
                  >
                    {{ pendingCount }} 项
                  </span>
                </div>

                <div v-if="frontPending.length" class="mt-3 flex flex-wrap gap-1.5">
                  <span
                    v-for="item in frontPending"
                    :key="item"
                    class="rounded-md border px-2 py-0.5 text-xs leading-normal"
                    :style="{
                      backgroundColor: 'var(--surface-muted)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }"
                  >
                    {{ item }}
                  </span>
                </div>

                <div v-if="primaryAction" class="mt-4 pt-3 border-t flex flex-wrap gap-2" :style="{ borderColor: 'var(--border)' }">
                  <ActionButton :href="primaryAction.url" variant="primary" size="sm" new-tab>
                    访问{{ primaryAction.type }}
                  </ActionButton>
                  <ActionButton v-if="university.majorUrl" :href="university.majorUrl" variant="secondary" size="sm" new-tab>
                    专业官网
                  </ActionButton>
                </div>
              </aside>
            </div>

            <!-- 参数速览看板 (Quick Facts Grid) -->
            <div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t pt-5" :style="{ borderColor: 'var(--border)' }">
              <div
                v-for="fact in quickFacts"
                :key="fact.label"
                class="flex flex-col p-3 rounded-xl border"
                :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
              >
                <span class="text-[11px] font-medium text-[var(--text-tertiary)]">{{ fact.label }}</span>
                <strong class="mt-1 text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">{{ fact.value }}</strong>
              </div>
            </div>
          </header>

          <!-- 二级小导航 -->
          <nav
            class="university-detail-subnav overflow-x-auto rounded-xl border p-1.5 no-scrollbar"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
            aria-label="院校详情小导航"
          >
            <div class="flex min-w-max gap-1">
              <button
                v-for="section in navSections"
                :key="section.id"
                type="button"
                class="rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition cursor-pointer"
                :aria-pressed="activeSection === section.id"
                :style="{
                  backgroundColor: activeSection === section.id ? 'var(--accent)' : 'transparent',
                  color: activeSection === section.id ? '#ffffff' : 'var(--text-secondary)',
                }"
                @click="scrollToSection(section.id)"
              >
                {{ section.label }}
              </button>
            </div>
          </nav>

          <!-- 详情主体内容 -->
          <main
            class="detail-content-shell rounded-2xl border p-5 sm:p-7 flex flex-col gap-10"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'blur(16px)',
            }"
          >
            <!-- 1. 概览 Section -->
            <section id="overview" class="detail-section scroll-target" aria-label="概览">
              <div class="flex items-center gap-2 mb-4">
                <span class="h-4 w-1 rounded-full bg-[var(--accent)]" />
                <h2 class="text-base sm:text-lg font-bold text-[var(--text-primary)]">专业侧重与报考提醒</h2>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <div class="rounded-xl border p-4.5" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                  <p class="text-xs font-bold text-[var(--text-primary)] mb-2">专业方向侧重</p>
                  <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">{{ university.focus }}</p>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in university.tags"
                      :key="tag"
                      class="rounded-md px-2 py-0.5 text-[11px] font-medium"
                      :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="rounded-xl border p-4.5" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                  <p class="text-xs font-bold text-[var(--status-warning)] mb-2">报考注意提醒</p>
                  <ul v-if="frontReminders.length" class="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    <li v-for="reminder in frontReminders" :key="reminder" class="flex items-start gap-1.5">
                      <span class="text-[var(--status-warning)] font-bold">!</span>
                      <span>{{ reminder }}</span>
                    </li>
                  </ul>
                  <p v-else class="text-xs text-[var(--text-tertiary)]">请以当年招生简章为准。</p>
                </div>
              </div>
            </section>

            <!-- 2. 核验情况 Section -->
            <section v-if="verification" id="verification" class="detail-section scroll-target" aria-label="核验">
              <div class="flex items-center gap-2 mb-4">
                <span class="h-4 w-1 rounded-full bg-[var(--accent)]" />
                <h2 class="text-base sm:text-lg font-bold text-[var(--text-primary)]">资料核验情况</h2>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <div class="rounded-xl border p-4 flex flex-col justify-between" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                  <div>
                    <span class="text-xs text-[var(--text-tertiary)]">核验结论</span>
                    <h3 class="mt-1 text-sm font-bold text-[var(--text-primary)]">{{ verification.status }}</h3>
                    <p class="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{{ verification.summary }}</p>
                  </div>

                  <div class="mt-4 grid grid-cols-3 gap-2 text-center pt-3 border-t" :style="{ borderColor: 'var(--border)' }">
                    <div>
                      <span class="text-[10px] text-[var(--text-tertiary)]">已核验</span>
                      <strong class="block text-sm font-bold font-numeric text-[var(--status-positive)]">{{ verifiedCount }}</strong>
                    </div>
                    <div>
                      <span class="text-[10px] text-[var(--text-tertiary)]">待核对</span>
                      <strong class="block text-sm font-bold font-numeric text-[var(--status-warning)]">{{ pendingCount }}</strong>
                    </div>
                    <div>
                      <span class="text-[10px] text-[var(--text-tertiary)]">信源</span>
                      <strong class="block text-sm font-bold font-numeric text-[var(--text-primary)]">{{ sourceCount }}</strong>
                    </div>
                  </div>
                </div>

                <div class="rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--status-positive-border)' }">
                  <p class="text-xs font-bold text-[var(--status-positive)] mb-2 flex items-center gap-1">
                    <span class="h-1.5 w-1.5 rounded-full bg-[var(--status-positive)]" />
                    <span>已核验信息</span>
                  </p>
                  <ul v-if="verification.verifiedFields.length" class="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    <li v-for="field in verification.verifiedFields" :key="field" class="flex items-start gap-1.5">
                      <span class="text-[var(--status-positive)] font-bold">✓</span>
                      <span>{{ field }}</span>
                    </li>
                  </ul>
                  <p v-else class="text-xs text-[var(--text-tertiary)]">暂无</p>
                </div>

                <div class="rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--status-warning-border)' }">
                  <p class="text-xs font-bold text-[var(--status-warning)] mb-2 flex items-center gap-1">
                    <span class="h-1.5 w-1.5 rounded-full bg-[var(--status-warning)]" />
                    <span>待核对信息</span>
                  </p>
                  <ul class="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    <li v-for="field in verification.pendingFields" :key="field" class="flex items-start gap-1.5">
                      <span class="text-[var(--status-warning)] font-bold">?</span>
                      <span>{{ field }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- 3. 信息档案 Section -->
            <section id="profile" class="detail-section scroll-target" aria-label="档案">
              <div class="flex items-center gap-2 mb-4">
                <span class="h-4 w-1 rounded-full bg-[var(--accent)]" />
                <h2 class="text-base sm:text-lg font-bold text-[var(--text-primary)]">高校基础信息档案</h2>
              </div>

              <div class="overflow-hidden rounded-xl border divide-y" :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-strong)' }">
                <div
                  v-for="row in profileRows"
                  :key="row.label"
                  class="grid gap-2 px-4 py-3 text-xs sm:text-sm md:grid-cols-[10rem_minmax(0,1fr)] items-center"
                >
                  <span class="font-semibold text-[var(--text-tertiary)]">{{ row.label }}</span>
                  <span class="text-[var(--text-primary)] font-medium">{{ row.value }}</span>
                </div>
              </div>
            </section>

            <!-- 4. 调研结论与来源 Section -->
            <section id="research" class="detail-section scroll-target" aria-label="来源">
              <div class="flex items-center gap-2 mb-4">
                <span class="h-4 w-1 rounded-full bg-[var(--accent)]" />
                <h2 class="text-base sm:text-lg font-bold text-[var(--text-primary)]">官方入口与深度调研</h2>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mb-6">
                <template v-if="referenceLinks.length">
                  <a
                    v-for="link in referenceLinks"
                    :key="`${link.type}-${link.url}`"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex flex-col justify-between p-4 rounded-xl border transition hover:-translate-y-0.5 hover:border-[var(--accent-border)]"
                    :style="{
                      backgroundColor: 'var(--surface-strong)',
                      borderColor: 'var(--border)',
                    }"
                  >
                    <div>
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-secondary)]">
                          {{ link.type }}
                        </span>
                        <span class="text-[10px] text-[var(--text-tertiary)]">{{ linkPurpose(link.type) }}</span>
                      </div>
                      <h3 class="mt-2 text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                        {{ link.title }}
                      </h3>
                      <p v-if="link.note" class="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">
                        {{ link.note }}
                      </p>
                    </div>
                    <span class="mt-3 text-xs font-semibold text-[var(--accent)] flex items-center gap-1">
                      <span>打开链接</span>
                      <span>&rarr;</span>
                    </span>
                  </a>
                </template>
              </div>

              <div v-if="research" class="rounded-xl border p-5" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                <div class="flex items-center justify-between mb-3 pb-3 border-b" :style="{ borderColor: 'var(--border)' }">
                  <span class="text-xs font-bold text-[var(--text-tertiary)] uppercase">深度调研评述</span>
                  <span class="text-xs text-[var(--text-tertiary)] font-numeric">更新：{{ research.updatedAt }}</span>
                </div>

                <p class="text-xs sm:text-sm leading-relaxed text-[var(--text-primary)] font-medium">
                  {{ research.conclusion }}
                </p>

                <div class="mt-5 grid gap-4 md:grid-cols-2">
                  <div class="rounded-lg p-3.5 bg-[var(--surface-muted)]/50 border border-[var(--border)]">
                    <p class="text-xs font-bold text-[var(--status-positive)] mb-2">优势与特色</p>
                    <ul class="space-y-1 text-xs text-[var(--text-secondary)]">
                      <li v-for="signal in research.keySignals" :key="signal" class="flex items-start gap-1.5">
                        <span class="text-[var(--status-positive)] font-bold">·</span>
                        <span>{{ signal }}</span>
                      </li>
                    </ul>
                  </div>

                  <div class="rounded-lg p-3.5 bg-[var(--surface-muted)]/50 border border-[var(--border)]">
                    <p class="text-xs font-bold text-[var(--status-warning)] mb-2">报考注意与约束</p>
                    <ul class="space-y-1 text-xs text-[var(--text-secondary)]">
                      <li v-for="risk in research.risks" :key="risk" class="flex items-start gap-1.5">
                        <span class="text-[var(--status-warning)] font-bold">·</span>
                        <span>{{ risk }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <SourceList :sources="research.sources" />
              </div>
            </section>
          </main>

          <!-- 底部相邻条目导航 (Prev / Next) -->
          <nav v-if="university" class="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between" aria-label="相邻条目">
            <RouterLink
              v-if="prevItem"
              :to="{ name: 'university-detail', params: { id: prevItem.id } }"
              class="group min-w-0 flex-1 rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--glass-shadow)',
              }"
            >
              <span class="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]"><AppIcon name="arrow-left" :size="14" /> 上一所</span>
              <span class="mt-1 block truncate text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{{ prevItem.name }}</span>
            </RouterLink>

            <div v-else class="min-w-0 flex-1 rounded-2xl border border-dashed p-4 opacity-50 flex flex-col justify-center" :style="{ borderColor: 'var(--border)' }">
              <span class="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]"><AppIcon name="arrow-left" :size="14" /> 已是第一所</span>
            </div>

            <span class="hidden shrink-0 self-center px-3 text-xs font-numeric text-[var(--text-tertiary)] sm:block">
              {{ currentIndex + 1 }} / {{ totalCount }}
            </span>

            <RouterLink
              v-if="nextItem"
              :to="{ name: 'university-detail', params: { id: nextItem.id } }"
              class="group min-w-0 flex-1 rounded-2xl border p-4 text-right transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--glass-shadow)',
              }"
            >
              <span class="flex items-center justify-end gap-1.5 text-xs text-[var(--text-tertiary)]">下一所 <AppIcon name="arrow-right" :size="14" /></span>
              <span class="mt-1 block truncate text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{{ nextItem.name }}</span>
            </RouterLink>

            <div v-else class="min-w-0 flex-1 rounded-2xl border border-dashed p-4 text-right opacity-50 flex flex-col justify-center" :style="{ borderColor: 'var(--border)' }">
              <span class="flex items-center justify-end gap-1.5 text-xs text-[var(--text-tertiary)]">已是最后一所 <AppIcon name="arrow-right" :size="14" /></span>
            </div>
          </nav>
        </template>

        <EmptyStatePanel
          v-else
          eyebrow="院校档案"
          title="没有找到这所院校"
          description="可能是链接有误，或者该院校尚未收录。"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.university-detail-page {
  max-width: 100vw;
}

.university-detail-shell {
  max-width: min(72rem, 100%);
}

.university-detail-hero {
  position: relative;
  overflow: hidden;
}

.university-detail-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 85, 67, 0.05), transparent 34%),
    linear-gradient(315deg, rgba(42, 122, 76, 0.04), transparent 42%);
  pointer-events: none;
}

.university-detail-hero > * {
  position: relative;
  z-index: 1;
}

.university-name-title {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-all;
}

.scroll-target {
  scroll-margin-top: 6rem;
}
</style>

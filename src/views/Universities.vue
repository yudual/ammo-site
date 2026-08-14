<script setup lang="ts">
import ActionButton from '../components/ActionButton.vue'
import AppIcon from '../components/AppIcon.vue'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import StatusPill from '../components/StatusPill.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  universities,
  type University,
  type RelevanceLevel,
  type UniversityTier,
  type VerificationStatus,
} from '../data/universities'
import SchoolLogo from '../components/SchoolLogo.vue'
import { countBy } from '../utils/status'
import { getPaginationItems } from '../utils/pagination'
import { useShareLink } from '../composables/useShareLink'

const route = useRoute()
const router = useRouter()

const keyword = ref('')
const selectedTier = ref<'全部' | UniversityTier>('全部')
const selectedProvince = ref('全部')
const selectedRelevance = ref<'全部' | RelevanceLevel>('全部')
const selectedStatus = ref<'全部' | VerificationStatus>('全部')
const onlyWithResearch = ref(false)
const filtersOpen = ref(false)
const PAGE_SIZE_OPTIONS = [10, 20, 30] as const
const listPageSize = ref<(typeof PAGE_SIZE_OPTIONS)[number]>(10)
const currentUniversityPage = ref(1)
const universityListTop = ref<HTMLElement | null>(null)
const tierOptions: UniversityTier[] = ['985 / 211', '211', '普通本科']
const relevanceOptions: RelevanceLevel[] = ['高', '中', '低', '待核对']
const statusOptions: VerificationStatus[] = ['已核验', '部分核验', '过期待复查']
const relevanceRank: Record<RelevanceLevel, number> = {
  高: 0,
  中: 1,
  低: 2,
  待核对: 3,
}

const isInitializing = ref(true)
const isSyncingFromUrl = ref(false)

function resetFilterState() {
  keyword.value = ''
  selectedTier.value = '全部'
  selectedProvince.value = '全部'
  selectedRelevance.value = '全部'
  selectedStatus.value = '全部'
  onlyWithResearch.value = false
  currentUniversityPage.value = 1
  listPageSize.value = 10
}

// 从 URL 初始化筛选状态
const initFromQuery = () => {
  resetFilterState()
  const query = route.query
  if (query.keyword) keyword.value = String(query.keyword)
  if (query.tier && tierOptions.includes(String(query.tier) as UniversityTier)) {
    selectedTier.value = String(query.tier) as UniversityTier
  }
  if (query.province) selectedProvince.value = String(query.province)
  if (query.relevance && relevanceOptions.includes(String(query.relevance) as RelevanceLevel)) {
    selectedRelevance.value = String(query.relevance) as RelevanceLevel
  }
  if (query.status && statusOptions.includes(String(query.status) as VerificationStatus)) {
    selectedStatus.value = String(query.status) as VerificationStatus
  }
  if (query.research === '1') onlyWithResearch.value = true
  if (query.page) {
    const pageNum = parseInt(String(query.page), 10)
    if (!isNaN(pageNum) && pageNum > 0) {
      currentUniversityPage.value = pageNum
    }
  }
  if (query.size) {
    const ps = parseInt(String(query.size), 10)
    if (ps === 10 || ps === 20 || ps === 30) listPageSize.value = ps
  }
}

initFromQuery()

nextTick(() => {
  clampUniversityPage()
  isInitializing.value = false
  updateUrlQuery()
})

const updateUrlQuery = () => {
  const query: Record<string, string> = {}
  
  if (keyword.value.trim()) query.keyword = keyword.value.trim()
  if (selectedTier.value !== '全部') query.tier = selectedTier.value
  if (selectedProvince.value !== '全部') query.province = selectedProvince.value
  if (selectedRelevance.value !== '全部') query.relevance = selectedRelevance.value
  if (selectedStatus.value !== '全部') query.status = selectedStatus.value
  if (onlyWithResearch.value) query.research = '1'
  if (currentUniversityPage.value > 1) query.page = String(currentUniversityPage.value)
  if (listPageSize.value !== 10) query.size = String(listPageSize.value)
  
  const nextQuery = query
  const currentQuery = route.query
  const currentEntries = Object.entries(currentQuery).filter(([, value]) => value !== undefined && value !== null && value !== '')
  const nextEntries = Object.entries(nextQuery)
  const sameKeys =
    nextEntries.length === currentEntries.length &&
    nextEntries.every(([key, value]) => String(currentQuery[key] ?? '') === value)

  if (sameKeys) {
    return
  }

  isSyncingFromUrl.value = true
  router.replace({
    path: route.path,
    query: nextQuery,
  }).finally(() => {
    isSyncingFromUrl.value = false
  })
}

// 深度监听变化
watch(
  [
    keyword,
    selectedTier,
    selectedProvince,
    selectedRelevance,
    selectedStatus,
    onlyWithResearch,
    listPageSize,
  ],
  () => {
    if (isInitializing.value || isSyncingFromUrl.value) return
    currentUniversityPage.value = 1
    updateUrlQuery()
  }
)

watch(currentUniversityPage, () => {
  if (isInitializing.value || isSyncingFromUrl.value) return
  updateUrlQuery()
})

const { isCopied, copyShareLink } = useShareLink()
const priorityUniversityIds = ['aust']
const provinceOptions = computed(() =>
  Array.from(new Set(universities.map((university) => university.province))).sort(),
)

const activeFilterCount = computed(
  () =>
    [
      keyword.value.trim(),
      selectedTier.value !== '全部' ? selectedTier.value : '',
      selectedProvince.value !== '全部' ? selectedProvince.value : '',
      selectedRelevance.value !== '全部' ? `相关度${selectedRelevance.value}` : '',
      selectedStatus.value !== '全部' ? selectedStatus.value : '',
      onlyWithResearch.value ? '有调研' : '',
    ].filter(Boolean).length,
)

const hasActiveFilters = computed(() => activeFilterCount.value > 0)

const activeChips = computed(() => {
  const chips: { key: string; label: string }[] = []
  const kw = keyword.value.trim()
  if (kw) chips.push({ key: 'keyword', label: `"${kw}"` })
  if (selectedTier.value !== '全部') chips.push({ key: 'tier', label: selectedTier.value })
  if (selectedProvince.value !== '全部') chips.push({ key: 'province', label: selectedProvince.value })
  if (selectedRelevance.value !== '全部') chips.push({ key: 'relevance', label: `相关度${selectedRelevance.value}` })
  if (selectedStatus.value !== '全部') chips.push({ key: 'status', label: selectedStatus.value })
  if (onlyWithResearch.value) chips.push({ key: 'research', label: '有调研' })
  return chips
})

function removeChip(key: string) {
  switch (key) {
    case 'keyword': keyword.value = ''; break
    case 'tier': selectedTier.value = '全部'; break
    case 'province': selectedProvince.value = '全部'; break
    case 'relevance': selectedRelevance.value = '全部'; break
    case 'status': selectedStatus.value = '全部'; break
    case 'research': onlyWithResearch.value = false; break
  }
}

function resetFilters() {
  keyword.value = ''
  selectedTier.value = '全部'
  selectedProvince.value = '全部'
  selectedRelevance.value = '全部'
  selectedStatus.value = '全部'
  onlyWithResearch.value = false
  filtersOpen.value = false
}

function toggleHighRelevance() {
  selectedRelevance.value = selectedRelevance.value === '高' ? '全部' : '高'
}

function togglePartialVerification() {
  selectedStatus.value = selectedStatus.value === '部分核验' ? '全部' : '部分核验'
}

function toggleWithResearch() {
  onlyWithResearch.value = !onlyWithResearch.value
}

function getPriorityRank(id: string) {
  const index = priorityUniversityIds.indexOf(id)

  return index === -1 ? priorityUniversityIds.length : index
}

const filteredUniversities = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return universities
    .filter((university) => {
      const matchesTier = selectedTier.value === '全部' || university.tier === selectedTier.value
      const matchesProvince =
        selectedProvince.value === '全部' || university.province === selectedProvince.value
      const matchesRelevance =
        selectedRelevance.value === '全部' || university.verification.relevanceLevel === selectedRelevance.value
      const matchesStatus =
        selectedStatus.value === '全部' || university.verification.status === selectedStatus.value
      const matchesResearch = !onlyWithResearch.value || Boolean(university.research)

      const searchableText = [
        university.name,
        university.shortName,
        university.city,
        university.province,
        university.tier,
        university.focus,
        university.overview,
        university.verification.status,
        university.verification.relevanceLevel,
        university.verification.summary,
        ...university.tags,
        ...university.suitableFor,
        ...university.reminders,
        ...university.verification.verifiedFields,
        ...university.verification.pendingFields,
      ]
        .join(' ')
        .toLowerCase()

      const matchesKeyword =
        normalizedKeyword.length === 0 || searchableText.includes(normalizedKeyword)

      return (
        matchesTier &&
        matchesProvince &&
        matchesRelevance &&
        matchesStatus &&
        matchesResearch &&
        matchesKeyword
      )
    })
    .sort((left, right) => {
      const priorityDiff = getPriorityRank(left.id) - getPriorityRank(right.id)

      if (priorityDiff !== 0) {
        return priorityDiff
      }

      const relevanceDiff =
        relevanceRank[left.verification.relevanceLevel] -
        relevanceRank[right.verification.relevanceLevel]

      if (relevanceDiff !== 0) {
        return relevanceDiff
      }

      return left.name.localeCompare(right.name, 'zh-Hans-CN')
    })
})

const universityPageCount = computed(() =>
  Math.max(Math.ceil(filteredUniversities.value.length / listPageSize.value), 1),
)

function clampUniversityPage() {
  const nextPage = Math.min(Math.max(currentUniversityPage.value, 1), universityPageCount.value)

  if (nextPage !== currentUniversityPage.value) {
    currentUniversityPage.value = nextPage
  }
}

const universityPageStart = computed(() => (currentUniversityPage.value - 1) * listPageSize.value)
const visibleUniversities = computed(() =>
  filteredUniversities.value.slice(
    universityPageStart.value,
    universityPageStart.value + listPageSize.value,
  ),
)

const universityPageNumbers = computed(() =>
  getPaginationItems(currentUniversityPage.value, universityPageCount.value),
)

watch(filteredUniversities, () => {
  if (isInitializing.value) return
  clampUniversityPage()
})

const tierCounts = computed(() => countBy(universities, (university) => university.tier))
const statusCounts = computed(() => countBy(universities, (university) => university.verification.status))
const highRelevanceCount = computed(
  () => universities.filter((university) => university.verification.relevanceLevel === '高').length,
)
const withResearchCount = computed(() => universities.filter((university) => university.research).length)

function getPrimaryLink(university: University) {
  return (
    university.links.find((link) => link.type === '招生网' || link.type === '招生目录') ||
    university.links.find((link) => link.type === '学院官网') ||
    university.links.find((link) => link.type === '学校官网') ||
    university.links[0]
  )
}

function getPendingPreview(university: University) {
  return university.verification.pendingFields.slice(0, 2).join('、') || '当年招生目录和录取数据'
}

function getPendingCount(university: University) {
  return university.verification.pendingFields.length
}

async function setUniversityPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), universityPageCount.value)

  if (nextPage === currentUniversityPage.value) {
    return
  }

  currentUniversityPage.value = nextPage
  await nextTick()
  universityListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateFilters(callback: () => void) {
  callback()
  if (!isInitializing.value) {
    currentUniversityPage.value = 1
  }
}

watch(
  () => route.query,
  () => {
    if (isInitializing.value || isSyncingFromUrl.value) return
    isSyncingFromUrl.value = true
    try {
      initFromQuery()
      clampUniversityPage()
    } finally {
      nextTick(() => {
        isSyncingFromUrl.value = false
        updateUrlQuery()
      })
    }
  },
  { deep: true },
)
</script>

<template>
  <section class="universities-page min-h-screen bg-[var(--page-bg)] px-3.5 pb-12 pt-4 text-[var(--text-primary)] sm:px-6 sm:pb-16 sm:pt-6 md:pt-8">
    <div class="universities-shell mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-5">

      <!-- 双栏容器 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-6 items-start w-full">
        
        <!-- 左栏 (1/4) - 侧边筛选器 (PC) / 底部抽屉 (Mobile) -->
        <div class="col-span-1">
          <!-- 手机端遮罩层 -->
          <div
            v-if="filtersOpen"
            class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
            @click="filtersOpen = false"
          ></div>

          <!-- 筛选面板 -->
          <section
            class="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t p-5 flex flex-col gap-4 transition-transform duration-300
                   md:sticky md:top-20 md:z-auto md:max-h-none md:overflow-visible md:rounded-2xl md:border md:p-5 md:flex md:translate-y-0"
            :class="filtersOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'blur(16px)',
            }"
          >
            <!-- 手机端抽屉拉手与头部 -->
            <div class="flex flex-col items-center pb-2 md:hidden">
              <div class="h-1.2 w-10 rounded-full bg-[var(--border-strong)] mb-3" />
              <div class="flex items-center justify-between w-full border-b pb-3" :style="{ borderColor: 'var(--border)' }">
                <span class="font-bold text-base text-[var(--text-primary)]">筛选条件</span>
                <button
                  type="button"
                  class="text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white"
                  @click="filtersOpen = false"
                >
                  确定
                </button>
              </div>
            </div>

            <div class="hidden md:flex items-center justify-between pb-1 border-b" :style="{ borderColor: 'var(--border)' }">
              <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">筛选与检索</span>
              <button
                v-if="hasActiveFilters"
                type="button"
                class="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                @click="resetFilters"
              >
                重置
              </button>
            </div>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-[var(--text-tertiary)]">关键词搜索</span>
              <input
                v-model="keyword"
                type="text"
                placeholder="比如：北京、兵器、211"
                class="h-9.5 rounded-xl border px-3 text-xs sm:text-sm outline-none transition w-full focus:border-[var(--accent)]"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              />
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-[var(--text-tertiary)]">院校层次</span>
              <select
                v-model="selectedTier"
                class="h-9.5 rounded-xl border px-3 text-xs sm:text-sm outline-none transition w-full cursor-pointer focus:border-[var(--accent)]"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部层次</option>
                <option v-for="option in tierOptions" :key="option" :value="option">
                  {{ option }}（{{ tierCounts[option] || 0 }}）
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-[var(--text-tertiary)]">所在省份</span>
              <select
                v-model="selectedProvince"
                class="h-9.5 rounded-xl border px-3 text-xs sm:text-sm outline-none transition w-full cursor-pointer focus:border-[var(--accent)]"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部省份</option>
                <option v-for="option in provinceOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-[var(--text-tertiary)]">专业相关度</span>
              <select
                v-model="selectedRelevance"
                class="h-9.5 rounded-xl border px-3 text-xs sm:text-sm outline-none transition w-full cursor-pointer focus:border-[var(--accent)]"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部相关度</option>
                <option v-for="option in relevanceOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-[var(--text-tertiary)]">资料核验状态</span>
              <select
                v-model="selectedStatus"
                class="h-9.5 rounded-xl border px-3 text-xs sm:text-sm outline-none transition w-full cursor-pointer focus:border-[var(--accent)]"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部状态</option>
                <option v-for="option in statusOptions" :key="option" :value="option">
                  {{ option }}（{{ statusCounts[option] || 0 }}）
                </option>
              </select>
            </label>

            <button
              type="button"
              class="h-10 rounded-xl border px-4 text-xs sm:text-sm font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 w-full mt-2 cursor-pointer"
              :disabled="!hasActiveFilters"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }"
              @click="resetFilters"
            >
              重置全部条件
            </button>
          </section>
        </div>

        <!-- 右栏 (3/4) - 列表与分页 -->
        <div class="col-span-1 md:col-span-3 flex flex-col gap-4 w-full min-w-0">

          <!-- 数据检索控制台 (Control Console) -->
          <header
            ref="universityListTop"
            class="flex flex-col gap-3 rounded-2xl border p-3.5 sm:p-4 w-full"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'blur(16px)',
            }"
          >
            <!-- 上层：标题与 4 项大盘数据 -->
            <div class="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between pb-3 border-b" :style="{ borderColor: 'var(--border)' }">
              <div class="flex items-center gap-2">
                <h1 class="text-base sm:text-lg font-black tracking-tight text-[var(--text-primary)]">院校一览</h1>
                <span class="text-xs text-[var(--text-tertiary)]">（含兵工高校/民爆特色/综合大学）</span>
              </div>

              <div class="mobile-summary-grid grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 text-[11px]">
                <div class="flex items-center justify-between gap-2 px-2.5 py-1 rounded-lg bg-[var(--surface-strong)] border border-[var(--border)]">
                  <span class="text-[var(--text-tertiary)]">已收录</span>
                  <strong class="font-bold font-numeric text-[var(--text-primary)]">{{ universities.length }}</strong>
                </div>
                <div class="flex items-center justify-between gap-2 px-2.5 py-1 rounded-lg bg-[var(--surface-strong)] border border-[var(--border)]">
                  <span class="text-[var(--text-tertiary)]">高相关</span>
                  <strong class="font-bold font-numeric text-[var(--text-primary)]">{{ highRelevanceCount }}</strong>
                </div>
                <div class="flex items-center justify-between gap-2 px-2.5 py-1 rounded-lg bg-[var(--surface-strong)] border border-[var(--border)]">
                  <span class="text-[var(--text-tertiary)]">有调研</span>
                  <strong class="font-bold font-numeric text-[var(--text-primary)]">{{ withResearchCount }}</strong>
                </div>
                <div class="flex items-center justify-between gap-2 px-2.5 py-1 rounded-lg bg-[var(--surface-strong)] border border-[var(--border)]">
                  <span class="text-[var(--text-tertiary)]">部分核验</span>
                  <strong class="font-bold font-numeric text-[var(--status-warning)]">{{ statusCounts['部分核验'] || 0 }}</strong>
                </div>
              </div>
            </div>

            <!-- 下层：快速筛选与分享工具条 -->
            <div class="mobile-control-row flex items-center justify-between gap-3 text-xs w-full">
              <!-- 左侧：筛选器胶囊群 -->
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 min-w-0">
                <!-- 高级筛选唤起 (仅移动端显示，PC端侧边栏常驻) -->
                <button
                  type="button"
                  class="rounded-lg px-2.5 py-1 border font-semibold flex items-center gap-1 shrink-0 md:hidden cursor-pointer"
                  :style="{
                    backgroundColor: activeFilterCount ? 'var(--accent-soft)' : 'var(--surface-strong)',
                    borderColor: activeFilterCount ? 'var(--accent)' : 'var(--border)',
                    color: activeFilterCount ? 'var(--accent)' : 'var(--text-secondary)',
                  }"
                  @click="filtersOpen = !filtersOpen"
                >
                  <AppIcon name="search" class="w-3.5 h-3.5" />
                  <span>{{ activeFilterCount ? `筛选(${activeFilterCount})` : '筛选' }}</span>
                </button>

                <button
                  type="button"
                  class="rounded-lg px-2.5 py-1 border font-semibold shrink-0 cursor-pointer transition"
                  :style="{
                    backgroundColor: selectedRelevance === '高' ? 'var(--accent-soft)' : 'var(--surface-strong)',
                    borderColor: selectedRelevance === '高' ? 'var(--accent)' : 'var(--border)',
                    color: selectedRelevance === '高' ? 'var(--accent)' : 'var(--text-secondary)',
                  }"
                  @click="updateFilters(toggleHighRelevance)"
                >
                  高相关
                </button>

                <button
                  type="button"
                  class="rounded-lg px-2.5 py-1 border font-semibold shrink-0 cursor-pointer transition"
                  :style="{
                    backgroundColor: onlyWithResearch ? 'var(--accent-soft)' : 'var(--surface-strong)',
                    borderColor: onlyWithResearch ? 'var(--accent)' : 'var(--border)',
                    color: onlyWithResearch ? 'var(--accent)' : 'var(--text-secondary)',
                  }"
                  @click="updateFilters(toggleWithResearch)"
                >
                  有调研
                </button>

                <button
                  type="button"
                  class="rounded-lg px-2.5 py-1 border font-semibold shrink-0 cursor-pointer transition"
                  :style="{
                    backgroundColor: selectedStatus === '部分核验' ? 'var(--accent-soft)' : 'var(--surface-strong)',
                    borderColor: selectedStatus === '部分核验' ? 'var(--accent)' : 'var(--border)',
                    color: selectedStatus === '部分核验' ? 'var(--accent)' : 'var(--text-secondary)',
                  }"
                  @click="updateFilters(togglePartialVerification)"
                >
                  部分核验
                </button>

                <!-- 清空筛选 (当有筛选时显示) -->
                <button
                  v-if="hasActiveFilters"
                  type="button"
                  class="rounded-lg px-2.5 py-1 border text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:border-[var(--accent-border)] shrink-0 bg-[var(--surface-strong)] cursor-pointer transition"
                  @click="resetFilters"
                >
                  清空
                </button>
              </div>

              <!-- 右侧：统计和复制链接 -->
              <div class="flex items-center gap-2.5 shrink-0 text-[var(--text-secondary)]" role="status" aria-live="polite">
                <span class="hidden sm:inline font-medium font-numeric text-xs">共 {{ filteredUniversities.length }} 所 · {{ currentUniversityPage }}/{{ universityPageCount }}页</span>
                <span class="sm:hidden font-medium font-numeric text-xs">共 {{ filteredUniversities.length }} 所</span>

                <button
                  type="button"
                  class="rounded-lg p-1.5 border flex items-center justify-center transition hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                  :style="{
                    backgroundColor: isCopied ? 'var(--accent-soft)' : 'var(--surface-strong)',
                    borderColor: isCopied ? 'var(--accent)' : 'var(--border)',
                    color: isCopied ? 'var(--accent)' : 'var(--text-secondary)',
                  }"
                  title="复制筛选链接"
                  @click="copyShareLink"
                >
                  <AppIcon :name="isCopied ? 'check' : 'link'" :size="15" />
                </button>
              </div>
            </div>

            <!-- 已选条件芯片：每条可单独点掉 -->
            <div
              v-if="hasActiveFilters"
              class="flex flex-wrap items-center gap-1.5 pt-2 border-t"
              :style="{ borderColor: 'var(--border)' }"
            >
              <span
                v-for="chip in activeChips"
                :key="chip.key"
                class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium transition"
                :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
              >
                {{ chip.label }}
                <button
                  type="button"
                  class="text-[var(--text-tertiary)] transition hover:text-[var(--accent)] cursor-pointer"
                  :aria-label="`取消筛选：${chip.label}`"
                  @click="removeChip(chip.key)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="h-3 w-3"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </span>
            </div>
          </header>

          <!-- 列表区 (Row-Card) -->
          <section v-if="filteredUniversities.length > 0" class="flex flex-col gap-3 w-full">
            <article
              v-for="university in visibleUniversities"
              :key="university.id"
              class="group relative rounded-2xl border p-4 sm:p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--accent-border)]"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--glass-shadow)',
              }"
            >
              <div class="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_auto] xl:items-start">
                
                <!-- 左列：高校LOGO、名称、状态、点状元数据链、概览 -->
                <div class="flex min-w-0 items-start gap-3.5">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border p-1"
                    :style="{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                    }"
                  >
                    <SchoolLogo :src="university.logo" :name="university.name" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="mb-1.5 flex flex-wrap items-center gap-2">
                      <StatusPill :value="university.verification.relevanceLevel" prefix="相关度" size="xs" />
                      <StatusPill :value="university.verification.status" size="xs" />
                      <span v-if="university.research" class="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-[var(--status-positive-soft)] text-[var(--status-positive)] border border-[var(--status-positive-border)]">
                        已调研
                      </span>
                    </div>

                    <RouterLink
                      :to="`/universities/${university.id}`"
                      class="block text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] transition hover:text-[var(--accent)]"
                    >
                      {{ university.name }}
                      <span v-if="university.shortName && university.shortName !== university.name" class="ml-1 text-xs text-[var(--text-tertiary)] font-normal">
                        ({{ university.shortName }})
                      </span>
                    </RouterLink>

                    <!-- 点状元数据链 (Meta Chain) -->
                    <div class="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--text-secondary)] font-medium">
                      <span class="font-semibold text-[var(--accent)]">{{ university.tier }}</span>
                      <span class="text-[var(--text-tertiary)]">·</span>
                      <span>{{ university.city }} · {{ university.province }}</span>
                    </div>

                    <p class="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                      {{ university.overview }}
                    </p>
                  </div>
                </div>

                <!-- 中列：专业特色与标签 -->
                <div class="rounded-xl border p-3 text-xs leading-relaxed text-[var(--text-secondary)]" :style="{ backgroundColor: 'var(--surface-muted)/40', borderColor: 'var(--border)' }">
                  <p class="font-semibold text-[var(--text-primary)] mb-1">专业方向与特色</p>
                  <p class="line-clamp-2">{{ university.focus }}</p>
                  
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in university.tags.slice(0, 3)"
                      :key="tag"
                      class="rounded-md px-2 py-0.5 text-[11px] font-medium"
                      :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <details v-if="getPendingCount(university) > 0" class="mt-2 text-[11px] text-[var(--text-tertiary)] border-t pt-1.5" :style="{ borderColor: 'var(--border)' }">
                    <summary class="w-fit cursor-pointer rounded px-1.5 py-0.5 hover:text-[var(--text-secondary)]" :style="{ backgroundColor: 'var(--surface-muted)' }">
                      待核对 {{ getPendingCount(university) }} 项
                    </summary>
                    <p class="mt-1 leading-normal">{{ getPendingPreview(university) }}</p>
                  </details>
                </div>

                <!-- 右列：操作按钮组 -->
                <div class="flex flex-row xl:flex-col items-center xl:items-end gap-2 shrink-0 pt-1">
                  <ActionButton :to="`/universities/${university.id}`" variant="primary" size="sm" class="w-full sm:w-auto">
                    看详情
                  </ActionButton>
                  <ActionButton
                    v-if="getPrimaryLink(university)"
                    :href="getPrimaryLink(university)?.url"
                    variant="secondary"
                    size="sm"
                    new-tab
                    class="w-full sm:w-auto"
                  >
                    外部入口
                  </ActionButton>
                </div>

              </div>
            </article>
          </section>

          <!-- 分页导航 -->
          <nav
            v-if="universityPageCount > 1"
            class="flex flex-col items-center justify-between gap-3 rounded-2xl border p-3.5 text-xs sm:text-sm md:flex-row w-full mt-2"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'blur(16px)',
            }"
            aria-label="院校列表分页"
          >
            <div class="flex items-center gap-1.5 text-[var(--text-secondary)]">
              <span>每页</span>
              <button
                v-for="opt in PAGE_SIZE_OPTIONS"
                :key="opt"
                type="button"
                class="min-h-7 min-w-7 rounded-lg border px-2 py-0.5 text-xs font-semibold font-numeric transition hover:-translate-y-0.5 cursor-pointer"
                :aria-pressed="opt === listPageSize ? 'true' : 'false'"
                :style="{
                  backgroundColor: opt === listPageSize ? 'var(--accent)' : 'var(--surface-strong)',
                  borderColor: opt === listPageSize ? 'var(--accent)' : 'var(--border)',
                  color: opt === listPageSize ? '#ffffff' : 'var(--text-secondary)',
                }"
                @click="listPageSize = opt"
              >
                {{ opt }}
              </button>
              <span>所</span>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-1.5">
              <button
                type="button"
                class="btn-ghost rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                :disabled="currentUniversityPage === 1"
                @click="setUniversityPage(currentUniversityPage - 1)"
              >
                上一页
              </button>

              <template v-for="(page, index) in universityPageNumbers" :key="`${page}-${index}`">
                <span
                  v-if="page === 'ellipsis'"
                  class="flex min-h-7 min-w-7 items-center justify-center px-1 font-medium text-[var(--text-tertiary)]"
                  aria-hidden="true"
                >
                  ...
                </span>
                <button
                  v-else
                  type="button"
                  class="btn-ghost min-h-7 min-w-7 rounded-lg border px-2.5 py-1 text-xs font-semibold font-numeric transition hover:-translate-y-0.5 cursor-pointer"
                  :aria-current="page === currentUniversityPage ? 'page' : undefined"
                  @click="setUniversityPage(page)"
                >
                  {{ page }}
                </button>
              </template>

              <button
                type="button"
                class="btn-ghost rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                :disabled="currentUniversityPage === universityPageCount"
                @click="setUniversityPage(currentUniversityPage + 1)"
              >
                下一页
              </button>
            </div>
          </nav>

          <!-- 空面板 -->
          <EmptyStatePanel
            v-if="filteredUniversities.length === 0"
            eyebrow="院校索引"
            title="没有匹配的院校"
            description="换个省份、层次、相关度、资料状态，或者直接搜城市、方向、标签。"
            class="w-full"
          >
            <template #actions>
              <ActionButton variant="primary" @click="resetFilters">
                清空筛选
              </ActionButton>
            </template>
          </EmptyStatePanel>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.universities-page {
  max-width: 100vw;
}

.universities-shell {
  max-width: min(84rem, 100%);
}

.universities-page :where(header, section, article, div, p, h1, h2, a, span, label, input, select, button, details, summary) {
  min-width: 0;
}

.universities-page :where(p, h1, h2, a, span, button, summary) {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (max-width: 639px) {
  .mobile-summary-grid > :nth-child(n + 3) {
    display: none;
  }

  .mobile-control-row {
    align-items: stretch;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mobile-control-row > :last-child {
    justify-content: space-between;
    width: 100%;
  }
}
</style>

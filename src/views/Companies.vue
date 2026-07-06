<script setup lang="ts">
import ActionButton from '../components/ActionButton.vue'
import AppIcon from '../components/AppIcon.vue'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import StatusPill from '../components/StatusPill.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  companies,
  companyOwnershipOptions,
  type Company,
  type RelevanceLevel,
  type VerificationStatus,
} from '../data/companies'
import { countBy } from '../utils/status'
import { getPaginationItems } from '../utils/pagination'
import { useShareLink } from '../composables/useShareLink'

const route = useRoute()
const router = useRouter()

const keyword = ref('')
const selectedOwnership = ref<'全部' | (typeof companyOwnershipOptions)[number]>('全部')
const selectedCity = ref('全部')
const selectedDirection = ref<'全部' | CompanyDirection>('全部')
const selectedRelevance = ref<'全部' | RelevanceLevel>('全部')
const selectedStatus = ref<'全部' | VerificationStatus>('全部')
const onlyWithResearch = ref(false)
const filtersOpen = ref(false)
const PAGE_SIZE_OPTIONS = [10, 20, 30] as const
const listPageSize = ref<(typeof PAGE_SIZE_OPTIONS)[number]>(10)
const currentCompanyPage = ref(1)
const companyListTop = ref<HTMLElement | null>(null)
type CompanyDirection =
  | '民爆产品'
  | '爆破工程'
  | '电子雷管'
  | '含能材料'
  | '火工品'
  | '安全评价 / 检测'
  | '智能装备'
  | '军工科研 / 试验'
const directionOptions: CompanyDirection[] = [
  '民爆产品',
  '爆破工程',
  '电子雷管',
  '含能材料',
  '火工品',
  '安全评价 / 检测',
  '智能装备',
  '军工科研 / 试验',
]
const relevanceOptions: RelevanceLevel[] = ['高', '中', '低', '待核对']
const statusOptions: VerificationStatus[] = ['已核验', '部分核验', '过期待复查']
const relevanceRank: Record<RelevanceLevel, number> = {
  高: 0,
  中: 1,
  低: 2,
  待核对: 3,
}

const isInitializing = ref(true)

// 从 URL 初始化筛选状态
const initFromQuery = () => {
  const query = route.query
  if (query.keyword) keyword.value = String(query.keyword)
  if (query.ownership && companyOwnershipOptions.includes(String(query.ownership) as (typeof companyOwnershipOptions)[number])) {
    selectedOwnership.value = String(query.ownership) as (typeof companyOwnershipOptions)[number]
  }
  if (query.city) selectedCity.value = String(query.city)
  if (query.direction) selectedDirection.value = String(query.direction) as any
  if (query.relevance && (['高', '中', '低', '待核对'] satisfies RelevanceLevel[]).includes(String(query.relevance) as RelevanceLevel)) {
    selectedRelevance.value = String(query.relevance) as RelevanceLevel
  }
  if (query.status && (['已核验', '部分核验', '过期待复查'] satisfies VerificationStatus[]).includes(String(query.status) as VerificationStatus)) {
    selectedStatus.value = String(query.status) as VerificationStatus
  }
  if (query.research === '1') onlyWithResearch.value = true
  if (query.page) {
    const pageNum = parseInt(String(query.page), 10)
    if (!isNaN(pageNum) && pageNum > 0) {
      currentCompanyPage.value = pageNum
    }
  }
  if (query.size) {
    const ps = parseInt(String(query.size), 10)
    if (ps === 10 || ps === 20 || ps === 30) listPageSize.value = ps
  }
}

initFromQuery()

nextTick(() => {
  isInitializing.value = false
})

const updateUrlQuery = () => {
  const query: Record<string, string> = {}

  if (keyword.value.trim()) query.keyword = keyword.value.trim()
  if (selectedOwnership.value !== '全部') query.ownership = selectedOwnership.value
  if (selectedCity.value !== '全部') query.city = selectedCity.value
  if (selectedDirection.value !== '全部') query.direction = selectedDirection.value
  if (selectedRelevance.value !== '全部') query.relevance = selectedRelevance.value
  if (selectedStatus.value !== '全部') query.status = selectedStatus.value
  if (onlyWithResearch.value) query.research = '1'
  if (currentCompanyPage.value > 1) query.page = String(currentCompanyPage.value)
  if (listPageSize.value !== 10) query.size = String(listPageSize.value)

  router.replace({
    path: route.path,
    query,
  })
}

// 深度监听变化
watch(
  [
    keyword,
    selectedOwnership,
    selectedCity,
    selectedDirection,
    selectedRelevance,
    selectedStatus,
    onlyWithResearch,
    listPageSize,
  ],
  () => {
    if (isInitializing.value) return
    currentCompanyPage.value = 1
    updateUrlQuery()
  }
)

watch(currentCompanyPage, () => {
  if (isInitializing.value) return
  updateUrlQuery()
})

const { isCopied, copyShareLink } = useShareLink()

const cityOptions = computed(() =>
  Array.from(new Set(companies.map((company) => `${company.city} · ${company.region}`))).sort(),
)

const activeFilterCount = computed(
  () =>
    [
      keyword.value.trim(),
      selectedOwnership.value !== '全部' ? selectedOwnership.value : '',
      selectedCity.value !== '全部' ? selectedCity.value : '',
      selectedDirection.value !== '全部' ? selectedDirection.value : '',
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
  if (selectedOwnership.value !== '全部') chips.push({ key: 'ownership', label: selectedOwnership.value })
  if (selectedCity.value !== '全部') chips.push({ key: 'city', label: selectedCity.value })
  if (selectedDirection.value !== '全部') chips.push({ key: 'direction', label: selectedDirection.value })
  if (selectedRelevance.value !== '全部') chips.push({ key: 'relevance', label: `相关度${selectedRelevance.value}` })
  if (selectedStatus.value !== '全部') chips.push({ key: 'status', label: selectedStatus.value })
  if (onlyWithResearch.value) chips.push({ key: 'research', label: '有调研' })
  return chips
})

function removeChip(key: string) {
  switch (key) {
    case 'keyword': keyword.value = ''; break
    case 'ownership': selectedOwnership.value = '全部'; break
    case 'city': selectedCity.value = '全部'; break
    case 'direction': selectedDirection.value = '全部'; break
    case 'relevance': selectedRelevance.value = '全部'; break
    case 'status': selectedStatus.value = '全部'; break
    case 'research': onlyWithResearch.value = false; break
  }
}




function resetFilters() {
  keyword.value = ''
  selectedOwnership.value = '全部'
  selectedCity.value = '全部'
  selectedDirection.value = '全部'
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

function getSearchableCompanyText(company: Company) {
  return [
    company.name,
    company.city,
    company.region,
    company.ownership,
    company.scaleOrIndustry,
    company.positions,
    company.education,
    company.description,
    company.schedule,
    company.salaryRange,
    company.verification.status,
    company.verification.relevanceLevel,
    company.verification.summary,
    ...company.highlights,
    ...company.verification.verifiedFields,
    ...company.verification.pendingFields,
  ]
    .join(' ')
    .toLowerCase()
}

function matchesCompanyDirection(company: Company) {
  if (selectedDirection.value === '全部') {
    return true
  }

  const searchableText = getSearchableCompanyText(company)
  const includesAny = (terms: string[]) => terms.some((term) => searchableText.includes(term))

  const directionTerms: Record<CompanyDirection, string[]> = {
    民爆产品: ['民爆', '炸药', '雷管', '导爆索', '爆破器材'],
    爆破工程: ['爆破工程', '工程爆破', '爆破施工', '矿山爆破'],
    电子雷管: ['电子雷管', '数码雷管', '起爆器', '起爆控制', '芯片'],
    含能材料: ['含能材料', '火炸药', '推进剂', '发射药', '装药'],
    火工品: ['火工品', '引信', '点火', '起爆药'],
    '安全评价 / 检测': ['安全评价', '防爆检测', '检测检验', '安全技术', '消防安全', '风险评估'],
    智能装备: ['智能装备', '自动化', '智能制造', '生产线', '控制系统'],
    '军工科研 / 试验': ['研究所', '研究院', '试验', '测试', '兵器', '航天', '军工'],
  }

  return includesAny(directionTerms[selectedDirection.value])
}

const filteredCompanies = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return companies
    .filter((company) => {
      const matchesOwnership =
        selectedOwnership.value === '全部' || company.ownership === selectedOwnership.value
      const matchesCity =
        selectedCity.value === '全部' || `${company.city} · ${company.region}` === selectedCity.value
      const matchesDirection = matchesCompanyDirection(company)
      const matchesRelevance =
        selectedRelevance.value === '全部' ||
        company.verification.relevanceLevel === selectedRelevance.value
      const matchesStatus =
        selectedStatus.value === '全部' || company.verification.status === selectedStatus.value
      const matchesResearch = !onlyWithResearch.value || Boolean(company.research)

      const searchableText = getSearchableCompanyText(company)

      const matchesKeyword =
        normalizedKeyword.length === 0 || searchableText.includes(normalizedKeyword)

      return (
        matchesOwnership &&
        matchesCity &&
        matchesDirection &&
        matchesRelevance &&
        matchesStatus &&
        matchesResearch &&
        matchesKeyword
      )
    })
    .sort((left, right) => {
      const relevanceDiff =
        relevanceRank[left.verification.relevanceLevel] -
        relevanceRank[right.verification.relevanceLevel]

      if (relevanceDiff !== 0) {
        return relevanceDiff
      }

      return left.name.localeCompare(right.name, 'zh-Hans-CN')
    })
})

const companyPageCount = computed(() =>
  Math.max(Math.ceil(filteredCompanies.value.length / listPageSize.value), 1),
)
const companyPageStart = computed(() => (currentCompanyPage.value - 1) * listPageSize.value)
const visibleCompanies = computed(() =>
  filteredCompanies.value.slice(companyPageStart.value, companyPageStart.value + listPageSize.value),
)

const companyPageNumbers = computed(() =>
  getPaginationItems(currentCompanyPage.value, companyPageCount.value),
)

watch(filteredCompanies, () => {
  if (isInitializing.value) return

  const maxPage = companyPageCount.value
  if (currentCompanyPage.value > maxPage) {
    currentCompanyPage.value = maxPage
  }
})

const ownershipCounts = computed(() => countBy(companies, (company) => company.ownership))
const statusCounts = computed(() => countBy(companies, (company) => company.verification.status))
const highRelevanceCount = computed(
  () => companies.filter((company) => company.verification.relevanceLevel === '高').length,
)
const withResearchCount = computed(() => companies.filter((company) => company.research).length)


function getPrimaryLink(company: Company) {
  return (
    company.links.find((link) => link.type === '招聘公告' || link.type === '招聘入口') ||
    company.links.find((link) => link.type === '官网') ||
    company.links[0]
  )
}

function getPendingPreview(company: Company) {
  return company.verification.pendingFields.slice(0, 2).join('、') || '最新公告和具体岗位'
}

function getPendingCount(company: Company) {
  return company.verification.pendingFields.length
}

async function setCompanyPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), companyPageCount.value)

  if (nextPage === currentCompanyPage.value) {
    return
  }

  currentCompanyPage.value = nextPage
  await nextTick()
  companyListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateFilters(callback: () => void) {
  callback()
  if (!isInitializing.value) {
    currentCompanyPage.value = 1
  }
}
</script>

<template>
  <section class="companies-page min-h-screen bg-[var(--page-bg)] px-4 pb-8 pt-6 text-[var(--text-primary)] md:px-6 md:pb-12 md:pt-8">
    <div class="companies-shell mx-auto flex w-full min-w-0 flex-col gap-4">
      <!-- 双栏容器 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-start w-full">
        
        <!-- 左栏 (1/4) - 侧边筛选器 (PC) / 底部抽屉 (Mobile) -->
        <div class="col-span-1">
          <!-- 手机端遮罩层 -->
          <div
            v-if="filtersOpen"
            class="fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity duration-300"
            @click="filtersOpen = false"
          ></div>

          <!-- 筛选面板 -->
          <section
            class="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t p-5 flex flex-col gap-4 transition-transform duration-300
                   md:sticky md:top-20 md:z-auto md:max-h-none md:overflow-visible md:rounded-xl md:border md:p-4 md:flex md:translate-y-0"
            :class="filtersOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
          >
            <!-- 手机端抽屉头部 -->
            <div class="border-soft flex items-center justify-between border-b pb-3 mb-1 md:hidden">
              <span class="font-semibold text-lg text-[var(--text-primary)]">筛选条件</span>
              <button type="button" class="text-sm font-medium text-[var(--accent)]" @click="filtersOpen = false">确定</button>
            </div>

            <label class="flex flex-col gap-2">
              <span class="text-xs text-[var(--text-tertiary)]">搜索</span>
              <input
                v-model="keyword"
                type="text"
                placeholder="公司、城市、岗位、民爆、火工品"
                class="h-10 rounded-lg border px-3 text-sm outline-none transition w-full"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              />
            </label>

            <label class="flex flex-col gap-2">
              <span class="text-xs text-[var(--text-tertiary)]">性质</span>
              <select
                v-model="selectedOwnership"
                class="h-10 rounded-lg border px-3 text-sm outline-none transition w-full"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部</option>
                <option v-for="option in companyOwnershipOptions" :key="option" :value="option">
                  {{ option }}（{{ ownershipCounts[option] || 0 }}）
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-2">
              <span class="text-xs text-[var(--text-tertiary)]">地区</span>
              <select
                v-model="selectedCity"
                class="h-10 rounded-lg border px-3 text-sm outline-none transition w-full"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部</option>
                <option v-for="option in cityOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-2">
              <span class="text-xs text-[var(--text-tertiary)]">方向</span>
              <select
                v-model="selectedDirection"
                class="h-10 rounded-lg border px-3 text-sm outline-none transition w-full"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部</option>
                <option v-for="option in directionOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-2">
              <span class="text-xs text-[var(--text-tertiary)]">相关度</span>
              <select
                v-model="selectedRelevance"
                class="h-10 rounded-lg border px-3 text-sm outline-none transition w-full"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部</option>
                <option v-for="option in relevanceOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-2">
              <span class="text-xs text-[var(--text-tertiary)]">资料</span>
              <select
                v-model="selectedStatus"
                class="h-10 rounded-lg border px-3 text-sm outline-none transition w-full"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }"
              >
                <option value="全部">全部</option>
                <option v-for="option in statusOptions" :key="option" :value="option">
                  {{ option }}（{{ statusCounts[option] || 0 }}）
                </option>
              </select>
            </label>

            <button
              type="button"
              class="h-10 rounded-lg border px-4 text-sm font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 w-full mt-2"
              :disabled="!hasActiveFilters"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }"
              @click="resetFilters"
            >
              重置筛选
            </button>
          </section>
        </div>

        <!-- 右栏 (3/4) - 列表与分页 -->
        <div class="col-span-1 md:col-span-3 flex flex-col gap-4 w-full min-w-0">

          <!-- 单行极简控制条 (Micro-Toolbar) -->
          <!-- 数据检索控制台 (Control Console) -->
          <header
            ref="companyListTop"
            class="flex flex-col gap-3 rounded-xl border p-3 w-full"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
          >
            <!-- 上层：标题与 4 项大盘数据 -->
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b" :style="{ borderColor: 'var(--border)/50' }">
              <div class="flex items-center gap-2">
                <h1 class="text-sm font-bold tracking-tight text-[var(--text-primary)]">企业名录</h1>
              </div>

              <div class="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 text-[11px]">
                <div class="border-soft flex items-center justify-between gap-2.5 px-2 py-1 rounded bg-[var(--surface-strong)] border">
                  <span class="text-[var(--text-tertiary)]">已收录</span>
                  <strong class="font-bold text-[var(--text-primary)]">{{ companies.length }}</strong>
                </div>
                <div class="border-soft flex items-center justify-between gap-2.5 px-2 py-1 rounded bg-[var(--surface-strong)] border">
                  <span class="text-[var(--text-tertiary)]">高相关</span>
                  <strong class="font-bold text-[var(--text-primary)]">{{ highRelevanceCount }}</strong>
                </div>
                <div class="border-soft flex items-center justify-between gap-2.5 px-2 py-1 rounded bg-[var(--surface-strong)] border">
                  <span class="text-[var(--text-tertiary)]">有调研</span>
                  <strong class="font-bold text-[var(--text-primary)]">{{ withResearchCount }}</strong>
                </div>
                <div class="border-soft flex items-center justify-between gap-2.5 px-2 py-1 rounded bg-[var(--surface-strong)] border">
                  <span class="text-[var(--text-tertiary)]">部分核验</span>
                  <strong class="font-bold text-[var(--accent)]">{{ statusCounts['部分核验'] || 0 }}</strong>
                </div>
              </div>
            </div>

            <!-- 下层：快速筛选与分享工具条 -->
            <div class="flex items-center justify-between gap-3 text-xs w-full">
              <!-- 左侧：筛选器胶囊群 -->
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 min-w-0">
                <!-- 高级筛选唤起 (仅移动端显示，PC端侧边栏常驻) -->
                <button
                  type="button"
                  class="rounded-lg px-2 py-1 border font-semibold flex items-center gap-1 shrink-0 md:hidden bg-[var(--surface-strong)]"
                  :style="{
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
                  class="rounded-lg px-2 py-1 border font-semibold shrink-0"
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
                  class="rounded-lg px-2 py-1 border font-semibold shrink-0"
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
                  class="rounded-lg px-2 py-1 border font-semibold shrink-0"
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
                  class="border-soft rounded-lg px-2 py-1 border text-[var(--text-tertiary)] hover:opacity-80 shrink-0 bg-[var(--surface-strong)]"
                  @click="resetFilters"
                >
                  清空
                </button>
              </div>

              <!-- 右侧：统计和复制链接 -->
              <div class="flex items-center gap-3 shrink-0 text-[var(--text-secondary)]" role="status" aria-live="polite">
                <span class="hidden sm:inline font-medium font-numeric">共 {{ filteredCompanies.length }} 家 · {{ currentCompanyPage }}/{{ companyPageCount }}页</span>
                <span class="sm:hidden font-medium font-numeric">共 {{ filteredCompanies.length }} 家</span>

                <button
                  type="button"
                  class="rounded-lg p-1 border flex items-center justify-center transition hover:opacity-80 shrink-0 w-6.5 h-6.5"
                  :style="{
                    backgroundColor: isCopied ? 'var(--accent-soft)' : 'var(--surface-strong)',
                    borderColor: isCopied ? 'var(--accent)' : 'var(--border)',
                    color: isCopied ? 'var(--accent)' : 'var(--text-secondary)',
                  }"
                  title="复制筛选链接"
                  @click="copyShareLink"
                >
                  <AppIcon :name="isCopied ? 'check' : 'link'" :size="16" />
                </button>
              </div>
            </div>
          </header>

          <!-- 已选条件芯片：每条可单独点掉，比“清空全部”更省事 -->
          <div
            v-if="hasActiveFilters"
            class="flex flex-wrap items-center gap-2 px-5 py-2"
            :style="{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }"
          >
            <span
              v-for="chip in activeChips"
              :key="chip.key"
              class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition hover:-translate-y-0.5"
              :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
            >
              {{ chip.label }}
              <button
                type="button"
                class="text-[var(--text-tertiary)] transition hover:text-[var(--accent)]"
                :aria-label="`取消筛选：${chip.label}`"
                @click="removeChip(chip.key)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" class="h-3 w-3"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </span>
          </div>
          <!-- 紧凑 Row 列表 -->
          <section v-if="filteredCompanies.length > 0" class="overflow-hidden rounded-xl border w-full">
            <div
              class="surface-card hidden grid-cols-[minmax(20rem,1.35fr)_minmax(10rem,0.58fr)_minmax(16rem,0.9fr)_minmax(6rem,0.32fr)] gap-4 border-b px-5 py-3 text-xs text-[var(--text-tertiary)] xl:grid"
            >
              <span>企业 / 状态</span>
              <span>地区与性质</span>
              <span>岗位线索</span>
              <span class="text-right">操作</span>
            </div>

            <article
              v-for="company in visibleCompanies"
              :key="company.id"
              class="grid gap-3 border-b px-4 py-4 transition last:border-b-0 hover:bg-[var(--surface)] xl:grid-cols-[minmax(20rem,1.35fr)_minmax(10rem,0.58fr)_minmax(16rem,0.9fr)_minmax(6rem,0.32fr)] xl:items-center xl:px-5"
              :style="{
                backgroundColor: 'var(--surface-strong)',
                borderColor: 'var(--border)',
              }"
            >
              <div class="min-w-0">
                <div class="mb-2 flex flex-wrap items-center gap-2">
                  <StatusPill :value="company.verification.relevanceLevel" prefix="相关度" size="xs" />
                  <StatusPill :value="company.verification.status" size="xs" />
                </div>
                <RouterLink
                  :to="`/companies/${company.id}`"
                  class="block text-lg font-semibold leading-7 text-[var(--text-primary)] transition hover:text-[var(--accent)]"
                >
                  {{ company.name }}
                </RouterLink>
                <p class="mt-2 line-clamp-1 text-sm leading-6 text-[var(--text-secondary)]">
                  {{ company.description }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    class="rounded-full px-2.5 py-1 text-xs"
                    :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                  >
                    {{ company.scaleOrIndustry }}
                  </span>
                  <span
                    v-for="tag in company.highlights.slice(0, 2)"
                    :key="tag"
                    class="rounded-full px-2.5 py-1 text-xs"
                    :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="order-3 text-sm leading-6 text-[var(--text-secondary)] xl:order-none">
                <p class="font-medium text-[var(--text-primary)]">{{ company.city }}</p>
                <p>{{ company.region }}</p>
                <p class="mt-1 text-[var(--text-tertiary)]">{{ company.ownership }}</p>
              </div>

              <div class="order-4 text-sm leading-6 text-[var(--text-secondary)] xl:order-none">
                <p class="line-clamp-2">{{ company.positions }}</p>
                <p class="mt-1 text-xs text-[var(--text-tertiary)]">{{ company.education }}</p>
                <details class="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">
                  <summary class="w-fit cursor-pointer rounded-full px-2 py-0.5" :style="{ backgroundColor: 'var(--surface-muted)' }">
                    待核对 {{ getPendingCount(company) }} 项
                  </summary>
                  <p class="mt-1 leading-5">{{ getPendingPreview(company) }}</p>
                </details>
              </div>

              <div class="order-2 grid gap-2 sm:flex sm:flex-wrap xl:order-none xl:justify-end">
                <ActionButton :to="`/companies/${company.id}`" variant="primary" size="sm">
                  看详情
                </ActionButton>
                <ActionButton
                  v-if="getPrimaryLink(company)"
                  :href="getPrimaryLink(company)?.url"
                  variant="secondary"
                  size="sm"
                  new-tab
                >
                  外部入口
                </ActionButton>
              </div>
            </article>
          </section>

          <!-- 分页导航 -->
          <nav
            v-if="companyPageCount > 1"
            class="flex flex-col items-center justify-between gap-3 rounded-xl border p-3 text-sm md:flex-row w-full"
            :style="{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--glass-shadow)',
            }"
            aria-label="企业列表分页"
          >
            <div class="flex items-center gap-2 text-[var(--text-secondary)]">
              <span class="text-sm">每页</span>
              <button v-for="opt in PAGE_SIZE_OPTIONS" :key="opt" type="button" class="min-h-9 min-w-9 rounded-lg border px-2.5 py-1 text-sm font-medium font-numeric transition hover:-translate-y-0.5" :aria-pressed="opt === listPageSize ? 'true' : 'false'" :style="{ backgroundColor: opt === listPageSize ? 'var(--accent)' : 'var(--surface-strong)', borderColor: opt === listPageSize ? 'var(--accent)' : 'var(--border)', color: opt === listPageSize ? '#ffffff' : 'var(--text-secondary)' }" @click="listPageSize = opt">{{ opt }}</button>
              <span class="text-sm">家</span>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                class="btn-ghost rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                :disabled="currentCompanyPage === 1"
                @click="setCompanyPage(currentCompanyPage - 1)"
              >
                上一页
              </button>

              <template v-for="(page, index) in companyPageNumbers" :key="`${page}-${index}`">
                <span
                  v-if="page === 'ellipsis'"
                  class="flex min-h-10 min-w-10 items-center justify-center px-2 font-medium text-[var(--text-tertiary)]"
                  aria-hidden="true"
                >
                  ...
                </span>
                <button
                  v-else
                  type="button"
                  class="btn-ghost min-h-10 min-w-10 rounded-lg border px-3 py-2 font-medium font-numeric transition hover:-translate-y-0.5"
                  :aria-current="page === currentCompanyPage ? 'page' : undefined"
                  @click="setCompanyPage(page)"
                >
                  {{ page }}
                </button>
              </template>

              <button
                type="button"
                class="btn-ghost rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                :disabled="currentCompanyPage === companyPageCount"
                @click="setCompanyPage(currentCompanyPage + 1)"
              >
                下一页
              </button>
            </div>
          </nav>

          <!-- 提示或空面板 -->
          <div
            v-if="filteredCompanies.length > 0 && companyPageCount === 1"
            class="flex justify-center text-sm text-[var(--text-tertiary)] w-full"
          >
            <span class="surface-card-strong rounded-lg border px-4 py-2">
              匹配到的企业都在这里了
            </span>
          </div>

          <EmptyStatePanel
            v-if="filteredCompanies.length === 0"
            eyebrow="企业索引"
            title="没有匹配的企业"
            description="换个地区、相关度、资料状态，或者直接搜岗位、行业、城市。"
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
.companies-page {
  max-width: 100vw;
}

.companies-shell {
  max-width: min(84rem, 100%);
}

.company-list-hero {
  position: relative;
  overflow: hidden;
}

.company-list-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 36%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.06), transparent 42%);
  pointer-events: none;
}

.company-list-hero > * {
  position: relative;
  z-index: 1;
}

.company-summary-grid {
  align-self: stretch;
}

.company-summary-card {
  border: 1px solid;
  border-radius: 0.95rem;
  min-height: 6.8rem;
  padding: 1rem 1rem 0.95rem;
}

.companies-page :where(header, section, article, div, p, h1, h2, a, span, label, input, select, button, details, summary) {
  min-width: 0;
}

.companies-page :where(p, h1, h2, a, span, button, summary) {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (max-width: 639px) {
  .companies-page {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .companies-shell {
    inline-size: 100%;
    max-inline-size: 100%;
  }

  .company-summary-card {
    min-height: 0;
    padding: 0.85rem 0.85rem 0.8rem;
  }
}

@media (min-width: 900px) {
  .company-summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* 隐藏移动端横向滚动条 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

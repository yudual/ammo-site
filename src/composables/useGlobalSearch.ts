import { computed, ref } from 'vue'
import { companies } from '../data/companies'
import { universities } from '../data/universities'
import { majorNavItems } from '../data/aboutMajor'
import { graduateDirections, graduateNavItems } from '../data/graduate'

export type SearchHit = {
  kind: 'company' | 'university' | 'page' | 'graduate'
  id: string
  name: string
  sub: string
  to: string
}

type IndexedHit = SearchHit & { haystack: string }

let index: IndexedHit[] | null = null

function buildIndex(): IndexedHit[] {
  const hits: IndexedHit[] = []

  const pageAliases: Record<string, string[]> = {
    '/about-major': ['专业介绍', '专业总览', '弹药工程与爆炸技术', '课程', '就业'],
    '/about-major/curriculum': ['学什么', '课程', '数理基础', '力学', '机械', '专业课'],
    '/about-major/path': ['四年节奏', '大一', '大二', '大三', '大四', '学习安排'],
    '/about-major/career': ['毕业去向', '就业', '军工', '民爆', '安全', '深造'],
    '/about-major/checklist': ['报考核对', '选专业', '培养方案', '就业数据', '升学数据'],
    '/graduate': ['考研', '考研总览', '方向', '路线'],
    '/graduate/directions': ['方向地图', '顺接', '半跨', '跨考', '兵器', '力学', '机械'],
    '/graduate/compare': ['方向对比', '难度', '科目', '去向', '匹配度'],
    '/graduate/schools': ['院校入口', '研招', '招生目录', '北京理工', '南京理工', '中北'],
    '/graduate/timeline': ['四年准备', '备考节奏', '大一', '大二', '大三', '大四'],
  }

  for (const item of [...majorNavItems, ...graduateNavItems]) {
    const aliases = pageAliases[item.to] || []
    hits.push({
      kind: 'page',
      id: item.to,
      name: item.label,
      sub: item.to.startsWith('/graduate') ? '考研方向' : '专业介绍',
      to: item.to,
      haystack: [item.label, item.to, ...aliases].join(' ').toLowerCase(),
    })
  }

  for (const direction of graduateDirections) {
    hits.push({
      kind: 'graduate',
      id: direction.code,
      name: direction.title,
      sub: `${direction.level} · ${direction.code}`,
      to: '/graduate/directions',
      haystack: [
        direction.code,
        direction.title,
        direction.summary,
        direction.fit,
        direction.level,
        direction.warning,
        ...direction.topics,
        ...direction.subjects,
        ...direction.bridge,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
    })
  }

  for (const company of companies) {
    const sub = [company.city, company.region, company.ownership, company.scaleOrIndustry]
      .filter(Boolean)
      .join(' · ')
    hits.push({
      kind: 'company',
      id: String(company.id),
      name: company.name,
      sub,
      to: `/companies/${company.id}`,
      haystack: [company.name, sub, company.positions, ...(company.highlights ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
    })
  }

  for (const university of universities) {
    const sub = [university.shortName, university.province, university.tier]
      .filter(Boolean)
      .join(' · ')
    hits.push({
      kind: 'university',
      id: university.id,
      name: university.name,
      sub,
      to: `/universities/${university.id}`,
      haystack: [
        university.name,
        university.shortName,
        sub,
        ...(university.tags ?? []),
        university.focus,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
    })
  }

  return hits
}

function ensureIndex(): IndexedHit[] {
  if (!index) {
    index = buildIndex()
  }
  return index
}

export function useGlobalSearch() {
  const query = ref('')
  const results = computed<SearchHit[]>(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return []
    const idx = ensureIndex()
    return idx
      .filter((hit) => hit.haystack.includes(q))
      .slice(0, 8)
  })

  return {
    query,
    results,
  }
}

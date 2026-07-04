import { computed, ref } from 'vue'
import { companies } from '../data/companies'
import { universities } from '../data/universities'

export type SearchHit = {
  kind: 'company' | 'university'
  id: string
  name: string
  sub: string
  to: string
}

type IndexedHit = SearchHit & { haystack: string }

let index: IndexedHit[] | null = null

function buildIndex(): IndexedHit[] {
  const hits: IndexedHit[] = []

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
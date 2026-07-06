import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSectionNavigation } from './useSectionNavigation'

export type DetailPrimaryKey = 'companies' | 'universities'

export type DetailNavItem = {
  id: number | string
  name: string
}

export type DetailSectionId = 'overview' | 'verification' | 'profile' | 'research'

export type DetailSection = {
  id: DetailSectionId
  label: string
}

type UseDetailNavOptions<T extends DetailNavItem> = {
  primaryKey: DetailPrimaryKey
  items: readonly T[]
  currentId: ComputedRef<T['id']>
  hasVerification: ComputedRef<boolean>
  activeSection?: Ref<DetailSectionId>
}

const PRIMARY_SINGULAR: Record<DetailPrimaryKey, string> = {
  companies: 'company',
  universities: 'university',
}

const PAGE_SECTIONS: readonly DetailSection[] = [
  { id: 'overview', label: '概览' },
  { id: 'verification', label: '核验' },
  { id: 'profile', label: '档案' },
  { id: 'research', label: '来源' },
]

export function useDetailNav<T extends DetailNavItem>(options: UseDetailNavOptions<T>) {
  const router = useRouter()
  const listPath = `/${options.primaryKey}`
  const fallbackSelector = `.${PRIMARY_SINGULAR[options.primaryKey]}-detail-subnav`
  const activeSection = options.activeSection ?? ref<DetailSectionId>('overview')

  const goBack = () => {
    const rawBack = window.history.state && window.history.state.back
    const back = typeof rawBack === 'string' ? rawBack : ''
    if (back === listPath || back.startsWith(listPath + '?') || back.startsWith(listPath + '#')) {
      router.back()
    } else {
      router.push(sessionStorage.getItem(`ammo:last-list:${options.primaryKey}`) || listPath)
    }
  }

  const navSections = computed(() =>
    PAGE_SECTIONS.filter((section) => section.id !== 'verification' || options.hasVerification.value),
  )

  const { scrollToSection } = useSectionNavigation({
    sections: navSections,
    activeSection,
    fallbackSelector,
  })

  const totalCount = computed(() => options.items.length)
  const currentIndex = computed(() => options.items.findIndex((item) => item.id === options.currentId.value))
  const prevItem = computed(() => {
    const i = currentIndex.value
    return i > 0 ? options.items[i - 1] : null
  })
  const nextItem = computed(() => {
    const i = currentIndex.value
    return i >= 0 && i < options.items.length - 1 ? options.items[i + 1] : null
  })

  return {
    activeSection,
    navSections,
    scrollToSection,
    goBack,
    totalCount,
    currentIndex,
    prevItem,
    nextItem,
  }
}

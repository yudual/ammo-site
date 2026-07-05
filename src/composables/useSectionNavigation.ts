import { computed, onBeforeUnmount, onMounted, ref, type ComputedRef, type Ref } from 'vue'

export type SectionNavItem = {
  id: string
  label: string
}

type UseSectionNavigationOptions = {
  sections: ComputedRef<readonly SectionNavItem[]>
  activeSection: Ref<string>
  fallbackSelector?: string
}

export function useSectionNavigation(options: UseSectionNavigationOptions) {
  const observer = ref<IntersectionObserver | null>(null)
  const anchorOffset = ref(0)

  const visibleSections = computed(() => options.sections.value.filter((section) => section.id))

  const updateAnchorOffset = () => {
    const firstTarget = document.querySelector<HTMLElement>('.scroll-target')
    let anchor = 0

    if (firstTarget) {
      const scrollMarginTop = parseFloat(
        getComputedStyle(firstTarget).getPropertyValue('scroll-margin-top'),
      )
      if (Number.isFinite(scrollMarginTop) && scrollMarginTop > 0) {
        anchor = scrollMarginTop
      }
    }

    if (!anchor) {
      const fallbackNode = document.querySelector<HTMLElement>(
        options.fallbackSelector ?? '.detail-subnav',
      )
      anchor = fallbackNode ? Math.round(fallbackNode.getBoundingClientRect().bottom) : 0
    }

    anchorOffset.value = anchor
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const elements = visibleSections.value
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => !!el)

    if (!elements.length) return

    updateAnchorOffset()
    window.addEventListener('resize', updateAnchorOffset)

    const ob = new IntersectionObserver(
      () => {
        const anchor = anchorOffset.value

        let active: string | null = null
        let activeTop = -Infinity
        let fallback: string | null = null
        let fallbackTop = Infinity

        for (const section of visibleSections.value) {
          const el = document.getElementById(section.id)
          if (!el) continue

          const top = el.getBoundingClientRect().top
          if (top <= anchor + 1) {
            if (top > activeTop) {
              activeTop = top
              active = section.id
            }
          } else if (top < fallbackTop) {
            fallbackTop = top
            fallback = section.id
          }
        }

        const next = active ?? fallback
        if (next && next !== options.activeSection.value) {
          options.activeSection.value = next
        }
      },
      { threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    observer.value = ob
    elements.forEach((el) => ob.observe(el))
  })

  onBeforeUnmount(() => {
    observer.value?.disconnect()
    observer.value = null
    window.removeEventListener('resize', updateAnchorOffset)
  })

  return {
    visibleSections,
    scrollToSection,
  }
}

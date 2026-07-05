export type PaginationItem = number | 'ellipsis'

export function getPaginationItems(currentPage: number, pageCount: number): PaginationItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const pages = new Set<number>([1, pageCount])

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < pageCount) {
      pages.add(page)
    }
  }

  const sortedPages = Array.from(pages).sort((left, right) => left - right)
  const items: PaginationItem[] = []

  for (const page of sortedPages) {
    const previous = items[items.length - 1]
    if (typeof previous === 'number' && page - previous > 1) {
      items.push('ellipsis')
    }
    items.push(page)
  }

  return items
}

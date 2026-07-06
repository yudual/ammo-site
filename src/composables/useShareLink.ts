import { ref } from 'vue'

/**
 * 复制当前页（或指定 URL）到剪贴板，并在 1.5s 内保持「已复制」态。
 * 行为与原 CompanyDetail / UniversityDetail / Companies / Universities 内联实现保持一致。
 */
export function useShareLink() {
  const isCopied = ref(false)

  const markCopied = () => {
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 1500)
  }

  const writeWithFallback = (text: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '0'
    document.body.appendChild(textarea)
    textarea.select()

    try {
      document.execCommand('copy')
      return true
    } finally {
      textarea.remove()
    }
  }

  // 既能当点击处理器（@click 绑定时 Vue 会把原生事件当第一个参数传入），
  // 也能编程式传一个具体 URL。非字符串入参一律退回 window.location.href。
  const copyShareLink = async (url?: string | Event) => {
    const text = typeof url === 'string' && url ? url : window.location.href

    try {
      await navigator.clipboard.writeText(text)
      markCopied()
    } catch {
      if (writeWithFallback(text)) {
        markCopied()
      }
    }
  }

  return { isCopied, copyShareLink }
}

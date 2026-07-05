import { ref } from 'vue'

/**
 * 复制当前页（或指定 URL）到剪贴板，并在 1.5s 内保持「已复制」态。
 * 行为与原 CompanyDetail / UniversityDetail / Companies / Universities 内联实现保持一致。
 */
export function useShareLink() {
  const isCopied = ref(false)

  // 既能当点击处理器（@click 绑定时 Vue 会把原生事件当第一个参数传入），
  // 也能编程式传一个具体 URL。非字符串入参一律退回 window.location.href。
  const copyShareLink = async (url?: string | Event) => {
    try {
      await navigator.clipboard.writeText(typeof url === 'string' && url ? url : window.location.href)
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 1500)
    } catch {
      // 剪贴板不可用时静默降级，与原实现一致
    }
  }

  return { isCopied, copyShareLink }
}

import { ref } from 'vue'

/** 全站搜索对话框开关，模块级共享，任一处都可触发/关闭 */
const open = ref(false)

export function useSearchDialog() {
  function openDialog() {
    open.value = true
  }

  function closeDialog() {
    open.value = false
  }

  function toggle() {
    open.value = !open.value
  }

  return {
    open,
    openDialog,
    closeDialog,
    toggle,
  }
}
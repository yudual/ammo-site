import { computed, onMounted, ref } from 'vue'

type ThemeMode = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'ammo-site-theme'

/** 用户意图：light / dark / system（跟随操作系统） */
const mode = ref<ThemeMode>('system')
/** 实际生效到 DOM 的色调（始终 light 或 dark），保证 :root[data-theme] 选择器可用 */
const resolved = ref<ResolvedTheme>('light')

let initialized = false
let mediaQuery: MediaQueryList | null = null

function getStoredMode(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
    return null
  } catch {
    return null
  }
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveTheme(nextMode: ThemeMode): ResolvedTheme {
  return nextMode === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : nextMode
}

function applyMode(nextMode: ThemeMode) {
  mode.value = nextMode
  const nextResolved = resolveTheme(nextMode)
  resolved.value = nextResolved

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = nextResolved
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode)
    } catch {
      // 存储被禁用时仍保证主题切换可用
    }
  }
}

function initializeTheme() {
  if (initialized || typeof window === 'undefined') {
    return
  }

  // 默认跟随系统；老用户有显式存储则用存储值
  applyMode(getStoredMode() || 'system')

  if (typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      // 仅当用户未显式选择时跟随系统
      if (mode.value === 'system') {
        applyMode('system')
      }
    }
    if (mediaQuery && typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handler)
    }
  }

  initialized = true
}

export function useTheme() {
  onMounted(() => {
    initializeTheme()
  })

  const isDark = computed(() => resolved.value === 'dark')

  function toggleTheme() {
    // 用户显式切换即脱离 system 跟随，写入 light/dark
    applyMode(resolved.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: resolved,
    isDark,
    toggleTheme,
  }
}
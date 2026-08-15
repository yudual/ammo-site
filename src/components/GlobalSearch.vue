<script setup lang="ts">
import { nextTick, ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSearchDialog } from '../composables/useSearchDialog'
import { useGlobalSearch, type SearchHit } from '../composables/useGlobalSearch'

const router = useRouter()
const { open, closeDialog } = useSearchDialog()
const { query, results } = useGlobalSearch()

const inputEl = ref<HTMLInputElement | null>(null)
const highlight = ref(-1)
let prevOverflow = ''

watch(open, async (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      highlight.value = -1
      await nextTick()
      inputEl.value?.focus()
    } else {
      document.body.style.overflow = prevOverflow || ''
      query.value = ''
    }
  }
})

watch(query, () => {
  highlight.value = -1
})

function move(delta: number) {
  const n = results.value.length
  if (!n) return
  highlight.value = (highlight.value + delta + n) % n
}

function go(hit: SearchHit) {
  router.push(hit.to)
  closeDialog()
}

function hitKindLabel(kind: SearchHit['kind']) {
  const labels: Record<SearchHit['kind'], string> = {
    company: '企业',
    university: '院校',
    page: '页面',
    graduate: '考研',
  }

  return labels[kind]
}

function onInputKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    move(1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    move(-1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const list = results.value
    if (!list.length) return
    const i = highlight.value >= 0 && highlight.value < list.length ? highlight.value : 0
    go(list[i])
  } else if (e.key === 'Escape') {
    e.preventDefault()
    closeDialog()
  }
}

function onWindowKeydown(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    closeDialog()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onWindowKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onWindowKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="gs">
      <div
        v-if="open"
        class="gs-overlay"
        :style="{ backgroundColor: 'rgba(10, 15, 13, 0.52)' }"
        @click.self="closeDialog"
      >
        <div
          class="gs-panel"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow-hover)',
          }"
          role="dialog"
          aria-modal="true"
          aria-label="全站搜索"
        >
          <!-- 搜索输入框 -->
          <div class="gs-input-row" :style="{ borderBottom: '1px solid var(--border)' }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="gs-icon h-4.5 w-4.5 shrink-0 text-[var(--accent)]">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref="inputEl"
              v-model="query"
              type="text"
              class="gs-input"
              placeholder="搜索企业、院校、考研方向、课程..."
              aria-label="搜索关键词"
              autocomplete="off"
              spellcheck="false"
              @keydown="onInputKeydown"
            />
            <button
              v-if="query"
              type="button"
              class="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] px-1.5 py-0.5 rounded cursor-pointer"
              @click="query = ''"
            >
              清空
            </button>
            <kbd
              class="gs-kbd shrink-0 cursor-pointer select-none"
              :style="{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', backgroundColor: 'var(--surface-muted)' }"
              @click="closeDialog"
            >
              ESC
            </kbd>
          </div>

          <!-- 搜索结果列表 -->
          <ul class="gs-list no-scrollbar">
            <li v-for="(hit, i) in results" :key="hit.kind + '-' + hit.id">
              <RouterLink
                :to="hit.to"
                class="gs-item group"
                :class="{ 'is-active': i === highlight }"
                :style="i === highlight ? { backgroundColor: 'var(--accent-soft)', color: 'var(--text-primary)' } : {}"
                @click="closeDialog"
                @mouseenter="highlight = i"
              >
                <span
                  class="gs-tag shrink-0"
                  :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                >
                  {{ hitKindLabel(hit.kind) }}
                </span>
                <span class="gs-name min-w-0 flex-1 truncate group-hover:text-[var(--accent)] transition-colors">{{ hit.name }}</span>
                <span class="gs-sub shrink-0 text-xs">{{ hit.sub }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="gs-arrow h-3.5 w-3.5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </RouterLink>
            </li>

            <li v-if="query.trim() && !results.length" class="gs-empty py-8 text-center text-xs text-[var(--text-tertiary)]">
              未找到与「{{ query }}」相关的结果，换个关键词试试。
            </li>

            <li v-if="!query.trim()" class="gs-hint py-8 text-center text-xs text-[var(--text-tertiary)]">
              输入关键词，快速检索收录的 80 家企业、34 所院校与考研方向。
            </li>
          </ul>

          <!-- 底部键盘快捷提示栏 -->
          <div class="hidden sm:flex items-center justify-between px-3.5 py-2 border-t text-[11px] text-[var(--text-tertiary)] select-none" :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }">
            <div class="flex items-center gap-3">
              <span><kbd class="font-mono bg-[var(--surface-muted)] px-1 py-0.5 rounded border border-[var(--border)]">↑</kbd> <kbd class="font-mono bg-[var(--surface-muted)] px-1 py-0.5 rounded border border-[var(--border)]">↓</kbd> 切换</span>
              <span><kbd class="font-mono bg-[var(--surface-muted)] px-1 py-0.5 rounded border border-[var(--border)]">↵</kbd> 打开</span>
              <span><kbd class="font-mono bg-[var(--surface-muted)] px-1 py-0.5 rounded border border-[var(--border)]">ESC</kbd> 退出</span>
            </div>
            <span class="font-numeric">弹药工程导航全站检索</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gs-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 8vh 1rem 1rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.gs-panel {
  width: 100%;
  max-width: 38rem;
  max-height: min(78vh, 38rem);
  border: 1px solid;
  border-radius: 1.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gs-input-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.15rem;
  color: var(--text-secondary);
}

.gs-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
}

.gs-input::placeholder {
  color: var(--text-tertiary);
  font-weight: 400;
}

.gs-kbd {
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
  font-size: 0.68rem;
  border: 1px solid;
  border-radius: 0.4rem;
  padding: 0.15rem 0.45rem;
  font-weight: 600;
}

.gs-list {
  list-style: none;
  margin: 0;
  padding: 0.4rem;
  overflow-y: auto;
}

.gs-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  border: none;
  background: transparent;
  border-radius: 0.75rem;
  padding: 0.65rem 0.85rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  font-size: 0.9rem;
  text-decoration: none;
  color: inherit;
}

.gs-item.is-active {
  background-color: var(--accent-soft);
}

.gs-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 0.4rem;
  padding: 0.1rem 0.45rem;
  font-size: 0.7rem;
  font-weight: 600;
}

.gs-name {
  color: var(--text-primary);
  font-weight: 600;
}

.gs-sub {
  color: var(--text-tertiary);
  font-size: 0.78rem;
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gs-arrow {
  color: var(--text-tertiary);
}

/* 过渡 */
.gs-enter-active,
.gs-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.gs-enter-from,
.gs-leave-to {
  opacity: 0;
}

.gs-enter-active .gs-panel,
.gs-leave-active .gs-panel {
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;
}

.gs-enter-from .gs-panel,
.gs-leave-to .gs-panel {
  transform: translateY(-10px) scale(0.97);
  opacity: 0;
}

@media (max-width: 639px) {
  .gs-overlay {
    padding: 3rem 0.75rem 0.75rem;
  }

  .gs-panel {
    max-height: calc(100vh - 4.5rem);
    border-radius: 1rem;
  }
}
</style>

<script setup lang="ts">
import { nextTick, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
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
        :style="{ backgroundColor: 'rgba(15, 22, 18, 0.42)' }"
        @click.self="closeDialog"
      >
        <div
          class="gs-panel"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
          role="dialog"
          aria-modal="true"
          aria-label="全站搜索"
        >
          <div class="gs-input-row" :style="{ borderBottom: '1px solid var(--border)' }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" class="gs-icon h-4.5 w-4.5 shrink-0">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref="inputEl"
              v-model="query"
              type="text"
              class="gs-input"
              placeholder="搜企业、城市、院校、省份…… 跨表即时搜索"
              aria-label="搜索关键词"
              autocomplete="off"
              spellcheck="false"
              @keydown="onInputKeydown"
            />
            <kbd
              class="gs-kbd shrink-0"
              :style="{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', backgroundColor: 'var(--surface)' }"
            >
              Esc
            </kbd>
          </div>

          <ul class="gs-list">
            <li v-for="(hit, i) in results" :key="hit.kind + '-' + hit.id">
              <button
                type="button"
                class="gs-item"
                :class="{ 'is-active': i === highlight }"
                :style="i === highlight ? { backgroundColor: 'var(--accent-soft)', color: 'var(--text-primary)' } : {}"
                @click="go(hit)"
                @mouseenter="highlight = i"
              >
                <span
                  class="gs-tag shrink-0"
                  :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                >
                  {{ hit.kind === 'company' ? '企业' : '院校' }}
                </span>
                <span class="gs-name min-w-0 flex-1 truncate">{{ hit.name }}</span>
                <span class="gs-sub shrink-0 hidden sm:inline">{{ hit.sub }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="gs-arrow h-3.5 w-3.5 shrink-0">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </li>

            <li v-if="query.trim() && !results.length" class="gs-empty">
              没有匹配的结果，换个关键词试试。
            </li>

            <li v-if="!query.trim()" class="gs-hint">
              输入关键词，全站跨企业 · 院校搜索。
            </li>
          </ul>
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
  padding: 6vh 1rem 1rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.gs-panel {
  width: 100%;
  max-width: 36rem;
  border: 1px solid;
  border-radius: 1rem;
  overflow: hidden;
}

.gs-input-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  color: var(--text-secondary);
}

.gs-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text-primary);
}

.gs-input::placeholder {
  color: var(--text-tertiary);
}

.gs-kbd {
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
  font-size: 0.7rem;
  border: 1px solid;
  border-radius: 0.35rem;
  padding: 0.1rem 0.35rem;
}

.gs-list {
  list-style: none;
  margin: 0;
  padding: 0.4rem;
}

.gs-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  border: none;
  background: transparent;
  border-radius: 0.6rem;
  padding: 0.6rem 0.7rem;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease;
  font-size: 0.92rem;
}

.gs-item.is-active {
  background-color: var(--accent-soft);
}

.gs-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 0.45rem;
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
}

.gs-arrow {
  color: var(--text-tertiary);
}

.gs-empty,
.gs-hint {
  padding: 0.9rem 0.7rem;
  font-size: 0.85rem;
  color: var(--text-tertiary);
  text-align: center;
}

/* 过渡 */
.gs-enter-active,
.gs-leave-active {
  transition: opacity 0.18s ease;
}

.gs-enter-from,
.gs-leave-to {
  opacity: 0;
}

.gs-enter-active .gs-panel,
.gs-leave-active .gs-panel {
  transition: transform 0.2s ease;
}

.gs-enter-from .gs-panel,
.gs-leave-to .gs-panel {
  transform: translateY(-12px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .gs-enter-active,
  .gs-leave-active {
    transition: opacity 0.12s ease;
  }
  .gs-enter-active .gs-panel,
  .gs-leave-active .gs-panel {
    transition: opacity 0.12s ease;
    transform: none;
  }
  .gs-enter-from .gs-panel,
  .gs-leave-to .gs-panel {
    transform: none;
  }
}
</style>
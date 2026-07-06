<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type ButtonVariant = 'primary' | 'secondary' | 'tonal'
type ButtonSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: ButtonVariant
    size?: ButtonSize
    block?: boolean
    newTab?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'secondary',
    size: 'md',
    block: false,
    newTab: false,
    disabled: false,
    type: 'button',
  },
)

const buttonClass = computed(() =>
  [
    'inline-flex items-center justify-center rounded-lg border font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45',
    props.size === 'sm' ? 'px-3 py-2 text-sm' : 'px-4 py-2.5 text-sm',
    props.block ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' '),
)

const buttonStyle = computed(() => {
  if (props.variant === 'primary') {
    return {
      backgroundColor: 'var(--accent)',
      borderColor: 'var(--accent)',
      color: '#ffffff',
    }
  }

  if (props.variant === 'tonal') {
    return {
      backgroundColor: 'var(--accent-soft)',
      borderColor: 'var(--border)',
      color: 'var(--accent)',
    }
  }

  return {
    backgroundColor: 'var(--surface-strong)',
    borderColor: 'var(--border)',
    color: 'var(--text-secondary)',
  }
})

function onRouterLinkClick(event: MouseEvent, navigate: (event?: MouseEvent) => void) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  navigate(event)
}
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    custom
    v-slot="{ href: resolvedHref, navigate }"
  >
    <a
      :href="resolvedHref"
      :target="newTab ? '_blank' : undefined"
      :rel="newTab ? 'noopener noreferrer' : undefined"
      :aria-disabled="disabled ? 'true' : undefined"
      :tabindex="disabled ? -1 : undefined"
      :class="buttonClass"
      :style="buttonStyle"
      @click="onRouterLinkClick($event, navigate)"
    >
      <slot />
    </a>
  </RouterLink>

  <a
    v-else-if="href"
    :href="href"
    :target="newTab ? '_blank' : undefined"
    :rel="newTab ? 'noopener noreferrer' : undefined"
    :class="buttonClass"
    :style="buttonStyle"
  >
    <slot />
  </a>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="buttonClass"
    :style="buttonStyle"
  >
    <slot />
  </button>
</template>

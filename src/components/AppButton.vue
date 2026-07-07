<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
  }>(),
  { variant: 'primary' },
)
</script>

<template>
  <button class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>

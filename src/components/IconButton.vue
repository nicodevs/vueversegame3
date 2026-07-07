<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <button class="icon-btn" :aria-label="label" :title="label">
    <slot />
  </button>
</template>

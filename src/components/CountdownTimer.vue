<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  seconds: number
}>()

const label = computed(() => {
  const m = Math.floor(props.seconds / 60)
  const s = props.seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})
</script>

<template>
  <div class="timer" :class="{ 'timer--warn': seconds <= 10 }">
    <span aria-hidden="true">⏱️</span>
    <span>{{ label }}</span>
  </div>
</template>

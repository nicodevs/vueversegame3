<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  hp: number
  max: number
}>()

const pct = computed(() => `${Math.max(0, (props.hp / props.max) * 100)}%`)
</script>

<template>
  <div class="hpbar">
    <span class="hpbar__label">❤️ {{ hp }}/{{ max }}</span>
    <div class="hpbar__track">
      <div class="hpbar__fill" :style="{ width: pct }" />
    </div>
  </div>
</template>

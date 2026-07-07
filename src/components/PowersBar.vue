<script setup lang="ts">
export interface Power {
  id: string
  icon: string
  label: string
  count: number
}

defineProps<{
  powers: Power[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  use: [id: string]
}>()
</script>

<template>
  <div class="powers">
    <button
      v-for="power in powers"
      :key="power.id"
      class="power"
      :disabled="disabled || power.count <= 0"
      :aria-label="power.label"
      :title="power.label"
      @click="emit('use', power.id)"
    >
      <span class="power__icon" aria-hidden="true">{{ power.icon }}</span>
      <span class="power__count">×{{ power.count }}</span>
    </button>
  </div>
</template>

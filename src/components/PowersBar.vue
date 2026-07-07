<script setup lang="ts">
export interface PowerButton {
  id: string
  icon: string
  label: string
  disabled: boolean
}

defineProps<{
  powers: PowerButton[]
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
      :disabled="power.disabled"
      :aria-label="power.label"
      :title="power.label"
      @click="emit('use', power.id)"
    >
      <span class="power__icon" aria-hidden="true">{{ power.icon }}</span>
    </button>
  </div>
</template>

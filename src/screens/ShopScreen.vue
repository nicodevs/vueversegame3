<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <div class="screen">
    <div class="screen__logo" aria-hidden="true">🛒</div>
    <h1 class="screen__title">Shop</h1>
    <p class="screen__subtitle">Powers and upgrades are coming soon. Check back later!</p>

    <div class="screen__actions">
      <AppButton variant="ghost" @click="emit('back')">← Back</AppButton>
    </div>
  </div>
</template>

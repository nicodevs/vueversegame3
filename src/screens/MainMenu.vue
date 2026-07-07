<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits<{
  play: []
  shop: []
}>()
</script>

<template>
  <div class="screen">
    <div class="screen__logo" aria-hidden="true">🐶🎸</div>
    <h1 class="screen__title">Emoji Match</h1>
    <p class="screen__subtitle">Flip the cards, find the pairs, clear the board!</p>

    <div class="screen__actions">
      <AppButton @click="emit('play')">▶ Play</AppButton>
      <AppButton variant="ghost" @click="emit('shop')">🛒 Shop</AppButton>
    </div>
  </div>
</template>

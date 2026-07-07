<script setup lang="ts">
// Reusable full-screen overlay: a centered emoji, title, and button column
// over a dimmed, blurred backdrop that keeps the board visible behind it.
defineProps<{
  emoji: string
  title: string
}>()
</script>

<template>
  <div class="game-overlay">
    <div class="game-overlay__content">
      <div class="game-overlay__emoji" aria-hidden="true">{{ emoji }}</div>
      <h2 class="game-overlay__title">{{ title }}</h2>
      <div class="game-overlay__actions">
        <slot />
      </div>
    </div>
  </div>
</template>

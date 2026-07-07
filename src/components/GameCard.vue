<script setup lang="ts">
import type { Card } from '@/composables/useGame'

const props = defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  flip: [card: Card]
}>()

function onClick() {
  emit('flip', props.card)
}
</script>

<template>
  <button
    class="card"
    :class="{
      'card--up': card.faceUp || card.peeking,
      'card--vanishing': card.vanishing,
      'card--matched': card.matched,
    }"
    :disabled="card.faceUp || card.matched || card.peeking"
    :aria-label="card.faceUp || card.peeking ? card.emoji : 'Hidden card'"
    @click="onClick"
  >
    <span class="card__inner">
      <span class="card__face card__back" aria-hidden="true">?</span>
      <span class="card__face card__front">{{ card.emoji }}</span>
    </span>
  </button>
</template>

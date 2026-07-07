<script setup lang="ts">
import GameLayout from '@/components/GameLayout.vue'
import AppButton from '@/components/AppButton.vue'

defineProps<{
  level: number
  timeLeft: number
  livesLeft: number
  coinsEarned: number
  totalCoins: number
}>()

const emit = defineEmits<{
  continue: []
}>()
</script>

<template>
  <GameLayout>
    <div class="victory">
      <div class="victory__trophy" aria-hidden="true">🏆</div>
      <h1 class="victory__title">VICTORY!</h1>
      <p class="victory__subtitle">LEVEL {{ level }} COMPLETE</p>

      <div class="victory__summary">
        <div class="victory__row">
          <span>⏱️ Time left</span>
          <span>{{ timeLeft }}</span>
        </div>
        <div class="victory__row">
          <span>❤️ Lives left</span>
          <span>{{ livesLeft }}</span>
        </div>
        <div class="victory__row victory__row--earned">
          <span>💰 Coins earned</span>
          <span>{{ coinsEarned }}</span>
        </div>
      </div>

      <div class="victory__total">
        <h2 class="victory__total-label">TOTAL COINS</h2>
        <div class="victory__total-value">💰 {{ totalCoins }}</div>
      </div>
    </div>

    <template #footer>
      <AppButton class="btn--block" @click="emit('continue')">CONTINUE</AppButton>
    </template>
  </GameLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import GameLayout from '@/components/GameLayout.vue'
import IconButton from '@/components/IconButton.vue'
import GameCard from '@/components/GameCard.vue'
import HpBar from '@/components/HpBar.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import PowersBar, { type Power } from '@/components/PowersBar.vue'
import AppButton from '@/components/AppButton.vue'
import GameOverlay from '@/components/GameOverlay.vue'
import { useGame } from '@/composables/useGame'

const emit = defineEmits<{
  exit: []
}>()

const game = useGame(1)
const soundOn = ref(true)

// The start overlay is shown while the level is loaded but not yet started.
const showStartOverlay = computed(() => !game.started.value && game.status.value === 'playing')

const powers = reactive<Power[]>([
  { id: 'reveal', icon: '👁️', label: 'Reveal all cards briefly', count: 2 },
  { id: 'freeze', icon: '❄️', label: 'Freeze the timer', count: 2 },
  { id: 'heal', icon: '❤️', label: 'Restore 1 HP', count: 2 },
])

function usePower(id: string) {
  const power = powers.find((p) => p.id === id)
  if (!power || power.count <= 0 || game.status.value !== 'playing') return

  if (id === 'reveal') game.peekAll(1200)
  else if (id === 'freeze') game.freezeClock(5000)
  else if (id === 'heal') game.heal(1)

  power.count -= 1
}

function resetPowers() {
  powers.forEach((p) => (p.count = 2))
}

function onNext() {
  game.nextLevel()
  resetPowers()
}

function onRetry() {
  game.retry()
  resetPowers()
}

function onStart() {
  game.start()
}
</script>

<template>
  <GameLayout>
    <template #header>
      <IconButton label="Close game" @click="emit('exit')">✕</IconButton>
      <h1 class="layout__title">Level {{ game.level.value }}</h1>
      <IconButton :label="soundOn ? 'Mute sound' : 'Unmute sound'" @click="soundOn = !soundOn">
        {{ soundOn ? '🔊' : '🔇' }}
      </IconButton>
    </template>

    <div class="play">
      <CountdownTimer :seconds="game.secondsLeft.value" />

      <div class="play__row">
        <div class="board" :style="{ gridTemplateColumns: `repeat(${game.cols.value}, 1fr)` }">
          <GameCard
            v-for="card in game.cards.value"
            :key="card.id"
            :card="card"
            :peek="game.peeking.value"
            @flip="game.flip"
          />
        </div>

        <div class="play__side">
          <HpBar :hp="game.hp.value" :max="game.maxHp.value" />
          <PowersBar :powers="powers" :disabled="game.status.value !== 'playing'" @use="usePower" />
        </div>
      </div>
    </div>
  </GameLayout>

  <!-- Victory overlay -->
  <div v-if="game.status.value === 'won'" class="overlay">
    <div class="overlay__card">
      <div class="confetti" aria-hidden="true">🎉</div>
      <h2 class="screen__title">Level {{ game.level.value }} cleared!</h2>
      <p class="screen__subtitle">Nicely matched. Ready for the next challenge?</p>
      <div class="screen__actions">
        <AppButton @click="onNext">▶ Next Level</AppButton>
        <AppButton variant="ghost" @click="emit('exit')">🏠 Main Menu</AppButton>
      </div>
    </div>
  </div>

  <!-- Level start overlay -->
  <Transition name="overlay-fade" appear>
    <GameOverlay v-if="showStartOverlay" emoji="🚀" :title="`Level ${game.level.value}`">
      <AppButton @click="onStart">Start</AppButton>
      <AppButton v-if="game.level.value >= 2" variant="ghost" @click="emit('exit')">
        Main Menu
      </AppButton>
    </GameOverlay>
  </Transition>

  <!-- Game Over overlay -->
  <Transition name="overlay-fade">
    <GameOverlay v-if="game.status.value === 'lost'" emoji="🤬" title="Game Over">
      <AppButton @click="onRetry">Try Again</AppButton>
    </GameOverlay>
  </Transition>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import GameLayout from '@/components/GameLayout.vue'
import IconButton from '@/components/IconButton.vue'
import GameCard from '@/components/GameCard.vue'
import HpBar from '@/components/HpBar.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import PowersBar from '@/components/PowersBar.vue'
import AppButton from '@/components/AppButton.vue'
import GameOverlay from '@/components/GameOverlay.vue'
import VictoryScreen from '@/screens/VictoryScreen.vue'
import { useGame } from '@/composables/useGame'
import { useWallet } from '@/composables/useWallet'
import { useInventory } from '@/composables/useInventory'
import { POWERS, type PowerDef } from '@/game/powers'
import { CATEGORIES } from '@/game/emojis'

const emit = defineEmits<{
  exit: []
  shop: []
}>()

const game = useGame(1)
const wallet = useWallet()
const inventory = useInventory()
const soundOn = ref(true)

// The start overlay is shown while the level is loaded but not yet started.
const showStartOverlay = computed(() => !game.started.value && game.status.value === 'playing')

// Coins earned this level = time left + lives left (both frozen at the win).
const coinsEarned = computed(() => game.secondsLeft.value + game.hp.value)

watch(
  () => game.status.value,
  (status) => {
    if (status === 'won') wallet.add(coinsEarned.value)
  },
)

// Powers already used this level are disabled until the next level.
const usedThisLevel = reactive(new Set<string>())

// Reset per-level usage whenever a new level session begins.
watch(
  () => game.level.value,
  () => usedThisLevel.clear(),
)

const powerButtons = computed(() =>
  POWERS.filter((p) => inventory.has(p.id)).map((p) => ({
    id: p.id,
    icon: p.icon,
    label: `${p.name} — ${p.description}`,
    disabled: usedThisLevel.has(p.id) || game.status.value !== 'playing',
  })),
)

function applyPower(def: PowerDef) {
  if (def.id === 'snack') {
    game.heal(5)
  } else if (def.id === 'time-stop') {
    game.freezeClock(5000)
  } else if (def.category) {
    const category = CATEGORIES.find((c) => c.name === def.category)
    if (category) game.peekCategory(category.emojis, 1000)
  }
}

function usePower(id: string) {
  const def = POWERS.find((p) => p.id === id)
  if (!def || !inventory.has(id) || usedThisLevel.has(id) || game.status.value !== 'playing') return

  applyPower(def)
  usedThisLevel.add(id)
  // Consumables are spent: they leave the inventory once used.
  if (def.kind === 'consumable') inventory.remove(id)
}

function onRetry() {
  usedThisLevel.clear()
  game.retry()
}

function onStart() {
  game.start()
}
</script>

<template>
  <VictoryScreen
    v-if="game.status.value === 'won'"
    :level="game.level.value"
    :time-left="game.secondsLeft.value"
    :lives-left="game.hp.value"
    :coins-earned="coinsEarned"
    :total-coins="wallet.coins.value"
    @continue="emit('shop')"
  />

  <template v-else>
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
              @flip="game.flip"
            />
          </div>

          <div class="play__side">
            <HpBar :hp="game.hp.value" :max="game.maxHp.value" />
            <PowersBar :powers="powerButtons" @use="usePower" />
          </div>
        </div>
      </div>
    </GameLayout>

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
        <AppButton v-if="game.level.value >= 2" variant="ghost" @click="emit('exit')">
          Main Menu
        </AppButton>
      </GameOverlay>
    </Transition>
  </template>
</template>

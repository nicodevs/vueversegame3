<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/screens/MainMenu.vue'
import ShopScreen from '@/screens/ShopScreen.vue'
import GameBoard from '@/screens/GameBoard.vue'

type Screen = 'menu' | 'game' | 'shop'

const screen = ref<Screen>('menu')
const currentLevel = ref(1)

function play() {
  currentLevel.value = 1
  screen.value = 'game'
}

// From the shop, CONTINUE advances to the next level's start overlay.
function continueToNextLevel() {
  currentLevel.value += 1
  screen.value = 'game'
}
</script>

<template>
  <div class="app-shell">
    <MainMenu v-if="screen === 'menu'" @play="play" />
    <ShopScreen
      v-else-if="screen === 'shop'"
      @back="screen = 'menu'"
      @continue="continueToNextLevel"
    />
    <GameBoard
      v-else
      :key="currentLevel"
      :level="currentLevel"
      @exit="screen = 'menu'"
      @shop="screen = 'shop'"
    />
  </div>
</template>

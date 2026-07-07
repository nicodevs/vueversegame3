<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/screens/MainMenu.vue'
import ShopScreen from '@/screens/ShopScreen.vue'
import GameBoard from '@/screens/GameBoard.vue'

type Screen = 'menu' | 'game' | 'shop'

const screen = ref<Screen>('menu')
</script>

<template>
  <div class="app-shell">
    <MainMenu v-if="screen === 'menu'" @play="screen = 'game'" @shop="screen = 'shop'" />
    <ShopScreen v-else-if="screen === 'shop'" @back="screen = 'menu'" />
    <GameBoard v-else @exit="screen = 'menu'" />
  </div>
</template>

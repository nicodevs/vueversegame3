<script setup lang="ts">
import GameLayout from '@/components/GameLayout.vue'
import IconButton from '@/components/IconButton.vue'
import AppButton from '@/components/AppButton.vue'
import ShopPowerCard from '@/components/ShopPowerCard.vue'
import { POWERS } from '@/game/powers'
import { useWallet } from '@/composables/useWallet'
import { useInventory } from '@/composables/useInventory'

const emit = defineEmits<{
  back: []
  continue: []
}>()

const wallet = useWallet()
const inventory = useInventory()

function buy(id: string) {
  const power = POWERS.find((p) => p.id === id)
  if (!power || inventory.has(id)) return
  if (wallet.spend(power.price)) inventory.add(id)
}
</script>

<template>
  <GameLayout>
    <template #header>
      <IconButton label="Back to menu" @click="emit('back')">✕</IconButton>
      <h1 class="layout__title">Shop</h1>
      <span class="coins-pill">💰 {{ wallet.coins.value }}</span>
    </template>

    <div class="shop-grid">
      <ShopPowerCard
        v-for="power in POWERS"
        :key="power.id"
        :power="power"
        :owned="inventory.has(power.id)"
        :coins="wallet.coins.value"
        @buy="buy"
      />
    </div>

    <template #footer>
      <AppButton class="btn--block" @click="emit('continue')">CONTINUE</AppButton>
    </template>
  </GameLayout>
</template>

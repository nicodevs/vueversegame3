<script setup lang="ts">
import { computed } from 'vue'
import type { PowerDef } from '@/game/powers'

const props = defineProps<{
  power: PowerDef
  owned: boolean
  coins: number
}>()

const emit = defineEmits<{
  buy: [id: string]
}>()

const affordable = computed(() => props.coins >= props.power.price)
</script>

<template>
  <div class="shop-card">
    <div class="shop-card__icon" aria-hidden="true">{{ power.icon }}</div>
    <h3 class="shop-card__name">{{ power.name }}</h3>
    <p class="shop-card__desc">{{ power.description }}</p>

    <button v-if="owned" class="shop-card__btn shop-card__btn--owned" disabled>OWNED</button>
    <button
      v-else-if="affordable"
      class="shop-card__btn shop-card__btn--buy"
      @click="emit('buy', power.id)"
    >
      💰 {{ power.price }}
    </button>
    <button v-else class="shop-card__btn shop-card__btn--locked" disabled>
      🔒 {{ power.price }}
    </button>
  </div>
</template>

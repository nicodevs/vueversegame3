<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits<{
  play: []
}>()

const showCredits = ref(false)
</script>

<template>
  <div class="screen">
    <div class="screen__logo" aria-hidden="true">🐶🎸</div>
    <h1 class="screen__title">MEMORY MATCH</h1>
    <p class="screen__subtitle">Flip the cards, find the pairs, clear the board!</p>

    <div class="screen__actions">
      <AppButton @click="emit('play')">▶ PLAY</AppButton>
      <AppButton variant="ghost" @click="showCredits = true">CREDITS</AppButton>
    </div>
  </div>

  <div v-if="showCredits" class="overlay" @click.self="showCredits = false">
    <div class="overlay__card">
      <h2 class="screen__title">Credits</h2>
      <p class="screen__subtitle">Programmer: Nico Devs</p>
      <AppButton class="btn--block" @click="showCredits = false">Close</AppButton>
    </div>
  </div>
</template>

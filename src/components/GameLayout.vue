<script setup lang="ts">
// Reusable header / main / footer shell used by the game board screen.
</script>

<template>
  <div class="layout">
    <header v-if="$slots.header" class="layout__header">
      <slot name="header" />
    </header>

    <main class="layout__main">
      <slot />
    </main>

    <footer v-if="$slots.footer" class="layout__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

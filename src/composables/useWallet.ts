import { ref } from 'vue'

// Module-level singleton so the coin total persists across screens
// (game board, victory, shop) and levels.
const coins = ref(0)

export function useWallet() {
  function add(amount: number) {
    coins.value += amount
  }

  function spend(amount: number): boolean {
    if (coins.value < amount) return false
    coins.value -= amount
    return true
  }

  return { coins, add, spend }
}

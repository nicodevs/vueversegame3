import { reactive } from 'vue'
import { POWERS } from '@/game/powers'

// Module-level singleton so the owned powers persist across screens and levels.
// For now the player owns every power; the shop will change the starting set.
const owned = reactive(new Set<string>(POWERS.map((p) => p.id)))

export function useInventory() {
  function has(id: string): boolean {
    return owned.has(id)
  }

  function add(id: string) {
    owned.add(id)
  }

  function remove(id: string) {
    owned.delete(id)
  }

  return { owned, has, add, remove }
}

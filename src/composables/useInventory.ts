import { reactive } from 'vue'

// Module-level singleton so the owned powers persist across screens and levels.
// The player starts with no powers; they are bought in the shop.
const owned = reactive(new Set<string>())

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

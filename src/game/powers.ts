// Reusable powers stay in the inventory across levels; consumables are spent
// (removed from the inventory) when used in a level.
export type PowerKind = 'reusable' | 'consumable'

export interface PowerDef {
  id: string
  name: string
  icon: string
  description: string
  kind: PowerKind
  price: number
  // For peek powers, the emoji category (from CATEGORIES) they reveal.
  category?: string
}

export const POWERS: readonly PowerDef[] = [
  {
    id: 'snack',
    name: 'Snack',
    icon: '🍔',
    description: 'Restore 5 HP',
    kind: 'consumable',
    price: 10,
  },
  {
    id: 'time-stop',
    name: 'Time Stop',
    icon: '⏸️',
    description: 'Freeze the timer for 5 seconds',
    kind: 'consumable',
    price: 10,
  },
  {
    id: 'bait',
    name: 'Bait',
    icon: '🍖',
    description: 'Peek at all animal cards for 1 second',
    kind: 'reusable',
    price: 15,
    category: 'Animals',
  },
  {
    id: 'light-flash',
    name: 'Light Flash',
    icon: '🔦',
    description: 'Peek at all monster cards for 1 second',
    kind: 'reusable',
    price: 15,
    category: 'Monsters',
  },
  {
    id: 'sound-check',
    name: 'Sound Check',
    icon: '🎵',
    description: 'Peek at all instrument cards for 1 second',
    kind: 'reusable',
    price: 15,
    category: 'Instruments',
  },
  {
    id: 'piece-of-cake',
    name: 'Piece of Cake',
    icon: '🍰',
    description: 'Peek at all human cards for 1 second',
    kind: 'reusable',
    price: 15,
    category: 'Humans',
  },
]

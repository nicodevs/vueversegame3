export interface EmojiCategory {
  name: string
  emojis: readonly string[]
}

export const CATEGORIES: readonly EmojiCategory[] = [
  { name: 'Animals', emojis: ['🐶', '🦁', '🐯', '🦊'] },
  { name: 'Monsters', emojis: ['🧟', '🧛', '👹', '💀'] },
  { name: 'Instruments', emojis: ['🎸', '🎷', '🎹', '🥁'] },
  { name: 'Humans', emojis: ['🦸', '🧑‍🎤', '🧑‍🍳', '🧑‍🚀'] },
]

export const EMOJI_POOL: readonly string[] = CATEGORIES.flatMap((c) => c.emojis)

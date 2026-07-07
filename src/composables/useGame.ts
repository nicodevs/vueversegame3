import { computed, onScopeDispose, reactive, ref } from 'vue'
import { EMOJI_POOL } from '@/game/emojis'
import { levelConfig } from '@/game/levels'

export interface Card {
  id: number
  emoji: string
  faceUp: boolean
  matched: boolean
  vanishing: boolean
}

const MATCH_PAUSE = 500
const FLIP_BACK_PAUSE = 800
const START_HP = 10

function shuffle<T>(items: T[]): T[] {
  const result = items.slice()
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = result[i]!
    result[i] = result[j]!
    result[j] = tmp
  }
  return result
}

function buildBoard(level: number): Card[] {
  const { cols, rows } = levelConfig(level)
  const pairCount = (cols * rows) / 2
  const chosen = shuffle(EMOJI_POOL.slice()).slice(0, pairCount)
  const cards = shuffle(chosen.flatMap((emoji) => [emoji, emoji])).map((emoji, id) => ({
    id,
    emoji,
    faceUp: false,
    matched: false,
    vanishing: false,
  }))
  return cards
}

export function useGame(startLevel = 1) {
  const level = ref(startLevel)
  const cards = ref<Card[]>([])
  const selection = reactive<Card[]>([])
  const hp = ref(START_HP)
  const maxHp = ref(START_HP)
  const secondsLeft = ref(0)
  const status = ref<'playing' | 'won' | 'lost'>('playing')
  const busy = ref(false)
  const peeking = ref(false)

  const timers = new Set<ReturnType<typeof setTimeout>>()
  let tick: ReturnType<typeof setInterval> | undefined

  const cols = computed(() => levelConfig(level.value).cols)
  const remaining = computed(() => cards.value.filter((c) => !c.matched).length)

  function later(fn: () => void, ms: number) {
    const id = setTimeout(() => {
      timers.delete(id)
      fn()
    }, ms)
    timers.add(id)
  }

  function clearTimers() {
    for (const id of timers) clearTimeout(id)
    timers.clear()
  }

  function stopClock() {
    if (tick !== undefined) {
      clearInterval(tick)
      tick = undefined
    }
  }

  function startClock() {
    stopClock()
    tick = setInterval(() => {
      if (status.value !== 'playing') return
      secondsLeft.value -= 1
      if (secondsLeft.value <= 0) {
        secondsLeft.value = 0
        loseGame()
      }
    }, 1000)
  }

  function loseGame() {
    if (status.value !== 'playing') return
    status.value = 'lost'
    stopClock()
    clearTimers()
    selection.splice(0)
    busy.value = false
    peeking.value = false
    // Reveal every face-down card (they don't count as matches).
    for (const card of cards.value) {
      if (!card.matched) card.faceUp = true
    }
  }

  function startLevelSession(nextLevel: number) {
    clearTimers()
    level.value = nextLevel
    cards.value = buildBoard(nextLevel)
    selection.splice(0)
    hp.value = START_HP
    maxHp.value = START_HP
    const { cols: c, rows } = levelConfig(nextLevel)
    secondsLeft.value = c * rows * 5
    status.value = 'playing'
    busy.value = false
    startClock()
  }

  function resolveMatch(a: Card, b: Card) {
    later(() => {
      a.vanishing = true
      b.vanishing = true
      later(() => {
        a.matched = true
        b.matched = true
        selection.splice(0)
        busy.value = false
        if (remaining.value === 0) {
          status.value = 'won'
          stopClock()
        }
      }, 300)
    }, MATCH_PAUSE)
  }

  function resolveMismatch(a: Card, b: Card) {
    // Selection resets immediately; the pair flips back after a brief pause.
    selection.splice(0)
    busy.value = false
    hp.value = Math.max(0, hp.value - 1)
    later(() => {
      a.faceUp = false
      b.faceUp = false
    }, FLIP_BACK_PAUSE)
    if (hp.value === 0) {
      loseGame()
    }
  }

  function flip(card: Card) {
    if (status.value !== 'playing') return
    if (busy.value || card.faceUp || card.matched) return

    card.faceUp = true
    selection.push(card)

    if (selection.length === 2) {
      const a = selection[0]!
      const b = selection[1]!
      if (a.emoji === b.emoji) {
        busy.value = true
        resolveMatch(a, b)
      } else {
        resolveMismatch(a, b)
      }
    }
  }

  function nextLevel() {
    startLevelSession(level.value + 1)
  }

  function retry() {
    startLevelSession(level.value)
  }

  function heal(amount: number) {
    if (status.value !== 'playing') return
    hp.value = Math.min(maxHp.value, hp.value + amount)
  }

  function peekAll(ms: number) {
    if (status.value !== 'playing' || peeking.value || busy.value) return
    peeking.value = true
    busy.value = true
    later(() => {
      peeking.value = false
      if (selection.length < 2) busy.value = false
    }, ms)
  }

  function freezeClock(ms: number) {
    stopClock()
    later(() => {
      if (status.value === 'playing') startClock()
    }, ms)
  }

  onScopeDispose(() => {
    clearTimers()
    stopClock()
  })

  startLevelSession(startLevel)

  return {
    level,
    cards,
    selection,
    hp,
    maxHp,
    secondsLeft,
    status,
    peeking,
    cols,
    remaining,
    flip,
    nextLevel,
    retry,
    heal,
    peekAll,
    freezeClock,
    startClock,
    stopClock,
  }
}

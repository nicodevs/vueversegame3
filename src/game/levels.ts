export interface LevelConfig {
  cols: number
  rows: number
}

// Level 1: 4×2, Level 2: 4×3, Level 3+: 4×4
export function levelConfig(level: number): LevelConfig {
  if (level <= 1) return { cols: 4, rows: 2 }
  if (level === 2) return { cols: 4, rows: 3 }
  return { cols: 4, rows: 4 }
}

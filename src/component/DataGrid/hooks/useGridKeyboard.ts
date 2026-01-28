import { useState } from 'react'

interface ActiveCell {
  row: number
  col: number
}

export function useGridKeyboard(rowCount: number, colCount: number) {
  const [activeCell, setActiveCell] = useState<ActiveCell>({
    row: 0,
    col: 0,
  })

  function onKeyDown(e: React.KeyboardEvent) {
    setActiveCell((prev) => {
      switch (e.key) {
        case 'ArrowDown':
          return { ...prev, row: Math.min(prev.row + 1, rowCount - 1) }
        case 'ArrowUp':
          return { ...prev, row: Math.max(prev.row - 1, 0) }
        case 'ArrowRight':
          return { ...prev, col: Math.min(prev.col + 1, colCount - 1) }
        case 'ArrowLeft':
          return { ...prev, col: Math.max(prev.col - 1, 0) }
        default:
          return prev
      }
    })
  }

  return { activeCell, onKeyDown }
}

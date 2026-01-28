import { useMemo } from 'react'

interface RowVirtualizationArgs {
  rowCount: number
  rowHeight: number
  containerHeight: number
  scrollTop: number
  overscan?: number
}

export function useRowVirtualization({
  rowCount,
  rowHeight,
  containerHeight,
  scrollTop,
  overscan = 5,
}: RowVirtualizationArgs) {
  return useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / rowHeight) - overscan
    )

    const visibleCount =
      Math.ceil(containerHeight / rowHeight) + overscan * 2

    const endIndex = Math.min(rowCount, startIndex + visibleCount)

    const offsetTop = startIndex * rowHeight

    return {
      startIndex,
      endIndex,
      offsetTop,
    }
  }, [rowCount, rowHeight, containerHeight, scrollTop, overscan])
}

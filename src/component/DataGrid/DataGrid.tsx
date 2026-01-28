import { useState } from 'react'
import type { DataGridProps } from './DataGrid.types'
import { useRowVirtualization } from './hooks/useRowVirtualization'
import { useGridKeyboard } from './hooks/useGridKeyboard'

export function DataGrid<T>({
  rows,
  columns,
  height,
  width,
  rowHeight,
}: DataGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)

  const { startIndex, endIndex, offsetTop } = useRowVirtualization({
    rowCount: rows.length,
    rowHeight,
    containerHeight: height,
    scrollTop,
  })

  const { activeCell, onKeyDown } = useGridKeyboard(
    rows.length,
    columns.length
  )

  return (
    <div
      role="grid"
      tabIndex={0}
      aria-rowcount={rows.length}
      aria-colcount={columns.length}
      style={{ height, width }}
      className="border border-gray-300 overflow-auto focus:outline-none"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      onKeyDown={onKeyDown}
    >
      {/* ================= HEADER ================= */}
      <div role="rowgroup">
        <div role="row" className="flex border-b bg-gray-100 font-medium">
          {columns.map((col) => (
            <div
              key={col.id}
              role="columnheader"
              className="px-2 py-1 border-r"
              style={{ width: col.width }}
            >
              {col.header}
            </div>
          ))}
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div role="rowgroup" style={{ height: rows.length * rowHeight }}>
        <div style={{ transform: `translateY(${offsetTop}px)` }}>
          {rows.slice(startIndex, endIndex).map((row, rowIndex) => {
            const actualRow = startIndex + rowIndex

            return (
              <div
                key={actualRow}
                role="row"
                className="flex border-b"
              >
                {columns.map((col, colIndex) => {
                  const isActive =
                    activeCell.row === actualRow &&
                    activeCell.col === colIndex

                  return (
                    <div
                      key={col.id}
                      role="gridcell"
                      aria-selected={isActive}
                      className={`px-2 py-1 border-r truncate ${
                        isActive
                          ? 'bg-blue-100 outline outline-2 outline-blue-500'
                          : ''
                      }`}
                      style={{ width: col.width, height: rowHeight }}
                    >
                      {String(col.accessor(row))}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

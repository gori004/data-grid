import React from 'react'

export type CellRenderer<T> = (value: unknown, row: T) => React.ReactNode

export type CellEditor = (
  value: unknown,
  onChange: (value: unknown) => void
) => React.ReactNode

export interface Column<T> {
  id: string
  header: string
  width: number

  accessor: (row: T) => unknown

  cell?: CellRenderer<T>
  editor?: CellEditor

  sortable?: boolean
  pinned?: 'left' | 'right'
  hidden?: boolean

  validate?: (value: unknown) => Promise<boolean>
}

export interface DataGridProps<T> {
  rows: T[]
  columns: Column<T>[]

  rowHeight: number
  height: number
  width: number
}

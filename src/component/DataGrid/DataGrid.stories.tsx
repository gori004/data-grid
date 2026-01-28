import type { Meta, StoryObj } from '@storybook/react'
import { DataGrid } from './DataGrid'

type Person = {
  id: number
  name: string
  age: number
}

 const rows: Person[] = Array.from({ length: 150 }).map((_, i) => ({
  id: i,
  name: `User ${i}`,
  age: 20 + (i % 30),
}))


const columns = [
  {
    id: 'id',
    header: 'ID',
    width: 80,
    accessor: (row: Person) => row.id,
  },
  {
    id: 'name',
    header: 'Name',
    width: 200,
    accessor: (row: Person) => row.name,
  },
  {
    id: 'age',
    header: 'Age',
    width: 100,
    accessor: (row: Person) => row.age,
  },
]

const meta: Meta<typeof DataGrid<Person>> = {
  title: 'Components/DataGrid',
  component: DataGrid,
}

export default meta

type Story = StoryObj<typeof DataGrid<Person>>

export const Default: Story = {
  args: {
    rows,
    columns,
    height: 400,
    width: 600,
    rowHeight: 32,
  },
}

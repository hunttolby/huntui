import { faker } from '@faker-js/faker'
import { GenericSection } from 'components/List/List'

import { List } from '../components'
import { generateItemArray } from './utils'

import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof List> = {
  component: List,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof List>

type ListItem = {
  name: string
  company: string
  date: Date
  materials: {
    name: string
    price: string
  }[]
}

type Material = {
  name: string
  price: string
}

const createMaterial = (): Material => ({
  name: faker.commerce.productMaterial(),
  price: faker.commerce.price(),
})

const createListItem = (): ListItem => ({
  name: faker.person.fullName(),
  company: faker.company.name(),
  date: faker.date.recent(),
  materials: generateItemArray(4, createMaterial),
})

const listData: ListItem[] = generateItemArray(20, createListItem)

const listSections = [
  [
    {
      id: 'name',
      title: 'Contact',
      width: 116,
      content: (r: ListItem) => (
        <div className="text-lg-emphasis text-primary truncate">{r.name}</div>
      ),
    },
    {
      id: 'company',
      title: 'Company',
      width: 116,
      content: (r: ListItem) => <div className="text-lg text-tertiary truncate">{r.company}</div>,
    },
  ],
  [
    {
      id: 'date',
      title: 'Date',
      width: 80,
      content: (r: ListItem) => <div className="text-tertiary">{r.date.toISOString()}</div>,
    },
  ],
  [
    {
      id: 'materials',
      title: 'Materials',
      width: 540,
      content: (r: ListItem) => (
        <div className="flex items-center gap-12">
          {r.materials.map(m => (
            <div className="flex items-center gap-8 bg-accent rounded-6 text-white px-6 py-2">
              <div className="text-sm-emphasis">{m.name}</div>
              <div className="text-sm-strong">{m.price}</div>
            </div>
          ))}
        </div>
      ),
    },
  ],
]

export const Default: Story = {
  render: args => (
    <div className="w-full h- full bg-accent">
      <List {...args} />
    </div>
  ),
}

Default.args = {
  sections: listSections as GenericSection<unknown>[][],
  items: listData,
  onRowClick: r => console.log({ r }),
}

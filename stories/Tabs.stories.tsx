import { useState } from 'react'

import { Tabs } from '../components'

import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Tabs>

const TAB_ONE = 'Tab one'
const TAB_TWO = 'Tab two'
const TAB_THREE = 'Tab three'

type Tab = typeof TAB_ONE | typeof TAB_TWO | typeof TAB_THREE
const TABS: Tab[] = [TAB_ONE, TAB_TWO, TAB_THREE]

const TabsStory = () => {
  const [tab, setTab] = useState<Tab>(TAB_ONE)
  return (
    <div className="flex flex-col gap-10">
      <Tabs options={TABS} value={tab} onChange={tab => setTab(tab as Tab)} />
      <div className="text-emphasis text-primary">Current tab is - {tab}</div>
    </div>
  )
}

export const Default: Story = {
  render: args => <TabsStory />,
}

Default.args = {}

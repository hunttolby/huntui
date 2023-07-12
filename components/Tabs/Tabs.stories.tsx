import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { TabSelector } from './TabSelector'

export default {
  component: TabSelector,
  title: 'TabSelector',
} as ComponentMeta<typeof TabSelector>

const TAB_ONE = 'Tab one'
const TAB_TWO = 'Tab two'
const TAB_THREE = 'Tab three'

type Tab = typeof TAB_ONE | typeof TAB_TWO | typeof TAB_THREE
const TABS = [TAB_ONE, TAB_TWO, TAB_THREE]

const Template: ComponentStory<typeof TabSelector> = args => {
  const [tab, setTab] = useState<Tab>(TAB_ONE)

  return (
    <div className="w-400 flex flex-col gap-16">
      <TabSelector options={TABS} value={tab} onChange={v => setTab(v as Tab)} />
      <div className="text-primary text-h3">{tab}</div>
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {}

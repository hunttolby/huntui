import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextArea } from './TextArea'

export default {
  component: TextArea,
  title: 'TextArea',
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = args => (
  <div className="w-400 flex">
    <TextArea placeholder="this is placeholder" {...args} />
  </div>
)

export const Primary = Template.bind({})
Primary.args = {}

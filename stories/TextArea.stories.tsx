import { TextAreaProps } from 'components/TextArea/TextArea'
import { useState } from 'react'

import { TextArea } from '../components'

import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof TextArea> = {
  component: TextArea,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TextArea>

const defaultArgs: TextAreaProps = {
  label: 'Test textArea',
  placeholder: 'heres a placeholder',
  size: 'small',
}

const TextAreaStory = (args: TextAreaProps) => {
  const [value, setValue] = useState<string>('')
  const handleChange = (v: string) => {
    setValue(v)
    console.log(v)
  }
  return (
    <div className="w-400">
      <TextArea {...args} value={value} onChange={handleChange} />
    </div>
  )
}

export const Primary: Story = {
  render: args => <TextAreaStory {...args} />,
}

Primary.args = {
  ...defaultArgs,
}

export const Errored: Story = {
  render: args => <TextAreaStory {...args} />,
}

Errored.args = {
  ...defaultArgs,
  error: true,
}

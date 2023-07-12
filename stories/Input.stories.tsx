import { InputProps } from 'components/Input/Input'
import { useState } from 'react'

import { Input } from '../components'

import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

const defaultArgs: InputProps = {
  label: 'Test input',
  placeholder: 'heres a placeholder',
  size: 'small',
}

const InputStory = (args: InputProps) => {
  const [value, setValue] = useState<string>('')
  const handleChange = (v: string) => {
    setValue(v)
    console.log(v)
  }
  return (
    <div className="w-400">
      <Input {...args} value={value} onChange={handleChange} />
    </div>
  )
}

export const Primary: Story = {
  render: args => <InputStory {...args} />,
}

Primary.args = {
  ...defaultArgs,
}

export const Errored: Story = {
  render: args => <InputStory {...args} />,
}

Errored.args = {
  ...defaultArgs,
  error: true,
}

export const WithAction: Story = {
  render: args => <InputStory {...args} />,
}

WithAction.args = {
  ...defaultArgs,
  action: () => console.log('action'),
  actionText: 'Click for help',
}

import { faker } from '@faker-js/faker'

import { DropdownInput } from '../components'
import { DropdownProps } from '../components/DropdownInput/DropdownInput'
import { DropdownOption } from '../components/DropdownInput/types'
import { generateItemArray } from './utils'

import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof DropdownInput> = {
  component: DropdownInput,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DropdownInput>

const createOption = (x: number): DropdownOption => ({
  label: faker.animal.fish(),
  value: x.toString(),
})

const defaultArgs: DropdownProps = {
  options: generateItemArray(10, createOption),
  size: 'small',
  label: 'Test dropdown input',
  placeholder: 'heres a placeholder',
  closeOnChange: true,
}

export const Default: Story = {
  render: args => (
    <div className="w-400">
      <DropdownInput {...args} />
    </div>
  ),
}

Default.args = { ...defaultArgs }

export const WithCreate: Story = {
  render: args => (
    <div className="w-400">
      <DropdownInput {...args} />
    </div>
  ),
}

WithCreate.args = {
  ...defaultArgs,
  onCreateOption: newValue => console.log({ newValue }),
}

export const Optional: Story = {
  render: args => (
    <div className="w-400">
      <DropdownInput {...args} />
    </div>
  ),
}

Optional.args = { ...defaultArgs, optional: true }

export const Errored: Story = {
  render: args => (
    <div className="w-400">
      <DropdownInput {...args} />
    </div>
  ),
}

Errored.args = { ...defaultArgs, error: true }

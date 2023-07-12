import { ButtonProps } from 'components/Button/Button'

import { Button } from '../components'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

const defaultArgs: ButtonProps = {
  onClick: () => console.log('button clicked!'),
  children: 'Button',
  size: 'medium',
}

export const Primary: Story = {
  render: args => <Button {...args} />,
}

Primary.args = {
  ...defaultArgs,
  variant: 'primary',
}

export const Secondary: Story = {
  render: args => <Button {...args} />,
}

Secondary.args = {
  ...defaultArgs,
  variant: 'secondary',
}

export const Tertiary: Story = {
  render: args => <Button {...args} />,
}

Tertiary.args = {
  ...defaultArgs,
  variant: 'tertiary',
}

export const Alert: Story = {
  render: args => <Button {...args} />,
}

Alert.args = {
  ...defaultArgs,
  variant: 'alert',
}

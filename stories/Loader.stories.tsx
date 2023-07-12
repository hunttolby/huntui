import { LoaderProps } from 'components/Loader/Loader'

import { Loader } from '../components'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Loader> = {
  component: Loader,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Loader>

const defaultArgs: LoaderProps = {
  size: 'medium',
}

export const Small: Story = {
  render: args => <Loader {...args} />,
}

Small.args = {
  ...defaultArgs,
  size: 'small',
}

export const Medium: Story = {
  render: args => <Loader {...args} />,
}

Medium.args = {
  ...defaultArgs,
}

export const Large: Story = {
  render: args => <Loader {...args} />,
}

Large.args = {
  ...defaultArgs,
  size: 'large',
}

export const Screen: Story = {
  render: args => <Loader {...args} />,
}

Screen.args = {
  ...defaultArgs,
  size: 'screen',
}

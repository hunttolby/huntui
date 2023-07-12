import { $overlayer, Button, OverlayerProvider } from '../components'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof OverlayerProvider> = {
  component: OverlayerProvider,
}

export default meta

type Story = StoryObj<typeof OverlayerProvider>

const TEST_DRAWER = 'TEST_DRAWER'
const TEST_MODAL = 'TEST_MODAL'

const Drawer = ({ drawerId }: { drawerId: string }) => {
  const thisDrawer = $overlayer({
    type: 'use',
    id: drawerId,
  })
  return (
    <div className="w-full h-full flex flex-col bg-l0">
      <div className="w-full h-64 bg-l1 px-12 flex items-center justify-between">
        <div className="text-lg-emphasis text-primary">Drawer</div>
        <Button onClick={thisDrawer.close} variant="tertiary">
          Close
        </Button>
      </div>
      <div className="flex flex-col text-emphasis text-primary">Drawer content</div>
    </div>
  )
}

// WIP
const Modal = ({ modalId }: { modalId: string }) => {
  const thisDrawer = $overlayer({
    type: 'use',
    id: modalId,
  })
  return (
    <div className="w-500 h-440 flex flex-col bg-l0">
      <div className="w-full h-32 bg-l1 flex items-center justify-between">
        <div className="text-lg-emphasis text-primary">Modal</div>
        <Button onClick={thisDrawer.close} variant="tertiary">
          Close
        </Button>
      </div>
      <div className="flex flex-col text-emphasis text-primary">Modal content</div>
    </div>
  )
}

const OverlayerContent = () => {
  const drawer = $overlayer({
    type: 'drawer',
    id: TEST_DRAWER,
    component: <Drawer drawerId={TEST_DRAWER} />,
  })
  const modal = $overlayer({
    type: 'modal',
    id: TEST_MODAL,
    component: <Modal modalId={TEST_MODAL} />,
  })

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <Button onClick={() => drawer.open()}>Open drawer</Button>
      {/* <Button onClick={() => modal.open()}>Open modal</Button> */}
    </div>
  )
}

const OverlayerStory = () => {
  return (
    <div className="w-full h-full">
      <OverlayerProvider>
        <OverlayerContent />
      </OverlayerProvider>
    </div>
  )
}

export const Default: Story = {
  render: args => <OverlayerStory />,
}

Default.args = {}

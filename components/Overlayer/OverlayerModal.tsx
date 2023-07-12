import { FC } from 'react'

import { OverlayerProps } from './OverlayerContext'

export const OverlayerModal: FC<OverlayerProps<'modal'>> = ({ id, component, options }) => {
  return (
    <div
      id={id}
      className="shadow-2xl rounded-8 bg-l0 outline-none backdrop:opacity-10 backdrop:backdrop-blur-[1px]"
    >
      <div className="flex flex-1 p-24 w-full">{component}</div>
    </div>
  )
}

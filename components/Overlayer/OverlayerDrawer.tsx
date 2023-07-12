import clsx from 'clsx'
import { FC, useContext } from 'react'

import { useWindowSize } from '../../utils/use-window-size'
import { OverlayerContext, OverlayerProps } from './OverlayerContext'

export type DrawerSize = 'small' | 'medium' | 'large'

const round8 = (x: number) => {
  return Math.ceil(x / 8) * 8
}

export const OverlayerDrawer: FC<OverlayerProps<'drawer'> & { z: number }> = ({
  id,
  component,
  options,
  z,
}) => {
  const [context, updateContext, order] = useContext(OverlayerContext)
  const drawersOrder = order.reduce((acc, curr) => {
    const currInCtx = context.find(c => c.id === curr)
    if (currInCtx?.isOpen && !acc.includes(curr)) {
      acc.push(curr)
    }
    return acc
  }, [] as string[])

  const orderIdx = drawersOrder.findIndex(d => d === id)
  const { width, height } = useWindowSize()

  const trueWidth: Record<DrawerSize, number> = {
    small: round8(width * 0.2),
    medium: round8(width * 0.4),
    large: round8(width * 0.6),
  }

  const getWidth = () => {
    if (options?.size) {
      return trueWidth[options?.size]
    }
    return trueWidth.large
  }

  const isNotTop = drawersOrder.length > 1 && orderIdx !== drawersOrder.length - 1

  return (
    <div
      id={id}
      className={clsx(
        'bg-transparent shadow-2xl absolute outline-none rounded-16 animate-drawer-slide-left z-[100] p-0 transition-[scale,right] duration-200 ease-in-out',
      )}
      style={{
        width: getWidth(),
        left: width - getWidth() - 16,
        marginRight: isNotTop ? 200 : 0,
        top: 16,
        height: height - 24,
        zIndex: 1000 + z,
        scale: isNotTop ? `${100 - (drawersOrder.length - 1) * 4}%` : '100%',
      }}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          updateContext(id, { isOpen: false } as OverlayerProps<'drawer'>)
          options?.onClose?.()
        }
      }}
    >
      <div
        className={clsx(
          'w-full h-full overflow-hidden bg-l0 outline-none flex flex-col rounded-16',
        )}
      >
        {component}
      </div>
    </div>
  )
}

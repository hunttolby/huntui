import { Context, createContext, FC, ReactElement, ReactNode, useContext, useState } from 'react'

import { DrawerSize, OverlayerDrawer } from './OverlayerDrawer'
import { OverlayerModal } from './OverlayerModal'
import { OverlayerOptions, OverlayerType } from './types'

export type OverlayerContextT = Record<
  OverlayerType,
  { id: string; props: OverlayerProps<OverlayerType> }[]
>

type OverlayerTypeOptions = {
  modal: void
  drawer: {
    size?: DrawerSize
  }
  use: void
  confirm: void
}

interface OverlayerId {
  drawer: string
  modal: string
  use: string
  confirm: string
}

export type OverlayerProps<T extends OverlayerType> = {
  type: T
  id: OverlayerId[T]
  component?: ReactElement | ReactNode
  options?: OverlayerTypeOptions[T] & OverlayerOptions
  isOpen?: boolean
}

export type OverlayerOpenOrder = string[]

const defaultContext: OverlayerProps<OverlayerType>[] = []

export const OverlayerContext: Context<
  [
    OverlayerProps<OverlayerType>[],
    (id: string, props: OverlayerProps<OverlayerType>) => void,
    OverlayerOpenOrder,
    (newOrder: OverlayerOpenOrder) => void,
  ]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
> = createContext([defaultContext, (_, __) => {}, [] as OverlayerOpenOrder, x => {}])

export const $overlayer = <T extends OverlayerType>(
  props: OverlayerProps<T>,
): {
  open: () => void
  close: () => void
  isOpen: boolean
} => {
  const [context, updateContext, order, setOrder] = useContext(OverlayerContext)
  const doc = typeof document !== 'undefined' ? document : ({} as HTMLDocument)
  const overlayerEl = doc?.getElementById?.(props.id as string) as HTMLDialogElement
  const ctxIds = context?.map(c => c.id)
  const currIdx = ctxIds?.findIndex(c => c === props.id)
  const ctxHasItem = currIdx !== -1

  const close = () => {
    updateContext(props.id, { ...context[currIdx], isOpen: false })
    const filteredOrder = order.filter(i => i !== props.id)
    setOrder(filteredOrder)
    context[currIdx]?.options?.onClose?.()
  }

  if (props.type === 'use' && ctxHasItem) {
    return {
      open: () => undefined,
      close,
      isOpen: overlayerEl?.open,
    }
  }
  if (!ctxHasItem && props.type !== 'use') {
    updateContext(props.id, props)
  }

  const open = (newComponent?: ReactElement | ReactNode) => {
    const ctxCopy = [...context]
    if (newComponent) {
      ctxCopy[currIdx].component = newComponent
    }
    setOrder([...order, props.id])
    context[currIdx]?.options?.onOpen?.()
    updateContext(props.id, { ...ctxCopy[currIdx], isOpen: true })
  }

  return {
    open: open,
    close: close,
    isOpen: overlayerEl?.open,
  }
}

export const OverlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [context, setContext] = useState(defaultContext)
  const [order, setOrder] = useState<OverlayerOpenOrder>([])

  const handleUpdateContext = (id: string, newProps: OverlayerProps<OverlayerType>) => {
    const ctxCopy = [...context]
    const currIdx = context.findIndex(c => c.id === id)
    if (currIdx === -1) {
      setContext([...ctxCopy, newProps])
      return
    }
    ctxCopy[currIdx] = { ...ctxCopy[currIdx], ...newProps } as OverlayerProps<OverlayerType>
    setContext(ctxCopy)
  }
  return (
    <OverlayerContext.Provider value={[context, handleUpdateContext, order, setOrder]}>
      {context.map((m, i) => {
        if (!m.isOpen) return null
        if (m.type === 'modal')
          return <OverlayerModal key={m.id} {...(m as OverlayerProps<'modal'>)} />
        if (m.type === 'confirm')
          return <OverlayerModal key={m.id} {...(m as OverlayerProps<'modal'>)} />
        if (m.type === 'drawer')
          return (
            <OverlayerDrawer
              key={m.id}
              {...(m as OverlayerProps<'drawer'>)}
              z={order.findIndex(o => o === m.id)}
            />
          )
        return null
      })}

      {children}
    </OverlayerContext.Provider>
  )
}

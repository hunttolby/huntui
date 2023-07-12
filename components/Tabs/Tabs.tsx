import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

import { TabOption } from './types'

export type TabProps<T extends TabOption> = {
  options: T[]
  value: T
  onChange?: (v: string, index: number) => void
  initialTab?: string
}

export const Tabs = <T extends TabOption>({
  options = [],
  value: _value,
  onChange = () => undefined,
}: TabProps<T>): JSX.Element => {
  const [value, setValue] = useState<TabOption>(_value)
  useEffect(() => {
    setValue(_value)
  }, [_value])

  const valueIndex = options.findIndex(o => o === value)
  const handleSetSelected = (tab: TabOption, index: number) => {
    setValue(tab)
    onChange(tab, index)
  }

  const renderTab = (tab: TabOption, index: number) => {
    const isActive = index === valueIndex
    return (
      <div
        key={tab}
        onClick={() => handleSetSelected(tab, index)}
        className={clsx(
          'text-primary text-emphasis px-8 py-6 cursor-pointer select-none',
          isActive && 'rounded-4 bg-button-tertiary-hover !cursor-default',
        )}
      >
        {tab}
      </div>
    )
  }

  return <div className="flex gap-16">{options?.map((tab, index) => renderTab(tab, index))}</div>
}

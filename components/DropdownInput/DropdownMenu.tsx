import { clsx } from 'clsx'
import { FC } from 'react'

import { CREATE_OPTION } from './DropdownInput'
import { DropdownOption } from './types'

type Props = {
  options: DropdownOption[]
  width?: number
  onChange: (opt: DropdownOption) => void
  onCreateOption?: (val: string) => void
  value: string
  cursor?: number
  onHover?: (opt: DropdownOption, index: number) => void
}

export const DropdownMenu: FC<Props> = ({
  options,
  width = 200,
  onChange,
  onCreateOption = null,
  value,
  cursor,
  onHover,
}) => {
  const menuItem = (opt: DropdownOption, index: number) => (
    <div
      className={clsx(
        'h-28 flex items-center justify-between px-8 hover:bg-l2 cursor-pointer',
        cursor === index ? '!bg-l2' : '',
      )}
      onMouseEnter={() => onHover?.(opt, index)}
      onClick={() => {
        const [marker, value] = opt.value.split('-')
        const isCreateOption = marker === CREATE_OPTION
        if (onCreateOption && isCreateOption) {
          onCreateOption?.(value)
          return
        }
        onChange(opt)
      }}
      key={opt.value}
    >
      <div className="flex items-center gap-8">
        <div className="text-small text-primary">{opt.label}</div>
      </div>
      {value === opt.value && <div className="text-emphasis text-accent">✔</div>}
    </div>
  )

  const emptyState = menuItem({ label: 'No items found', value: '' }, 0)

  return (
    <div className="bg-l1 rounded-4 py-4 shadow-xl" style={{ width: width }}>
      {options.length > 0 ? options.map((opt, index) => menuItem(opt, index)) : emptyState}
    </div>
  )
}

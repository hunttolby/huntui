import { ReactNode, useId, useMemo } from 'react'

import { ListHeader } from './ListHeader'
import { ListItem } from './ListItem'
import { GenericSection } from './types'

type Props<T> = {
  items: T[]
  sections: GenericSection<T>[][]
  onRowClick?: (row: T) => void
}

export const List = <T,>({
  items = [],
  sections,
  onRowClick = () => undefined,
}: Props<T>): JSX.Element => {
  const uniqueListId = useId()
  if (items?.length === 0 || !items) return <div />
  return (
    <div className="flex-1 overflow-y-auto basis-0">
      <div className="relative flex flex-col">
        <div className="sticky top-0 w-full border-t-[1px] border-t-l2">
          <ListHeader sections={sections} />
        </div>
        <div className="flex-1 h-0 overflow-y-auto">
          {items?.map((item, index) => (
            <ListItem
              item={item}
              sections={sections}
              key={`${uniqueListId}-${index}`}
              onRowClick={onRowClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

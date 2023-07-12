import { ReactElement, useId } from 'react'

import { GenericSection } from './types'

type Props<T> = {
  item: T
  sections: GenericSection<T>[][]
  onRowClick?: (row: T) => void
}

export const ListItem = <T,>({ sections, item, onRowClick }: Props<T>): JSX.Element => {
  const key = item['id' as keyof T] as string
  const uniqueId = useId()
  return (
    <div
      className="flex h-59 border-b-[1px] border-b-l2 justify-between px-24 bg-l0 hover:!bg-l1 cursor-pointer"
      onClick={() => onRowClick?.(item)}
      key={key ?? uniqueId}
    >
      {sections?.map((section, i) => {
        return (
          <div className="flex items-center gap-36" key={`${uniqueId}-section-${i}`}>
            {section?.map((s, ind) => {
              if (s?.content)
                return (
                  <div
                    style={{ width: s?.width }}
                    className="truncate"
                    key={`${uniqueId}-section-${i}-${ind}`}
                  >
                    {s?.content?.(item)}
                  </div>
                )
              const fieldValue = item[s.id as keyof T]
              return (
                <div
                  key={`${uniqueId}-section-${i}-${ind}`}
                  style={{ minWidth: s?.width }}
                  className="flex text-large text-secondary-500 pl-4"
                >
                  {fieldValue as ReactElement}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

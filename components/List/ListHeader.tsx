import { GenericSection } from './types'

type Props<T> = {
  sections: GenericSection<T>[][]
}

export const ListHeader = <T,>({ sections }: Props<T>): JSX.Element => {
  return (
    <div className="flex h-43 border-b-[1px] border-b-l2 px-24 py-12 justify-between bg-l0">
      {sections?.map((section, i) => {
        return (
          <div className="flex items-center gap-36" key={`header-${i}`}>
            {section?.map(s => (
              <div
                key={`header-${s.id}`}
                style={{ minWidth: s.width }}
                className="flex items-center text-lg text-primary"
              >
                {s?.title}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

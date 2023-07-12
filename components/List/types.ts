import { ReactNode } from 'react'

export type GenericSection<T> = {
  id: string | number
  title: string
  content?: (row: T) => ReactNode
  width: number
}
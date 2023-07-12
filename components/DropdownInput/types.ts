import { SharedSizes } from 'components/types'

export type DropdownOption = {
  label: string
  value: string
}

export type DropdownSize = Exclude<SharedSizes, 'medium'>
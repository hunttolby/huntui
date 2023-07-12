import Tippy from '@tippyjs/react'
import { clsx } from 'clsx'
import { FC, ReactElement, ReactNode, useCallback, useRef, useState } from 'react'

import { onKeyPress } from '../../utils/onKeyPress'
import { useClickOutside } from '../../utils/use-click-outside'
import { DropdownMenu } from './DropdownMenu'
import { DropdownOption, DropdownSize } from './types'

export const CREATE_OPTION = 'CREATE_OPTION'

export type DropdownProps = {
  onChange?: (v: string) => void
  value?: string
  size?: DropdownSize
  error?: boolean
  label?: string | ReactNode
  options: DropdownOption[]
  closeOnChange?: boolean
  placeholder?: string
  optional?: boolean
  required?: boolean
  onCreateOption?: (val: string) => void
  disabled?: boolean
  // searchable?: boolean
  // footer?: () => ReactElement
}

export const DropdownInput: FC<DropdownProps & { className?: string }> = ({
  onChange,
  value: _value = '',
  size = 'large',
  error = false,
  className,
  label,
  options: _options = [],
  closeOnChange,
  placeholder,
  optional,
  required,
  onCreateOption,
  disabled,
  ...props
}) => {
  const [newItems, setNewItems] = useState<DropdownOption[]>([])

  const options = [..._options, ...newItems]

  const [value, setValue] = useState<string>(_value)
  const [searchValue, setSearchValue] = useState<string>('')
  const currOption = options?.find(opt => opt?.value === value) ?? { label: '', value: '' }
  const [cursor, setCursor] = useState<number>(0)

  const [focused, setFocused] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useClickOutside(
    containerRef,
    useCallback(() => setFocused(false), []),
  )

  const handleChange = (opt: DropdownOption) => {
    if (closeOnChange) setFocused(false)
    if (opt.value === value && !required) {
      setSearchValue('')
      setValue('')
      onChange?.('')
      return
    }
    onChange?.(opt.value)
    setValue(opt.value)
    setSearchValue('')
  }

  const sizeStyles: Record<DropdownSize, string> = {
    small: 'px-12 text-default !h-28 pb-1',
    large: 'px-12 py-10 text-large !h-40',
  }

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().match(new RegExp(searchValue.toLowerCase(), 'g')),
  )

  const createOption: DropdownOption = {
    label: `Create "${searchValue}"`,
    value: `${CREATE_OPTION}-${searchValue}`,
  }

  const finalizedOptions = [...filteredOptions]

  if (onCreateOption && filteredOptions.length === 0 && searchValue !== '') {
    finalizedOptions.push(createOption)
  }

  const handleCreateOption = (val: string) => {
    const newItemsCopy = [...newItems]
    newItemsCopy.push({ label: val, value: val })
    setNewItems(newItemsCopy)
    onCreateOption?.(val)
    setValue(val)
    setSearchValue('')
    setFocused(false)
  }

  return (
    <div ref={containerRef} className="w-full select-none">
      <Tippy
        content={
          <DropdownMenu
            width={inputRef?.current?.getBoundingClientRect?.().width ?? 200}
            options={finalizedOptions}
            onCreateOption={handleCreateOption}
            onChange={handleChange}
            value={value}
            cursor={cursor}
            onHover={(_, i) => setCursor(i)}
          />
        }
        interactive
        visible={focused && finalizedOptions.length > 0}
        placement="bottom-start"
        duration={0}
      >
        <div className="relative">
          {(label || optional) && (
            <div className="pb-12 flex items-center justify-between">
              {label ? <div className="text-tertiary text-emphasis">{label}</div> : <div />}
              {optional ? <div className="text-secondary text-emphasis">optional</div> : <div />}
            </div>
          )}
          <input
            className={clsx(
              'w-full !appearance-none bg-l1 rounded-3 placeholder:!text-secondary text-primary outline-none focus:shadow-input-border-active cursor-pointer focus:!cursor-text',
              sizeStyles[size],
              className,
              error && 'shadow-input-border-error',
            )}
            placeholder={placeholder ?? ''}
            value={searchValue !== '' ? searchValue : currOption.label}
            onChange={e => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={e =>
              onKeyPress(
                e,
                ['ArrowDown', 'ArrowUp', 'Enter', 'Backspace'],
                [
                  () => {
                    setCursor(curr => curr + 1)
                  },
                  () => {
                    setCursor(curr => curr - 1)
                  },
                  () => {
                    if (filteredOptions.length > 0) {
                      handleChange(finalizedOptions[cursor])
                      inputRef.current?.blur()
                      return
                    }
                    if (onCreateOption) {
                      const [_, value] = finalizedOptions[0].value.split('-')
                      handleCreateOption?.(value)
                      return
                    }
                  },
                  () => {
                    if (value) {
                      setValue('')
                      setSearchValue('')
                    }
                  },
                ],
              )
            }
            ref={inputRef}
            onFocus={() => setFocused(true)}
            disabled={disabled}
            {...props}
          />
        </div>
      </Tippy>
    </div>
  )
}

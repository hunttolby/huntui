import { clsx } from 'clsx'
import { FC, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react'

import { InputSize } from './types'

type BaseProps = Readonly<{
  onChange?: (v: string) => void
  value?: string
  size?: InputSize
  error?: boolean
  label?: string | ReactNode
  placeholder?: string
  optional?: boolean
  action?: (updateFn: (v: string) => void, currVal: string) => void
  actionText?: string
}>

export type InputProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseProps>

export const Input: FC<InputProps & { className?: string }> = ({
  onChange,
  value: _value = '',
  size = 'large',
  error = false,
  className,
  label,
  optional,
  action,
  actionText,
  ...props
}) => {
  const [value, setValue] = useState<string>(_value)

  useEffect(() => {
    setValue(_value)
  }, [_value])

  const handleChange = (v: string) => {
    onChange?.(v)
    setValue(v)
  }

  const sizeStyles: Record<InputSize, string> = {
    small: 'px-12 text-default !h-28 pb-1',
    large: 'px-12 py-10 text-large !h-40',
  }

  return (
    <div className="flex flex-col w-full">
      {(label || optional) && (
        <div className="pb-12 flex items-center justify-between">
          {label ? <div className="text-tertiary text-emphasis">{label}</div> : <div />}
          {optional && !action ? (
            <div className="text-secondary text-emphasis">optional</div>
          ) : (
            <div />
          )}
          {action ? (
            <div
              className="text-accent text-emphasis cursor-pointer active:opacity-80"
              onClick={() => action(handleChange, value)}
            >
              {actionText}
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
      <input
        className={clsx(
          '!appearance-none w-full bg-l1 rounded-3 placeholder:!text-secondary text-primary outline-none focus:shadow-input-border-active',
          sizeStyles[size],
          className,
          error && 'shadow-input-border-error',
        )}
        value={value}
        onChange={e => handleChange(e.target.value)}
        {...props}
      />
    </div>
  )
}

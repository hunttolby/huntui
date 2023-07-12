import { clsx } from 'clsx'
import { FC, ReactNode, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'

import { TextAreaSize } from './types'

type BaseProps = Readonly<{
  onChange?: (v: string) => void
  value?: string
  size?: TextAreaSize
  error?: boolean
  label?: string | ReactNode
  placeholder?: string
  optional?: boolean
  className?: string
}>

export type TextAreaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseProps>

export const TextArea: FC<TextAreaProps> = ({
  onChange,
  value: _value = '',
  size = 'large',
  error = false,
  className,
  optional,
  label,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement)
  const [value, setValue] = useState<string>(_value)

  useEffect(() => {
    setValue(_value)
  }, [_value])

  useEffect(() => {
    textAreaRef.current.style.height = '0px'
    const scrollHeight = textAreaRef.current.scrollHeight
    textAreaRef.current.style.height = scrollHeight + 'px'
    textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 256)}px`
  }, [value])

  const handleChange = (v: string) => {
    onChange?.(v)
    setValue(v)
  }

  const sizeStyles: Record<TextAreaSize, string> = {
    small: 'px-12 py-6 text-default h-28',
    large: 'px-12 py-10 text-large h-40',
  }

  return (
    <div className="flex-col w-full">
      <div className="pb-12 flex items-center justify-between">
        {label ? <div className="text-tertiary text-emphasis capitalize">{label}</div> : <div />}
        {optional ? <div className="text-secondary text-emphasis">optional</div> : <div />}
      </div>
      <textarea
        className={clsx(
          'resize-none overflow-hidden !appearance-none w-full bg-l1 rounded-3 placeholder:!text-secondary text-primary outline-none focus:shadow-input-border-active',
          sizeStyles[size],
          className,
          error && '!shadow-input-border-error',
        )}
        value={value}
        onChange={e => handleChange(e.target.value)}
        ref={textAreaRef}
        {...props}
      />
    </div>
  )
}

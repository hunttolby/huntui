import { clsx } from 'clsx'
import { FC, ReactNode } from 'react'

import { Loader } from '../Loader'
import { ButtonSize, ButtonVariant } from './types'

export type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
  className?: string
}

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  size = 'medium',
  variant = 'primary',
  disabled,
  loading,
  className,
}) => {
  const sharedStyles =
    'select-none flex items-center relative text-center justify-center gap-8 rounded-4 w-fit cursor-pointer disabled:!cursor-not-allowed'
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'text-white bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary-disabled ',
    secondary:
      'text-primary bg-button-secondary hover:bg-button-secondary-hover outline outline-1 outline-l3 disabled:bg-button-secondary-disabled disabled:text-secondary',
    tertiary: 'text-primary hover:bg-button-tertiary-hover disabled:bg-button-tertiary-disabled',
    alert:
      'text-white bg-button-alert hover:bg-button-alert-hover disabled:bg-button-alert-disabled',
  }
  const sizeStyles: Record<ButtonSize, string> = {
    small: 'px-8 py-4 text-sm-emphasis',
    medium: 'px-12 py-6 text-emphasis',
    large: 'px-16 py-8 text-lg-emphasis',
  }
  return (
    <button
      className={clsx(
        variantStyles[variant],
        sizeStyles[size],
        sharedStyles,
        !disabled && 'active:scale-[99%]',
        className,
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <div className="absolute right-[50%] translate-x-[50%]">
          <Loader size={size} />
        </div>
      )}
      <div className={clsx(loading && 'opacity-0 pointer-events-none')}>{children}</div>
    </button>
  )
}

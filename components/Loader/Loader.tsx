import { clsx } from 'clsx'
import { FC } from 'react'

import { LoaderSize } from './types'

export type LoaderProps = {
  size: LoaderSize
}

export const Loader: FC<LoaderProps> = ({ size = 'medium' }) => {
  const sharedDotStyles = 'rounded-full bg-default opacity-80'
  const sizeStyles: Record<LoaderSize, string> = {
    small: 'w-6 h-6',
    medium: 'w-6 h-6',
    large: 'w-12 h-12',
    screen: 'w-16 h-16',
  }
  const sizeGapStyles: Record<LoaderSize, string> = {
    small: 'gap-2',
    medium: 'gap-2',
    large: 'gap-4',
    screen: 'gap-6',
  }

  return (
    <div className={clsx(sizeGapStyles[size], 'flex -mb-2')}>
      <div className={clsx(sharedDotStyles, sizeStyles[size], 'animate-bounce')} />
      <div
        style={{ animationDelay: '150ms' }}
        className={clsx(sharedDotStyles, sizeStyles[size], 'animate-bounce')}
      />
      <div
        style={{ animationDelay: '300ms' }}
        className={clsx(sharedDotStyles, sizeStyles[size], 'animate-bounce')}
      />
    </div>
    // <div
    //   className={clsx(
    //     'animate-spin rounded-full select-none border-white border-t-black',
    //     sizeMap[size],
    //   )}
    // />
  )
}

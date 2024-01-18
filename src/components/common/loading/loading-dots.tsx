import clsx from 'clsx'
import React, { FC } from 'react'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingDots: FC<Props> = ({ size = 'md', className = '' }) => {
  return (
    <span
      className={clsx('inline-flex items-center gap-x-[2px]', {
        [className]: !!className,
      })}
    >
      <span
        className={clsx(
          'bg-zinc-800 dark:bg-zinc-200 rounded-full inline-block animate-[blink_1.4s_infinite_both]',
          {
            'w-[3px] h-[3px]': size === 'sm',
            'w-[5px] h-[5px]': size === 'md',
            'w-[7px] h-[7px]': size === 'lg',
          },
        )}
      />
      <span
        className={clsx(
          'bg-zinc-800 dark:bg-zinc-200 w-[5px] h-[5px] rounded-full inline-block animate-[blink_1.4s_infinite_200ms_both]',
          {
            'w-[3px] h-[3px]': size === 'sm',
            'w-[5px] h-[5px]': size === 'md',
            'w-[7px] h-[7px]': size === 'lg',
          },
        )}
      />
      <span
        className={clsx(
          'bg-zinc-800 dark:bg-zinc-200 w-[5px] h-[5px] rounded-full inline-block animate-[blink_1.4s_infinite_400ms_both]',
          {
            'w-[3px] h-[3px]': size === 'sm',
            'w-[5px] h-[5px]': size === 'md',
            'w-[7px] h-[7px]': size === 'lg',
          },
        )}
      />
    </span>
  )
}

export default LoadingDots

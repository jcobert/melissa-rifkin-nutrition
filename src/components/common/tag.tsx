import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  tag?: string
  className?: string
}

const Tag: FC<Props> = ({ tag, className }) => {
  return (
    <span
      className={cn([
        'rounded-full px-4 py-px border border-gray-300 text-sm bg-gray-200 text-center capitalize font-medium',
        className,
      ])}
    >
      {tag}
    </span>
  )
}

export default Tag

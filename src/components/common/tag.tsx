import Link from 'next/link'
import { FC } from 'react'

import { cn } from '@/utils/style'

type Props = {
  tag?: string
  className?: string
  href?: string
}

const Tag: FC<Props> = ({ tag, className, href }) => {
  return href ? (
    <Link
      href={href}
      className={cn([
        'rounded-full px-4 py-px max-sm:py-2 max-sm:px-6 border border-gray-300 text-sm bg-gray-200 text-center capitalize font-medium whitespace-nowrap',
        !!href && 'hover:bg-gray-100 hover:text-brand-blue-dark transition',
        className,
      ])}
    >
      {tag}
    </Link>
  ) : (
    <span
      className={cn([
        'rounded-full px-4 py-px max-sm:py-2 max-sm:px-6 border border-gray-300 text-sm bg-gray-200 text-center capitalize font-medium whitespace-nowrap',
        !!href && 'hover:bg-gray-100 hover:text-brand-blue-dark transition',
        className,
      ])}
    >
      {tag}
    </span>
  )
}

export default Tag

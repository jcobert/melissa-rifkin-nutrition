import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

type Props = {
  description?: string
  link?: { url: string; text: string }
  children?: ReactNode
  className?: string
  descriptionClassName?: string
  linkClassName?: string
}

const FieldDescription: FC<Props> = ({
  description,
  link,
  children,
  className,
  descriptionClassName,
  linkClassName,
}) => {
  return (
    children ?? (
      <div className={cn('inline-flex__ gap-1', className)}>
        {description ? (
          <span className={descriptionClassName}>{description}</span>
        ) : null}
        {link ? (
          <a
            className={cn('block', linkClassName)}
            href={link?.url}
            rel='nofollow noopener noreferrer'
            target='_blank'
          >
            {link?.text}
          </a>
        ) : null}
      </div>
    )
  )
}

export default FieldDescription

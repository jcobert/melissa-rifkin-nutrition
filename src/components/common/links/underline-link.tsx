import React, { forwardRef } from 'react'

import { cn } from '@/utils/style'

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/common/links/unstyled-link'

const UnderlineLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'animated-underline custom-link inline-flex items-center font-medium',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2',
          'border-dark border-b border-dotted hover:border-black/0',
          className,
        )}
      >
        {children}
      </UnstyledLink>
    )
  },
)

export default UnderlineLink

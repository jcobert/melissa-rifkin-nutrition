import Link, { LinkProps } from 'next/link'
import React, { ComponentPropsWithRef, FC, ReactNode, forwardRef } from 'react'

import { cn } from '@/utils/style'

export type UnstyledLinkProps = {
  href: string
  children: ReactNode
  openNewTab?: boolean
  className?: string
  nextLinkProps?: Omit<LinkProps, 'href'>
} & ComponentPropsWithRef<'a'>

const UnstyledLink: FC<UnstyledLinkProps> = forwardRef<
  HTMLAnchorElement,
  UnstyledLinkProps
>(({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
  const isNewTab =
    openNewTab !== undefined
      ? openNewTab
      : href && !href.startsWith('/') && !href.startsWith('#')

  if (!isNewTab) {
    return (
      <Link
        href={href}
        ref={ref}
        className={className}
        {...rest}
        {...nextLinkProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      ref={ref}
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      {...rest}
      className={cn('cursor-newtab', className)}
    >
      {children}
    </a>
  )
})

export default UnstyledLink

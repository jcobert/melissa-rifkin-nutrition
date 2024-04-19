import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import React, { FC } from 'react'

export const logos = {
  full: { src: '/images/logo-expanded.png', width: 150, height: 37 },
  small: { src: '/images/logo.png', width: 50, height: 50 },
}

type Props = {
  variant?: 'full' | 'small'
  asLink?: boolean
  imageProps?: Partial<ImageProps>
  linkProps?: Partial<LinkProps>
}

const Logo: FC<Props> = ({
  asLink = false,
  variant = 'full',
  imageProps,
  linkProps,
}) => {
  const { src, width, height } = logos[variant] || {}

  const Img = (
    <Image
      src={src}
      alt='Melissa Rifkin Nutrition logo'
      width={width}
      height={height}
      {...imageProps}
    />
  )

  return asLink ? (
    <Link href='/' {...linkProps}>
      {Img}
    </Link>
  ) : (
    Img
  )
}

export default Logo

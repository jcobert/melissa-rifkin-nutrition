import Image, { ImageProps } from 'next/image'
import React, { FC, useState } from 'react'

import { cn } from '@/utils/style'

type NextImageProps = {
  useSkeleton?: boolean
  classNames?: {
    image?: string
    blur?: string
  }
  alt: string
} & (
  | { width: string | number; height: string | number }
  | { layout: 'fill'; width?: string | number; height?: string | number }
) &
  ImageProps

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
const NextImage: FC<NextImageProps> = ({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  classNames,
  ...rest
}: NextImageProps) => {
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete')
  const widthIsSet = className?.includes('w-') ?? false

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={cn(
          classNames?.image,
          status === 'loading' && cn('animate-pulse', classNames?.blur),
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setStatus('complete')}
        {...rest}
      />
    </figure>
  )
}

export default NextImage

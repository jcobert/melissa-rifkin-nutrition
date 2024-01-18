import React, { ComponentPropsWithoutRef, FC } from 'react'

import { cn } from '@/utils/style'

type SkeletonProps = ComponentPropsWithoutRef<'div'>

const Skeleton: FC<SkeletonProps> = ({ className, ...rest }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-shimmer bg-[#f6f7f8]', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  )
}

export default Skeleton

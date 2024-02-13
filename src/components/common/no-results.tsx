import React, { FC } from 'react'

type Props = {
  title?: string
  subtitle?: string
  description?: string
}

const NoResults: FC<Props> = ({
  title = 'Sorry!',
  subtitle = '🍽',
  description = "We couldn't find any results.",
}) => {
  return (
    <div className='flex flex-col w-full gap-2 text-center prose text-balance'>
      <div className='flex flex-col items-center gap-1 font-medium'>
        <span>{title}</span>
        <span className='text-2xl'>{subtitle}</span>
      </div>
      <div>
        <span className='text-pretty'>{description}</span>
      </div>
    </div>
  )
}

export default NoResults

import clsx from 'clsx'
import React, { FC } from 'react'

export type HeadingProps = {
  text?: string
  className?: string
}

const Heading: FC<HeadingProps> = ({ text = '', className = '' }) => {
  return (
    <h1
      className={clsx(
        'text-3xl sm:text-4xl font-bold text-center md:text-left py-2 text-brand font-prata',
        {
          [className]: !!className,
        },
      )}
    >
      {text}
    </h1>
  )
}

export default Heading

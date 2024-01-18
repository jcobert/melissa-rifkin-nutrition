import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'

import Heading from '@/components/common/layout/heading'

export type PageLayoutProps = {
  heading?: string | JSX.Element
  children: ReactNode
  className?: string
}

const PageLayout: FC<PageLayoutProps> = ({
  heading,
  children,
  className = '',
}) => {
  const pageHeading =
    typeof heading === 'string' ? (
      <Heading text={heading} className='mt-8' />
    ) : (
      heading
    )

  return (
    <main>
      <div className='items-center justify-start w-screen min-h-screen pb-safe'>
        <div className='flex flex-col layout gap-2 mb-8'>
          {pageHeading}
          <div
            className={clsx({
              [className]: !!className,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PageLayout

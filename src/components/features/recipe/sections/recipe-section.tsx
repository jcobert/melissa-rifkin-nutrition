import { FC, ReactNode } from 'react'
import { BlockWithHeading } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import PortableBlockContent from '@/components/common/portable/portable-block-content'

type Props = {
  content: BlockWithHeading | undefined
  children?: ReactNode
  className?: string
  // childrenClassName?: string
  hideDivider?: boolean
  // childrenProse?: boolean
}

const RecipeSection: FC<Props> = ({
  content,
  children,
  className,
  // childrenClassName,
  hideDivider = false,
  // childrenProse = false,
}) => {
  if (!content && !children) return null

  const { body, heading } = content || {}

  return (
    <>
      <section
        className={cn(
          'flex__ flex-col items-center w-full prose max-w-none lg:px-16',
          className,
        )}
      >
        {heading ? (
          <h2 className='text-pretty mb-0 max-w-prose'>{heading}</h2>
        ) : null}

        {body ? (
          <div className='max-w-prose mx-auto'>
            <PortableBlockContent value={body} />
          </div>
        ) : null}

        {children ? (
          <div
            className={cn('mb-5', [
              // !childrenProse && 'not-prose',
              !!heading && 'mt-5',
            ])}
          >
            {children}
          </div>
        ) : null}
      </section>

      {!hideDivider ? (
        <span
          aria-hidden
          className='h-px max-md:w-1/3 print:w-full w-full border-b mx-auto -mt-6 mb-2 lg:px-16'
        />
      ) : null}
    </>
  )
}

export default RecipeSection

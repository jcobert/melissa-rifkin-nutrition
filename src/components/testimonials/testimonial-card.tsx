import React, { FC } from 'react'
import { Testimonial } from 'sanity-studio/types'

import { cn } from '@/utils/style'

type Props = {
  testimonial: Testimonial
  className?: string
  hideCredit?: boolean
}

const TestimonialCard: FC<Props> = ({
  testimonial,
  className,
  hideCredit = false,
}) => {
  const isPartner = testimonial?.relationship === 'partner'

  return (
    <div
      className={cn([
        'rounded border p-4 flex flex-col gap-5 justify-between bg-brand-gray-light/50 max-lg:h-full text-almost-black max-w-[90vw]',
        !!className && className,
      ])}
    >
      <p>{`"${testimonial?.testimonial}"`}</p>
      {!hideCredit ? (
        <div className='flex flex-col font-semibold text-brand-gray-dark text-pretty'>
          <span className=''>{`- ${testimonial?.name}${testimonial?.location ? `, ${testimonial?.location}` : ''}`}</span>
          {isPartner && (
            <div className='inline-flex gap-1 flex-wrap'>
              {testimonial?.position ? (
                <span className=''>{`${testimonial?.position}, `}</span>
              ) : null}
              <span className='text-brand-blue-dark'>{`${testimonial?.company}`}</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default TestimonialCard

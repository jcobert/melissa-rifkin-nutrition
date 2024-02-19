import React, { FC } from 'react'
import { Testimonial } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import Carousel from '@/components/carousel'
import TestimonialCard from '@/components/testimonials/testimonial-card'

type Props = {
  testimonials: Testimonial[]
  className?: string
  cardClassName?: string
  carouselClassName?: string
  carouselCardClassName?: string
}

const Testimonials: FC<Props> = ({
  testimonials,
  className = '',
  cardClassName = '',
  carouselClassName = '',
  carouselCardClassName = '',
}) => {
  return (
    <>
      {/* Carousel up until large breakpoint. */}
      <div className={cn('lg:hidden md:w-3/4', [carouselClassName])}>
        <Carousel>
          {testimonials?.map((t, i) => (
            <TestimonialCard
              key={i}
              testimonial={t}
              className={carouselCardClassName}
            />
          ))}
        </Carousel>
      </div>

      {/* Card grid at large breakpoint. */}
      <div className={cn('grid grid-cols-3 gap-6 max-lg:hidden', [className])}>
        {testimonials?.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} className={cardClassName} />
        ))}
      </div>
    </>
  )
}

export default Testimonials

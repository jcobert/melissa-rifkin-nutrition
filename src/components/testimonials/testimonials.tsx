import React, { FC } from 'react'
import { Testimonial } from 'sanity-studio/types'

import Carousel from '@/components/carousel'
import TestimonialCard from '@/components/testimonials/testimonial-card'

type Props = {
  testimonials: Testimonial[]
}

const Testimonials: FC<Props> = ({ testimonials }) => {
  return (
    <>
      {/* Carousel up until large breakpoint. */}
      <div className='lg:hidden md:w-3/4'>
        <Carousel>
          {testimonials?.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </Carousel>
      </div>

      {/* Card grid at large breakpoint. */}
      <div className='grid grid-cols-3 gap-6 max-lg:hidden'>
        {testimonials?.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </>
  )
}

export default Testimonials

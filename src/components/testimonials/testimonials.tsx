import React, { FC } from 'react'

import Carousel from '@/components/carousel'
import TestimonialCard, {
  Testimonial,
} from '@/components/testimonials/testimonial-card'

type Props = {
  data: Testimonial[]
}

const Testimonials: FC<Props> = ({ data }) => {
  return (
    <>
      {/* Carousel up until large breakpoint. */}
      <div className='lg:hidden md:w-3/4'>
        <Carousel>
          {data?.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
        </Carousel>
      </div>

      {/* Card grid at large breakpoint. */}
      <div className='grid grid-cols-3 gap-6 max-lg:hidden'>
        {data?.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
      </div>
    </>
  )
}

export default Testimonials

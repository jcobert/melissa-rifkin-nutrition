import React, { FC } from 'react'

export type Testimonial = {
  name?: string
  location?: string
  testimonial?: string
}

type Props = {
  testimonial: Testimonial
}

const TestimonialCard: FC<Props> = ({ testimonial }) => {
  return (
    <div className='rounded border p-4 flex flex-col gap-5 justify-between bg-brand-gray-light max-lg:h-full text-almost-black'>
      <p>{`"${testimonial?.testimonial}"`}</p>
      <p className='font-medium'>{`- ${testimonial?.name}${testimonial?.location ? `, ${testimonial?.location}` : ''}`}</p>
    </div>
  )
}

export default TestimonialCard

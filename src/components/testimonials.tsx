'use client'

import React, { FC } from 'react'

import Carousel from '@/components/carousel'

type Testimonial = {
  body: string
  author?: { name?: string; location?: string }
}

type Props = {
  data: Testimonial[]
}

const TestimonialCard: FC<{ t: Testimonial }> = ({ t }) => (
  <div className='rounded border p-4 flex flex-col gap-5 justify-between bg-brand-gray-light h-full text-almost-black'>
    <p>{`"${t?.body}"`}</p>
    <p className='font-medium'>{`- ${t?.author?.name}${t?.author?.location ? `, ${t?.author?.location}` : ''}`}</p>
  </div>
)

const Testimonials: FC<Props> = ({ data }) => {
  return (
    <>
      {/* Carousel up until large breakpoint. */}
      <div className='lg:hidden md:w-3/4'>
        <Carousel>
          {data?.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </Carousel>
      </div>

      {/* Card grid at large breakpoint. */}
      <div className='grid grid-cols-3 gap-6 max-lg:hidden'>
        {data?.map((t, i) => <TestimonialCard key={i} t={t} />)}
      </div>
    </>
  )
}

export default Testimonials

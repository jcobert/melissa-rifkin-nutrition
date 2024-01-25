'use client'

import React, { FC } from 'react'

import Carousel from '@/components/carousel'

type Props = {
  data: { body: string; author?: { name?: string; location?: string } }[]
}

const Testimonials: FC<Props> = ({ data }) => {
  return (
    <div className='md:w-3/4 xl:w-2/3 2xl:w-1/2'>
      <Carousel>
        {data?.map((t, i) => (
          <div
            key={i}
            className='rounded border p-4 flex flex-col gap-5 justify-between bg-brand-gray-light h-full'
          >
            <p>{`"${t?.body}"`}</p>
            <p>{`- ${t?.author?.name}${t?.author?.location ? `, ${t?.author?.location}` : ''}`}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Testimonials

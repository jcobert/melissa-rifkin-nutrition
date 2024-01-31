'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { TESTIMONIALS_QUERY } from 'cms/lib/queries'
import { SanityDocument } from 'next-sanity'
import React, { FC } from 'react'

import { Testimonial } from '@/components/testimonials/testimonial-card'
import Testimonials from '@/components/testimonials/testimonials'

type Props = {
  data: QueryResponseInitial<SanityDocument<Testimonial>[]>
}

const TestimonialsPreview: FC<Props> = ({ data }) => {
  const { data: testimonials } = useQuery<SanityDocument<Testimonial>[] | null>(
    TESTIMONIALS_QUERY,
    {},
    { initial: data },
  )

  return data ? (
    <Testimonials data={testimonials || []} />
  ) : (
    <div className='bg-red-100'>No testimonials found</div>
  )
}

export default TestimonialsPreview

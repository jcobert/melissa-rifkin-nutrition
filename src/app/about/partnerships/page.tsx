import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { FC } from 'react'
import { FaEnvelope } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import {
  GENERAL_QUERY,
  TESTIMONIALS_BY_RELATIONSHIP_QUERY,
} from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { General, Testimonial } from 'sanity-studio/types'

import BrandBanner from '@/components/brand-banner'
import PageLayout from '@/components/common/layout/page-layout'
import Testimonials from '@/components/testimonials/testimonials'
import TestimonialsPreview from '@/components/testimonials/testimonials-preview'

export const metadata: Metadata = {
  title: 'Partnerships',
}

const PartnershipsPage: FC = async () => {
  const general = await loadQuery<SanityDocument<General>>(
    GENERAL_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const testimonials = await loadQuery<SanityDocument<Testimonial>[]>(
    TESTIMONIALS_BY_RELATIONSHIP_QUERY,
    { relationship: 'partner' },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const email = general?.data?.email

  return (
    <PageLayout
      heading='Explore a Partnership With Melissa'
      // className='flex flex-col items-center gap-12 md:gap-24 mb-8'
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      <div className='flex flex-col items-center gap-12 md:gap-24 mt-8'>
        <section className='flex flex-col gap-4'>
          <BrandBanner
            partners
            className='justify-around max-md:gap-1'
            imageClassName='h-full object-contain object-center size-24 md:size-32'
          />
          <div className='prose prose-h2:text-xl prose-h2:font-medium prose-h2:mb-2'>
            <h2 className='text-brand-gray-dark'>Let's Work Together</h2>
            <p className=''>
              I have worked closely with 400+ publications, food brands, and
              other media outlets including Kellogg’s, Pfizer and Whole Foods,
              and the Wall Street Journal. Count on me to share my commitment to
              health and fitness through evidence-based information on the most
              innovative health foods and trends.
            </p>
          </div>
          <Link
            href={email ? `mailto:${email}` : '/contact'}
            className='btn w-fit mx-auto mt-2'
          >
            <FaEnvelope aria-hidden />
            <span>Connect</span>
          </Link>
        </section>

        <section className='flex flex-col gap-4'>
          <div className='prose prose-h2:text-xl prose-h2:font-medium prose-h2:mb-2'>
            <h2 className='text-brand-gray-dark'>Melissa in the News</h2>
            <p className=''>
              Melissa’s nutrition expertise and recipes have been featured in
              numerous articles, interviews, magazines, and guest blog posts.
            </p>
          </div>
          <BrandBanner
            className='justify-around sm:grid-rows-2'
            imageClassName='object-contain object-center md:size-24'
          />
          <Link href='#' className='btn-outline w-fit mx-auto mt-2'>
            <span>More Press</span>
            <IoIosArrowForward aria-hidden />
          </Link>
        </section>

        <section className='flex flex-col items-center gap-2'>
          <h2 className='text-brand-gray-dark text-center text-xl font-medium'>
            What Our Partners Are Saying
          </h2>
          {draftMode()?.isEnabled ? (
            <TestimonialsPreview initial={testimonials} />
          ) : (
            <Testimonials
              testimonials={testimonials?.data}
              className='grid-cols-1__ max-w-prose'
              cardClassName='bg-almost-white prose prose-h2:text-xl prose-h2:font-medium prose-h2:mb-2'
              carouselCardClassName='bg-almost-white'
              carouselClassName='w-[90vw]'
            />
          )}
        </section>
      </div>
    </PageLayout>
  )
}

export default PartnershipsPage

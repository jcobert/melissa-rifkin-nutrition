import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { FaEnvelope } from 'react-icons/fa6'
import {
  GENERAL_QUERY,
  TESTIMONIALS_BY_RELATIONSHIP_QUERY,
} from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { General, Testimonial } from 'sanity-studio/types'

import BrandBanner from '@/components/brand-banner'
import Accordion from '@/components/common/layout/accordion'
import PageLayout from '@/components/common/layout/page-layout'
import TestimonialCard from '@/components/testimonials/testimonial-card'
import TestimonialsPreview from '@/components/testimonials/testimonials-preview'

import {
  buildOgImage,
  generatePageTitle,
  openGraphMeta,
  twitterMeta,
} from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'

const pageTitle = 'Partnerships'
const seoDescription = `Explore a partnership with ${siteConfig?.title}.`

export const metadata: Metadata = {
  title: pageTitle,
  description: seoDescription,
  openGraph: openGraphMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [buildOgImage({ title: pageTitle })],
  }),
  twitter: twitterMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [buildOgImage({ title: pageTitle })],
  }),
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
      <div className='flex flex-col items-center gap-20 md:gap-24 mt-8'>
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
          <a
            href={email ? `mailto:${email}` : '/contact'}
            className='btn w-fit mx-auto mt-2'
          >
            <FaEnvelope aria-hidden />
            <span>Connect</span>
          </a>
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
          {/* <Link href='#' className='btn-outline w-fit mx-auto mt-2'>
            <span>More Press</span>
            <IoIosArrowForward aria-hidden />
          </Link> */}
        </section>

        <section className='flex flex-col items-center gap-4'>
          <h2 className='text-brand-gray-dark w-full text-center__ text-xl font-medium'>
            What Our Partners Are Saying
          </h2>
          {draftMode()?.isEnabled ? (
            <TestimonialsPreview initial={testimonials} />
          ) : (
            <Accordion
              className='mb-8'
              itemClassName='bg-almost-white data-[state=open]:bg-brand-gray-medium/5 rounded-none first:rounded-t-md last:rounded-b-md'
              defaultOpen={[1]}
              items={testimonials?.data?.map((testimonial) => ({
                header: (
                  <div className='flex flex-col text-left font-medium text-brand-gray-dark text-pretty'>
                    <span className='font-semibold__'>{`${testimonial?.name}${testimonial?.location ? `, ${testimonial?.location}` : ''}`}</span>
                    <div className='inline-flex gap-1 flex-wrap'>
                      {testimonial?.position ? (
                        <span className=''>{`${testimonial?.position}, `}</span>
                      ) : null}
                      <span className='font-semibold text-brand-blue-dark'>{`${testimonial?.company}`}</span>
                    </div>
                  </div>
                ),
                content: (
                  <TestimonialCard
                    key={testimonial?._id}
                    testimonial={testimonial}
                    hideCredit
                    className='border-none p-2 pb-6 max-w-prose bg-transparent'
                  />
                ),
              }))}
            />
          )}
        </section>
      </div>
    </PageLayout>
  )
}

export default PartnershipsPage

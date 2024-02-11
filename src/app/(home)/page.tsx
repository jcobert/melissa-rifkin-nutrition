import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TESTIMONIALS_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { Testimonial } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import BrandBanner from '@/components/brand-banner'
import CalendlyPopup from '@/components/calendly-popup'
import PageLayout from '@/components/common/layout/page-layout'
import Instagram from '@/components/instagram'
import Testimonials from '@/components/testimonials/testimonials'
import TestimonialsPreview from '@/components/testimonials/testimonials-preview'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Home'),
}

/** @todo replace with CMS data. */
const blogPostsData = [
  {
    id: 1,
    title: 'A Registered Dietitian Shares Her Top Health Products As a Mom',
    author: 'Melissa Rifkin',
  },
  {
    id: 2,
    title:
      '5 Nutrients Missing from the Standard American Diet According to A Dietician',
    author: 'Melissa Rifkin',
  },
  {
    id: 3,
    title: '5 Steps for Building the Perfect Smoothie According to a Dietician',
    author: 'Kelsey Hampton',
  },
  {
    id: 4,
    title: '7 Easy Ways to Help Reduce Stress',
    author: 'Melissa Rifkin',
  },
]

const HomePage = async () => {
  const testimonials = await loadQuery<SanityDocument<Testimonial>[]>(
    TESTIMONIALS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  return (
    <PageLayout
      defaultLayout={false}
      className='flex flex-col gap-16 lg:gap-24'
    >
      {/* Hero */}
      <section className='w-full h-[30rem] sm:h-[36rem] bg-bottom bg-cover bg-no-repeat sm:bg-fixed before:absolute before:block before:top-42 sm:before:top-16 before:left-0 before:w-full before:h-[30rem] sm:before:h-[36rem] before:bg-[#00000089] bg-[url("/images/cutting-board.jpeg")]'>
        <div className='layout py-8 h-full relative flex flex-col justify-center md:justify-end md:bottom-16 gap-6'>
          <h1 className='text-5xl md:w-2/3 lg:w-1/2 text-white font-prata text-pretty leading-normal'>
            Your Healthy Life Starts Here.
          </h1>
          <p className='text-almost-white text-xl text-balance'>
            Get started with meal plans and resources that can transform your
            life.
          </p>
          {/* Schedule consultation */}
          <CalendlyPopup className='py-4 text-lg' />
        </div>
      </section>

      {/* Meal Plans */}
      <section className='sm:layout bg-brand-gray-light max-sm:py-4'>
        <div className='flex gap-x-8'>
          <Image
            src='/images/hero/4.jpg'
            // src='/images/dinner-plates.png'
            alt='Dinner plates with food'
            width={500}
            height={500}
            priority
            className='mx-auto h-72 md:h-96 lg:h-[28rem] object-center object-cover max-sm:hidden'
          />
          <div className='p-4 flex flex-col gap-4 items-center w-full sm:items-start justify-center'>
            <h2 className='text-2xl max-sm:self-start font-bold font-prata text-brand text-pretty'>
              Meal Plans Just For You
            </h2>
            <Image
              src='/images/hero/4.jpg'
              // src='/images/dinner-plates.png'
              alt='Dinner plates with food'
              width={300}
              height={300}
              priority
              className='mx-auto h-52 w-full object-center object-cover sm:hidden'
            />
            <p className='text-balance lg:w-2/3'>
              We create plans to match your goals, food preferences and energy
              needs individually.
            </p>
            <Link href='/resources/meal-plans' className='w-fit btn'>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className='sm:layout bg-brand-green max-sm:py-4'>
        <div className='flex gap-x-8'>
          <div className='p-4 flex flex-col gap-4 items-center w-full sm:items-start justify-center md:ml-8 lg:ml-16 xl:ml-24 2xl:ml-28'>
            <h2 className='text-2xl max-sm:self-start font-bold font-prata text-brand text-pretty'>
              Healthy and Delicious Recipes
            </h2>
            <Image
              src='/images/hero/5.jpg'
              // src='/images/meal-plan.jpeg'
              alt='Tray with fruits'
              width={500}
              height={500}
              priority
              className='mx-auto h-52 w-full object-center object-cover sm:hidden'
            />
            <p className='text-balance'>
              If you enjoy quick meals made with healthy, fresh ingredients,
              these recipes are for you.
            </p>
            <Link href='/recipes' className='w-fit btn'>
              Get Cooking
            </Link>
          </div>
          <Image
            src='/images/hero/5.jpg'
            // src='/images/meal-plan.jpeg'
            alt='Tray with fruits'
            width={500}
            height={500}
            priority
            className='mx-auto h-72 md:h-96 lg:h-[28rem] object-center object-cover max-sm:hidden'
          />
        </div>
      </section>

      {/* Brand Banner */}
      <div className='layout flex flex-col gap-4'>
        {/* <h2 className='text-2xl font-bold font-prata text-brand-gray-dark text-pretty'>
          Featured By...
        </h2> */}
        <BrandBanner />
      </div>

      {/* Testimonials */}
      <section className='sm:layout max-sm:px-4 flex flex-col items-center gap-6'>
        <h2 className='text-2xl font-bold font-prata text-brand-gray-dark text-pretty text-center__'>
          Hear What Our Clients Are Saying
        </h2>
        {draftMode()?.isEnabled ? (
          <TestimonialsPreview initial={testimonials} />
        ) : (
          <Testimonials testimonials={testimonials?.data} />
        )}
      </section>

      {/* Recent Blog Posts */}
      <section className='sm:layout bg-brand-light max-sm:py-4 py-6'>
        <div className='p-4 flex flex-col gap-6 items-center w-full justify-center'>
          <h2 className='text-2xl font-bold font-prata text-brand text-pretty'>
            Recent Posts
          </h2>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {blogPostsData?.map((post, i) => (
              <div
                key={post?.id}
                className={cn(
                  'flex flex-col items-center gap-4 bg-almost-white p-4 py-6 border rounded',
                  [i >= 2 && 'max-md:hidden', i >= 3 && 'max-lg:hidden'],
                )}
              >
                <div className='h-32 w-3/4 bg-brand-gray-light' />
                <p className='flex-auto text-balance text-center font-medium'>
                  {post?.title}
                </p>
                <p className=''>By {post?.author}</p>
              </div>
            ))}
          </div>
          <Link href='/blog' className='w-fit btn'>
            See All Posts
          </Link>
        </div>
      </section>

      {/* Social Media */}
      <section className='sm:layout bg-brand-gray-light max-sm:py-4'>
        <div className='flex gap-x-8'>
          <Image
            src='/images/IMG_9738-scaled.jpeg'
            alt='Dinner plates with food'
            width={500}
            height={500}
            priority
            className='mx-auto h-[18rem] md:h-[29rem] object-top-left object-cover max-sm:hidden max-lg:self-center'
          />
          <div className='p-4 flex flex-col gap-4 items-center w-full sm:items-start justify-center'>
            <h2 className='text-2xl max-sm:self-start__ font-bold font-prata text-brand-blue text-pretty'>
              Follow Along!
            </h2>
            <Image
              src='/images/IMG_9738-scaled.jpeg'
              alt='Dinner plates with food'
              width={300}
              height={300}
              priority
              className='mx-auto h-72 w-full object-left-top object-cover sm:hidden'
            />
            <div className='max-w-xs max-sm:mt-4'>
              <Instagram />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default HomePage

import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

import Button from '@/components/common/buttons/Button'
import PageLayout from '@/components/common/layout/page-layout'
import Testimonials from '@/components/testimonials'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Home'),
}

/** @todo replace with CMS data. */
const testimonialData = [
  {
    body: 'I had struggled with weight and body image my entire life and was worried that would never change. It’s hard to put into words what an amazing experience I’ve had with Melissa over the past two years.',
    author: { name: 'Tara', location: 'Chicago' },
  },
  {
    body: 'I honestly can’t thank you enough for how you’ve helped me. You’ve helped me more on the inside, and to me that’s what matters most. My entire mind set regarding food has changed. I now eat because I want to fuel my body and be a strong woman.',
    author: { name: 'Jeanette' },
  },
  {
    body: 'Eight weeks ago, I started my first meal plan, and I haven’t looked back since. The plans are easy to follow, the meals do not need a vast list of complicated ingredients. She has factored in your cheat meal during the week, which is amazing because you don’t have the guilt of ‘cheating’ the next day. You just carry on.',
    author: { name: 'Martha', location: 'Nigeria' },
  },
]

const HomePage = async () => {
  return (
    <PageLayout
      defaultLayout={false}
      className='flex flex-col gap-16 md:gap-12'
    >
      {/* Hero */}
      <section
        className='w-full h-[30rem] sm:h-[36rem] bg-center bg-cover bg-no-repeat bg-fixed before:absolute before:block before:top-42 sm:before:top-16 before:left-0 before:w-full before:h-[30rem] sm:before:h-[36rem] before:bg-[#0000004e]'
        style={{ backgroundImage: "url('/images/cutting-board.jpeg')" }}
      >
        <div className='layout py-8 h-full relative flex flex-col justify-center md:justify-end md:bottom-16 gap-6'>
          <h1 className='text-5xl md:w-2/3 lg:w-1/2 text-white font-prata text-pretty leading-normal'>
            Your Healthy Life Starts Here.
          </h1>
          <p className='text-almost-white text-xl text-balance'>
            Get started with meal plans and resources that can transform your
            life.
          </p>
          <Button className='w-fit !py-4 text-lg'>
            Schedule a Consultation
          </Button>
        </div>
      </section>

      {/* Meal Plans */}
      <section className='sm:layout bg-brand-gray-light max-sm:py-4'>
        <div className='flex gap-x-8'>
          <Image
            src='/images/dinner-plates.png'
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
              src='/images/dinner-plates.png'
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
            <Button className='w-fit'>Learn More</Button>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className='sm:layout bg-brand-accent max-sm:py-4'>
        <div className='flex gap-x-8'>
          <div className='p-4 flex flex-col gap-4 items-center w-full sm:items-start justify-center md:ml-8 lg:ml-16 xl:ml-24 2xl:ml-28'>
            <h2 className='text-2xl max-sm:self-start font-bold font-prata text-brand text-pretty'>
              Healthy and Delicious Recipes
            </h2>
            <Image
              src='/images/meal-plan.jpeg'
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
            <Button className='w-fit'>Get Cooking</Button>
          </div>
          <Image
            src='/images/meal-plan.jpeg'
            alt='Tray with fruits'
            width={500}
            height={500}
            priority
            className='mx-auto h-72 md:h-96 lg:h-[28rem] object-center object-cover max-sm:hidden'
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className='sm:layout max-sm:px-4 flex flex-col items-center gap-6'>
        <h2 className='text-2xl font-bold font-prata text-brand-gray-dark text-pretty'>
          Hear What Our Clients Are Saying
        </h2>
        <Testimonials data={testimonialData} />
      </section>
    </PageLayout>
  )
}

export default HomePage

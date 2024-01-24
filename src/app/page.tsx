import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

import Button from '@/components/common/buttons/Button'
import PageLayout from '@/components/common/layout/page-layout'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Home'),
}

const HomePage = async () => {
  return (
    <PageLayout defaultLayout={false} className='flex flex-col gap-12'>
      <Image
        src='/images/logo-expanded.png'
        alt='Melissa Rifkin Nutrition logo'
        width={300}
        height={92}
        priority
        className='mx-auto sm:hidden mt-6 -mb-4 h-20 w-auto'
      />
      {/* Hero */}
      <section
        className='w-full h-[30rem] sm:h-[36rem] bg-center bg-cover bg-no-repeat bg-fixed before:absolute before:block before:top-42 sm:before:top-16 before:left-0 before:w-full before:h-[30rem] sm:before:h-[36rem] before:bg-[#0000004e]'
        style={{ backgroundImage: "url('/images/cutting-board.jpeg')" }}
      >
        <div className='layout py-8 h-full relative flex flex-col justify-center md:justify-end md:bottom-16 gap-6'>
          <h1 className='text-5xl md:w-2/3 lg:w-1/2 text-white font-prata text-pretty leading-normal'>
            Your Healthy Life Starts Here.
          </h1>
          <p className='text-almost-white text-xl'>
            Transform your life one meal at a time.
          </p>
          <Button className='w-fit'>Get Started</Button>
        </div>
      </section>

      {/* Meal Plans */}
      <section className='sm:layout bg-brand-gray-light'>
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
            <h2 className='text-2xl font-prata text-brand text-pretty'>
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
      <section className='sm:layout bg-brand-accent'>
        <div className='flex gap-x-8'>
          <div className='p-4 flex flex-col gap-4 items-center w-full sm:items-start justify-center md:ml-8 lg:ml-16 xl:ml-24 2xl:ml-28'>
            <h2 className='text-2xl font-prata text-brand text-pretty'>
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
    </PageLayout>
  )
}

export default HomePage

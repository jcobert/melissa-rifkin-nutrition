import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { getProducts } from '@/lib/shopify'

import CalendlyPopup from '@/components/calendly-popup'
import PageLayout from '@/components/common/layout/page-layout'
import MealPlanCard from '@/components/features/meal-plan/meal-plan-card'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Meal Plans'),
}

const MealPlansPage = async () => {
  const mealPlans = await getProducts({ query: 'tags:meal plan' })

  const basicMealPlans = (mealPlans || [])?.filter((mp) =>
    mp?.title?.toLowerCase()?.includes('basic'),
  )

  const customizedMealPlans = (mealPlans || [])?.filter((mp) =>
    mp?.title?.toLowerCase()?.includes('customized'),
  )

  return (
    <PageLayout
      heading='A Meal Plan That Fits Your Needs'
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      <div className='prose self-start'>
        <p>
          We create plans to match your goals, food preferences and energy needs
          individually. Each plan consists of easy-to-make low-ingredient meals
          and snacks that are easy to follow and quick to finish, even if time
          is limited.
        </p>
      </div>

      {/* Customized Meal Plans */}
      <div className='flex flex-col gap-6 items-center max-w-3xl'>
        <div className='flex flex-col prose max-w-none'>
          <h4 className=''>Curating Your Customized Menu</h4>
          <p>
            After you’ve selected your meal plan, we will ask you to fill in a
            detailed questionnaire that helps us determine how your meal plan is
            created. Expect your meal plan delivered straight to you in the
            following 7 business days.
          </p>
        </div>
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2 w-full justify-items-center'>
          {customizedMealPlans?.map((item) => (
            <MealPlanCard key={item?.id} data={item} />
          ))}
        </div>
      </div>

      {/* Basic Meal Plans */}
      <div className='flex flex-col gap-6 items-center max-w-3xl'>
        <div className='flex flex-col prose max-w-none'>
          <h4 className=''>Basic Menu Options</h4>
          <p>
            Looking for a less customized menu option? The Basic Menu options
            below will be calculated to your energy needs based on your body,
            activity and goals; however, will not be tailored to your food
            preferences. This is a great option if you are looking for some
            structure to get started with and are open to a wide variety of
            foods.
          </p>
        </div>
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2 w-full justify-items-center'>
          {basicMealPlans?.map((item) => (
            <MealPlanCard key={item?.id} data={item} />
          ))}
        </div>
      </div>

      {/* Schedule CTA */}
      <div className='flex flex-col gap-3 items-center mt-6'>
        <p className='font-medium text-xl'>Not Sure What Plan Works For You?</p>
        <CalendlyPopup className='py-3' />
      </div>
    </PageLayout>
  )
}

export default MealPlansPage

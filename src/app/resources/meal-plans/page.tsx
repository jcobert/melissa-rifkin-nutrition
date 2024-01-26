import { Metadata } from 'next'
import React from 'react'

import { getProducts } from '@/lib/shopify'

import PageLayout from '@/components/common/layout/page-layout'

import MealPlanCard from '@/app/resources/meal-plans/meal-plan-card'
import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Meal Plans'),
}

const MealPlansPage = async () => {
  const mealPlans = await getProducts({ query: 'tags:meal plan' })

  return (
    <PageLayout heading='A Meal Plan That Fits Your Needs'>
      <div></div>
      <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {mealPlans?.map((item) => <MealPlanCard key={item?.id} data={item} />)}
      </div>
    </PageLayout>
  )
}

export default MealPlansPage

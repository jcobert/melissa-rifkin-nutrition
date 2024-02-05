import { Metadata } from 'next'
import React, { FC } from 'react'

import PageLayout from '@/components/common/layout/page-layout'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Recipes'),
}

const RecipesPage: FC = async () => {
  //
  return (
    <PageLayout heading='Recipes'>
      <div></div>
    </PageLayout>
  )
}

export default RecipesPage

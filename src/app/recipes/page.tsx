import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { RECIPES_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { Recipe } from 'sanity-studio/types'

import PageLayout from '@/components/common/layout/page-layout'

import Recipes from '@/app/recipes/recipes'
import RecipesPreview from '@/app/recipes/recipes-preview'
import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Recipes'),
}

/** Top-level Recipes route. */
const RecipesPage: FC = async () => {
  const initial = await loadQuery<SanityDocument<Recipe>[]>(
    RECIPES_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  return (
    <PageLayout
      heading='Recipes'
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      {draftMode()?.isEnabled ? (
        <RecipesPreview initial={initial} />
      ) : (
        <Recipes recipes={initial?.data} />
      )}
    </PageLayout>
  )
}

export default RecipesPage

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
import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

export const metadata: Metadata = generatePageMeta({
  title: 'Recipes',
  description:
    'A selection of quick, delicious, and nutritious recipes, for you to enjoy at home.',
  url: canonicalUrl('/recipes'),
})

export type RecipesPageProps = {
  searchParams?: {
    category?: string
    tag?: string
  }
}

/** Top-level Recipes route. */
const RecipesPage: FC<RecipesPageProps> = async ({ searchParams }) => {
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
      className='flex flex-col gap-12 items-center text-almost-black'
    >
      <div className='prose self-start'>
        <p>
          A selection of quick, delicious, and nutritious recipes, for you to
          enjoy at home.
        </p>
      </div>
      {draftMode()?.isEnabled ? (
        <RecipesPreview initial={initial} />
      ) : (
        <Recipes recipes={initial?.data} params={searchParams} />
      )}
    </PageLayout>
  )
}

export default RecipesPage

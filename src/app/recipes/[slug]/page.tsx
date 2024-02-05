import { Metadata } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { client } from 'sanity-studio/lib/client'
import { RECIPES_QUERY, RECIPE_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { type Recipe } from 'sanity-studio/types'

import RecipeFull from '@/app/recipes/[slug]/recipe'
import RecipePreview from '@/app/recipes/[slug]/recipe-preview'
import { pageTitle } from '@/configuration/site'

/** @todo set dynamic metadata for page title? */
export const metadata: Metadata = {
  title: pageTitle('Recipes'),
}

export async function generateStaticParams() {
  const recipes = await client.fetch<SanityDocument<Recipe>[]>(RECIPES_QUERY)
  return recipes?.map((recipe) => ({
    slug: recipe?.slug?.current,
  }))
}

/** Dynamic route for a single recipe. */
const RecipePage: FC<{ params: QueryParams }> = async ({ params }) => {
  const initial = await loadQuery<SanityDocument<Recipe>>(
    RECIPE_QUERY,
    params,
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  return draftMode().isEnabled ? (
    <RecipePreview initial={initial} params={params} />
  ) : (
    <RecipeFull recipe={initial?.data} />
  )
}

export default RecipePage

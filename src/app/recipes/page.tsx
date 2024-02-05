import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { RECIPES_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'

import PageLayout from '@/components/common/layout/page-layout'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Recipes'),
}

/** Top-level Recipes route. */
const RecipesPage: FC = async () => {
  const initial = await loadQuery<SanityDocument[]>(
    RECIPES_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  return (
    <PageLayout heading='Recipes'>
      <div></div>
    </PageLayout>
  )
}

export default RecipesPage

'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { QueryParams, SanityDocument } from 'next-sanity'
import React, { FC } from 'react'
import { RECIPE_QUERY } from 'sanity-studio/lib/queries'
import { type Recipe } from 'sanity-studio/types'

import RecipePage from '@/app/(main)/recipes/[slug]/recipe'

type Props = {
  initial: QueryResponseInitial<SanityDocument<Recipe>>
  params: QueryParams
}

const RecipePreview: FC<Props> = ({ initial, params }) => {
  const { data } = useQuery<SanityDocument<Recipe> | null>(
    RECIPE_QUERY,
    params,
    {
      initial,
    },
  )

  return data ? (
    <RecipePage recipe={data} />
  ) : (
    <div className='bg-red-100'>Recipe not found</div>
  )
}

export default RecipePreview

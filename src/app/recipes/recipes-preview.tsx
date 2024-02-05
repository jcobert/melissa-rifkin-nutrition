'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import React, { FC } from 'react'
import { RECIPES_QUERY } from 'sanity-studio/lib/queries'
import { Recipe } from 'sanity-studio/types'

import Recipes from '@/app/recipes/recipes'

type Props = {
  initial: QueryResponseInitial<SanityDocument<Recipe>[]>
}

const RecipesPreview: FC<Props> = ({ initial }) => {
  const { data } = useQuery<SanityDocument<Recipe>[] | null>(
    RECIPES_QUERY,
    {},
    { initial },
  )

  return data ? (
    <Recipes recipes={data || []} />
  ) : (
    <div className='bg-red-100'>No recipes found</div>
  )
}

export default RecipesPreview

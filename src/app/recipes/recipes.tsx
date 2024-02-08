import React, { FC } from 'react'
import { Recipe } from 'sanity-studio/types'

import RecipeCard from '@/components/features/recipe/recipe-card'

type Props = {
  recipes: Recipe[]
}

const Recipes: FC<Props> = ({ recipes }) => {
  //
  return (
    <div className='my-8 md:my-12'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe?._id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Recipes

'use client'

import React, { FC } from 'react'
import { Ingredient, IngredientMeasurement, Recipe } from 'sanity-studio/types'

import { findIngredientGroupMatch } from '@/utils/recipe'

import Tooltip, { TooltipProps } from '@/components/common/layout/tooltip'
import Measurement from '@/components/features/recipe/measurement'

type Props = {
  ingredientGroups?: Recipe['ingredientGroups']
  ingredient?: Ingredient
  measurement?: (IngredientMeasurement | undefined)[]
} & TooltipProps

const IngredientTooltip: FC<Props> = ({
  ingredient,
  ingredientGroups,
  measurement,
  ...props
}) => {
  const ingredients = ingredientGroups?.filter((ig) =>
    ig?.ingredients
      ?.map((ing) => ing?.ingredientName?.name)
      ?.includes(ingredient?.name),
  )

  return (
    <Tooltip
      trigger={
        <div className='flex flex-col'>
          <Measurement
            key={ingredient?._id}
            measurement={measurement?.[0]}
            hideMeasurement
            ingredientClassName='font-normal underline decoration-dotted underline-offset-2 decoration-brand-gray-dark hover:decoration-brand hover:text-brand transition print:no-underline'
          />
          <div className='ml-2 hidden print:inline-block border-l-3 border-brand-gray-light pl-2'>
            {ingredients?.map((ig) => {
              const match = findIngredientGroupMatch(ig, measurement)
              return (
                <div
                  key={ig?._key}
                  className='flex items-center gap-2 flex-wrap'
                >
                  <p>{`${ig?.title}:`}</p>
                  <div className='flex gap-1 flex-wrap'>
                    <Measurement
                      key={ingredient?._id}
                      measurement={match}
                      ingredientClassName='font-normal'
                      hideIngredient
                    />
                    <p className='text-sm text-brand-gray-medium mt-px'>
                      {`(${match?.note})`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      }
      content={
        <div className='bg-background border md:min-w-48 shadow rounded p-2 px-6 flex flex-col gap-1 max-md:flex-wrap'>
          <p className='font-semibold text-center border-b'>
            {ingredient?.name}
          </p>
          <div>
            {ingredients?.map((ig) => {
              const match = findIngredientGroupMatch(ig, measurement)
              return (
                <div
                  key={ig?._key}
                  className='flex items-center gap-2 flex-wrap'
                >
                  <p className='font-medium'>{`${ig?.title}:`}</p>
                  <div className='flex gap-1 flex-wrap'>
                    <Measurement
                      key={ingredient?._id}
                      measurement={match}
                      ingredientClassName='font-normal'
                      hideIngredient
                    />
                    <p className='text-sm text-brand-gray-medium mt-px'>
                      {`(${match?.note})`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      }
      arrowProps={{ className: 'fill-brand' }}
      {...props}
    />
  )
}

export default IngredientTooltip

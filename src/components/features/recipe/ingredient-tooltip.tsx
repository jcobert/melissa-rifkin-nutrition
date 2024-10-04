'use client'

import React, { FC } from 'react'
import { Ingredient, IngredientMeasurement, Recipe } from 'sanity-studio/types'

import { findIngredientGroupMatch } from '@/utils/recipe'

import Tooltip, { TooltipProps } from '@/components/common/layout/tooltip'
import Measurement from '@/components/features/recipe/measurement'

type Props = {
  ingredientGroups?: Recipe['ingredientGroups']
  ingredient?: IngredientMeasurement
  // measurement?: (IngredientMeasurement | undefined)[]
} & TooltipProps

const IngredientTooltip: FC<Props> = ({
  ingredient,
  ingredientGroups,
  // measurement,
  ...props
}) => {
  // const ingredients = ingredientGroups?.filter((ig) =>
  //   ig?.ingredients
  //     ?.map((ing) => ing?.ingredientName)
  //     ?.includes(ingredient?.name),
  // )

  return (
    <Tooltip
      contentProps={{ className: 'border border-brand-light rounded' }}
      trigger={
        <div className='flex flex-col'>
          <Measurement
            key={ingredient?._key}
            measurement={ingredient}
            // hideMeasurement
            className='group'
            measurementClassName='group-hover:text-brand transition'
            ingredientClassName='font-normal underline decoration-dotted underline-offset-2 decoration-brand-gray-dark group-hover:decoration-brand group-hover:text-brand transition print:no-underline'
          />
          <div className='ml-2 hidden print:inline-block border-l-3 border-brand-gray-light pl-2'>
            {/* <div className='flex items-center gap-2 flex-wrap'>
              <div className='flex gap-1 flex-wrap'>
                <Measurement
                  key={ingredient?._key}
                  measurement={ingredient}
                  ingredientClassName='font-normal'
                  hideIngredient
                />
                <p className='text-sm text-brand-gray-medium mt-px'>
                  {`(${ingredient?.note})`}
                </p>
              </div>
            </div> */}
            {/* {ingredients?.map((ig) => {
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
            })} */}
          </div>
        </div>
      }
      content={
        <div className='bg-background border border-brand-light md:min-w-48 shadow rounded p-2 px-6 flex flex-col gap-1 max-md:flex-wrap'>
          {/* <p className='font-semibold text-center border-b'>
            {ingredient?.ingredientName}
          </p> */}

          <p>{ingredient?.note}</p>

          {/* <div> */}
          {/* <div className='flex items-center gap-2 flex-wrap'>
              <div className='flex gap-1 flex-wrap'>
                <Measurement
                  key={ingredient?._key}
                  measurement={ingredient}
                  ingredientClassName='font-normal'
                  hideIngredient
                />
                <p className='text-sm__ text-brand-gray-medium mt-px'>
                  {ingredient?.note}
                </p>
              </div>
            </div> */}

          {/* {ingredients?.map((ig) => {
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
            })} */}
          {/* </div> */}
        </div>
      }
      arrowProps={{ className: 'fill-brand' }}
      {...props}
    />
  )
}

export default IngredientTooltip

'use client'

import { intersectionBy, pick } from 'lodash'
import React, { FC } from 'react'
import { Ingredient, IngredientMeasurement, Recipe } from 'sanity-studio/types'

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
  return (
    <Tooltip
      trigger={
        <Measurement
          key={ingredient?._id}
          measurement={measurement?.[0]}
          hideMeasurement
          ingredientClassName='font-normal underline decoration-dotted underline-offset-2 decoration-brand-gray-dark'
        />
      }
      content={
        <div className='bg-background border md:min-w-48 shadow rounded p-2 px-6 flex flex-col gap-1 max-md:flex-wrap'>
          <p className='font-semibold text-center border-b'>
            {ingredient?.name}
          </p>
          <div>
            {ingredientGroups
              ?.filter((ig) =>
                ig?.ingredients
                  ?.map((ing) => ing?.ingredientName?.name)
                  ?.includes(ingredient?.name),
              )
              ?.map((ig) => {
                const match = intersectionBy(
                  ig?.ingredients,
                  measurement,
                  (ing) =>
                    JSON.stringify(
                      pick(ing, [
                        'ingredientName',
                        'amount',
                        'unit',
                        'note',
                      ] as (keyof IngredientMeasurement)[]),
                    )?.toLowerCase(),
                )?.[0]

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

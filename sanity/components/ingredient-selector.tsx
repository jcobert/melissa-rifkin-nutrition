import { Checkbox } from '@sanity/ui'
import { groq } from 'next-sanity'
import React, { FC } from 'react'
import {
  ArrayOfPrimitivesInputProps,
  ReferenceInputProps,
  useClient,
  useDocumentType,
  useDocumentValues,
  useFormValue,
} from 'sanity'
import { apiVersion } from 'sanity-studio/env'
import { Ingredient, Recipe } from 'sanity-studio/types'

type Props = {
  //
}

export const IngredientSelector: FC<ArrayOfPrimitivesInputProps> = async (
  props,
) => {
  const ingredientGroups = useFormValue([
    'ingredientGroups',
  ]) as Recipe['ingredientGroups']

  const ingredientMeasurements = ingredientGroups?.flatMap((group) =>
    group?.ingredients?.map((ing) => ing),
  )
  const ingredients = ingredientMeasurements?.map(
    (im) => (im?.ingredientName as Ingredient & { _ref: string })?._ref,
  )

  return (
    <div className='flex flex-col gap-1'>
      {ingredients?.map((ing) => (
        <label key={ing} className='flex items-center gap-2'>
          <Checkbox {...props.elementProps} />
          <span>{ing}</span>
        </label>
      ))}
      {/* {props?.renderDefault(props)} */}
    </div>
  )
}
export const IngredientCheckbox: FC<ReferenceInputProps> = async (props) => {
  const ingredientGroups = useFormValue([
    'ingredientGroups',
  ]) as Recipe['ingredientGroups']

  const ingredientMeasurements = ingredientGroups?.flatMap((group) =>
    group?.ingredients?.map((ing) => ing),
  )
  const ingredients = ingredientMeasurements?.map(
    (im) => (im?.ingredientName as Ingredient & { _ref: string })?._ref,
  )

  return (
    <div className='flex flex-col gap-1'>
      {ingredients?.map((ing) => (
        <label key={ing} className='flex items-center gap-2'>
          <Checkbox {...props.elementProps} />
          <span>{ing}</span>
        </label>
      ))}
      {/* {props?.renderDefault(props)} */}
    </div>
  )
}

// export default IngredientSelector

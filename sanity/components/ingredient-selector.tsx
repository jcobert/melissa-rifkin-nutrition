import { Checkbox } from '@sanity/ui'
import { groq } from 'next-sanity'
import React, { ChangeEvent, FC, useCallback, useMemo } from 'react'
import {
  ArrayOfObjectsInputProps,
  ArrayOfPrimitivesInputProps,
  ReferenceInputProps,
  set,
  unset,
  useClient,
  useDocumentType,
  useDocumentValues,
  useFormValue,
} from 'sanity'
import { apiVersion } from 'sanity-studio/env'
import {
  Ingredient,
  IngredientMeasurement,
  Recipe,
  SanityKeyed,
} from 'sanity-studio/types'

export const IngredientSelector: FC<ArrayOfObjectsInputProps> = (props) => {
  const ingredientGroups =
    (useFormValue(['ingredientGroups']) as Recipe['ingredientGroups']) || []

  const ingredientMeasurements = (ingredientGroups?.flatMap((group) =>
    group?.ingredients?.map((ing) => ing),
  ) || []) as SanityKeyed<
    IngredientMeasurement & { _type: 'ingredientMeasurement' }
  >[]

  const ingredients =
    ingredientMeasurements?.map((ing) => ({
      value: ing,
      label:
        `${ing?.amount ?? ''}${ing?.unit ? ` ${ing?.unit}` : ''} ${ing?.ingredientName}`?.trim(),
    })) || []

  const { elementProps, onChange, value: arrayValue } = props

  const selectedKeys = useMemo(
    () => (arrayValue || [])?.map((item) => item?._key),
    [arrayValue],
  )

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = ingredientMeasurements?.find(
        (ing) => ing?._key === e.target?.value,
      ) as (typeof ingredientMeasurements)[number]

      let newArrayValue = arrayValue

      // Nothing slected yet. Add to array.
      if (!arrayValue?.length && !!val) {
        newArrayValue = [val]
      }
      // Deselecting. Remove from array.
      else if (selectedKeys?.includes(val?._key)) {
        newArrayValue = arrayValue?.filter((ing) => ing?._key !== val?._key)
      }
      // Selecting. Add to array
      else {
        newArrayValue = arrayValue?.concat(val)
      }

      onChange(set(newArrayValue))
    },
    [onChange, arrayValue, ingredientMeasurements],
  )

  return (
    <div className='flex flex-col gap-1'>
      {ingredients?.map((ing) => (
        <label key={ing?.value?._key} className='flex items-center gap-2'>
          <Checkbox
            {...elementProps}
            value={ing?.value?._key}
            checked={selectedKeys?.includes(ing?.value?._key)}
            onChange={handleChange}
          />
          <span>{ing?.label}</span>
        </label>
      ))}
      {/* {props?.renderDefault(props)} */}
    </div>
  )
}
// export const IngredientSelector: FC<ArrayOfPrimitivesInputProps> = async (
//   props,
// ) => {
//   const ingredientGroups = useFormValue([
//     'ingredientGroups',
//   ]) as Recipe['ingredientGroups']

//   const ingredientMeasurements = ingredientGroups?.flatMap((group) =>
//     group?.ingredients?.map((ing) => ing),
//   )
//   const ingredients = ingredientMeasurements?.map(
//     (im) => (im?.ingredientName as Ingredient & { _ref: string })?._ref,
//   )

//   return (
//     <div className='flex flex-col gap-1'>
//       {ingredients?.map((ing) => (
//         <label key={ing} className='flex items-center gap-2'>
//           <Checkbox {...props.elementProps} />
//           <span>{ing}</span>
//         </label>
//       ))}
//       {/* {props?.renderDefault(props)} */}
//     </div>
//   )
// }
// export const IngredientCheckbox: FC<ReferenceInputProps> = async (props) => {
//   const ingredientGroups = useFormValue([
//     'ingredientGroups',
//   ]) as Recipe['ingredientGroups']

//   const ingredientMeasurements = ingredientGroups?.flatMap((group) =>
//     group?.ingredients?.map((ing) => ing),
//   )
//   const ingredients = ingredientMeasurements?.map(
//     (im) => (im?.ingredientName as Ingredient & { _ref: string })?._ref,
//   )

//   return (
//     <div className='flex flex-col gap-1'>
//       {ingredients?.map((ing) => (
//         <label key={ing} className='flex items-center gap-2'>
//           <Checkbox {...props.elementProps} />
//           <span>{ing}</span>
//         </label>
//       ))}
//       {/* {props?.renderDefault(props)} */}
//     </div>
//   )
// }

// export default IngredientSelector

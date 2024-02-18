import React, { FC } from 'react'
import { IngredientMeasurement } from 'sanity-studio/types'

import { formatFraction, formatUnit } from '@/utils/string'
import { cn } from '@/utils/style'

type Props = {
  measurement?: IngredientMeasurement
  hideIngredient?: boolean
  hideMeasurement?: boolean
  measurementClassName?: string
  ingredientClassName?: string
}

const Measurement: FC<Props> = ({
  measurement,
  hideIngredient = false,
  hideMeasurement = false,
  measurementClassName = '',
  ingredientClassName = '',
}) => {
  //
  return (
    <div className='flex items-center gap-1 w-fit'>
      {!!measurement?.amount && !hideMeasurement ? (
        <div
          className={cn([
            'flex items-center gap-1 font-mono text-sm text-brand-blue-dark',
            measurementClassName,
          ])}
        >
          <p>{formatFraction(measurement?.amount)}</p>
          {!!measurement?.unit && <p>{formatUnit(measurement?.unit)}</p>}
        </div>
      ) : null}
      {!hideIngredient && (
        <p className={cn(['font-semibold', ingredientClassName])}>
          {measurement?.ingredientName?.name}
        </p>
      )}
    </div>
  )
}

export default Measurement

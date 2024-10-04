import React, { FC } from 'react'
import { IngredientMeasurement } from 'sanity-studio/types'

import { formatFraction, formatUnit } from '@/utils/string'
import { cn } from '@/utils/style'

type Props = {
  measurement?: IngredientMeasurement
  hideIngredient?: boolean
  hideMeasurement?: boolean
  className?: string
  measurementClassName?: string
  ingredientClassName?: string
}

const Measurement: FC<Props> = ({
  measurement,
  hideIngredient = false,
  hideMeasurement = false,
  className = '',
  measurementClassName = '',
  ingredientClassName = '',
}) => {
  //
  return (
    <div className={cn('flex items-center gap-1 w-fit', className)}>
      {!!measurement?.amount && !hideMeasurement ? (
        <div
          className={cn([
            'flex items-center gap-1 font-mono text-sm text-brand-blue-dark',
            measurementClassName,
          ])}
        >
          <p className='whitespace-nowrap'>
            {measurement?.amount}
            {/* {formatFraction(measurement?.amount)} */}
          </p>
          {!!measurement?.unit && <p>{measurement?.unit}</p>}
        </div>
      ) : null}
      {!hideIngredient && (
        <p
          className={cn([
            'font-semibold whitespace-nowrap',
            ingredientClassName,
          ])}
        >
          {measurement?.ingredientName}
        </p>
      )}
    </div>
  )
}

export default Measurement

import { FC } from 'react'
import { NutritionInformation, NutritionMetric } from 'sanity-studio/types'

import { formatNutritionMetric } from '@/utils/recipe'

type Props = {
  nutritionInfo: NutritionInformation
  metric: keyof typeof NutritionMetric
}

const NutritionInfo: FC<Props> = ({ nutritionInfo, metric }) => {
  const name = NutritionMetric?.[metric]
  const value = formatNutritionMetric(nutritionInfo, metric)

  if (!nutritionInfo || !metric || !name) return null

  return (
    <dl className='flex items-center not-prose gap-1'>
      <dt className='font-medium'>{`${name}: `}</dt>
      <dd>{value}</dd>
    </dl>
  )
}

export default NutritionInfo

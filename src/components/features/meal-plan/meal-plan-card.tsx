import React, { FC } from 'react'

import { Product } from '@/lib/shopify/types'

import { formatCurrency } from '@/utils/string'

import { AddToCart } from '@/components/shop/cart/add-to-cart'

type Props = {
  data: Product
}

const MealPlanCard: FC<Props> = ({ data }) => {
  const image = data?.featuredImage || {}
  const price = formatCurrency(data?.priceRange?.minVariantPrice?.amount)

  return (
    <div className='rounded p-6 border w-fit text-center flex flex-col gap-6 items-center bg-almost-white shadow-sm'>
      <div className='flex flex-col gap-6 items-center flex-auto'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image?.url} alt={image?.altText} className='w-64 h-auto' />
        <h3 className='font-medium'>{data?.title}</h3>
        {/* <p className='flex-auto'>{data?.description}</p> */}
        <p>{price}</p>
      </div>
      <AddToCart availableForSale variants={data?.variants} />
    </div>
  )
}

export default MealPlanCard

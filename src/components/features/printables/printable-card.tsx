'use client'

import React, { FC } from 'react'

import { Product } from '@/lib/shopify/types'

import { formatCurrency } from '@/utils/string'

import Accordion from '@/components/common/layout/accordion'
import { AddToCart } from '@/components/shop/cart/add-to-cart'

type Props = {
  data: Product
}

const PrintableCard: FC<Props> = ({ data }) => {
  const image = data?.featuredImage || {}
  const price = formatCurrency(data?.priceRange?.minVariantPrice?.amount)

  return (
    <div className='rounded p-6 border text-center w-full flex flex-col gap-6 items-center bg-almost-white shadow-sm'>
      <div className='flex flex-col gap-4 sm:gap-6 items-center w-full'>
        {/* Featured Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image?.url}
          alt={image?.altText}
          className='w-72 h-64 object-cover'
        />

        {/* Title */}
        <h3 className='font-medium text-lg text-balance'>{data?.title}</h3>

        {/* Description */}
        {data?.description ? (
          <Accordion
            collapsible
            // defaultOpen={[1]}
            className='w-full'
            items={[
              {
                header: 'Description',
                content: (
                  <p className='prose text-left max-md:max-w-lg'>
                    {data?.description}
                  </p>
                ),
              },
            ]}
          />
        ) : // <div className='h-10' />
        null}

        {/* Price */}
        <p className='text-lg'>{price}</p>
      </div>
      <AddToCart availableForSale variants={data?.variants} />
    </div>
  )
}

export default PrintableCard

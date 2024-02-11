import Image from 'next/image'
import React, { FC } from 'react'

import { Product } from '@/lib/shopify/types'

import { formatCurrency } from '@/utils/string'

import Logo from '@/components/common/logo'
import { AddToCart } from '@/components/shop/cart/add-to-cart'

type Props = {
  product?: Product
}

const ProductPage: FC<Props> = ({ product }) => {
  if (!product) return null
  const { title, description, featuredImage, priceRange, variants } =
    product || {}
  const price = formatCurrency(priceRange?.minVariantPrice?.amount)

  return (
    <div className='my-8 md:my-16 flex flex-col items-center gap-4 w-full'>
      {/* Heading */}
      <section className='flex max-md:flex-col w-full items-center md:items-end gap-y-4 gap-x-6 pb-4 md:self-start md:px-8'>
        {/* Image */}
        {featuredImage ? (
          <Image
            src={featuredImage?.url}
            alt={featuredImage?.altText || ''}
            width={600}
            height={600}
            className='w-3/4 max-w-64 sm:w-64 object-cover rounded border-2'
          />
        ) : (
          <Logo
            variant='small'
            imageProps={{
              width: 200,
              height: 200,
              className:
                'w-3/4 max-w-64 sm:w-64 object-cover rounded border-2 p-6',
            }}
          />
        )}
        <div className='max-md:text-center prose'>
          {/* Title */}
          {title ? (
            <h1 className='text-2xl sm:text-3xl max-w-2xl font-medium font-prata text-balance'>
              {title}
            </h1>
          ) : null}
          {/* Price */}
          {price ? <p className='text-lg'>{price}</p> : null}
          <div className='max-md:mx-auto w-fit'>
            <AddToCart availableForSale variants={variants || []} />
          </div>
        </div>
      </section>

      <span
        aria-hidden
        className='h-px max-md:w-1/3 w-full border-b mx-auto mb-2'
      />

      {/* Description */}
      <section className='prose'>
        {description ? <p className='text-pretty'>{description}</p> : null}
      </section>
    </div>
  )
}

export default ProductPage

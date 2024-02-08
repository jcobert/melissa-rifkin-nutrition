import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { type Recipe } from 'sanity-studio/types'

import { getImageProps } from '@/utils/cms'

import Logo from '@/components/common/logo'

type Props = {
  recipe: Recipe
}

const RecipeCard: FC<Props> = ({ recipe }) => {
  const { mainImage, slug, title, publishedAt } = recipe
  const image = getImageProps(mainImage)
  const linkToFull = `/recipes/${slug?.current}`
  return (
    <Link
      href={linkToFull}
      className='flex flex-col items-center gap-2 max-w-80 bg-almost-white border rounded shadow-sm transition-transform hover:-translate-y-1 transform max-md:mx-auto'
    >
      <div className='w-full'>
        {image?.url ? (
          <Image
            src={image?.url}
            alt={image?.alt || ''}
            width={image?.width}
            height={image?.height}
            className='object-cover object-center h-52 rounded'
          />
        ) : (
          <div className='h-52 w-full flex items-center justify-center rounded bg-background'>
            <Logo variant='small' imageProps={{ width: 150, height: 150 }} />
          </div>
        )}
      </div>
      <div className='px-12 pt-6 pb-12'>
        <span className='absolute inset-0 m-2 md:m-4 border border-brand-gray-light pointer-events-none'></span>
        <p className='flex-auto text-balance text-center text-lg font-medium text-brand-gray-dark hover:text-brand-gray-dark/hover transition'>
          {title}
        </p>
        {!!publishedAt && (
          <p className='text-brand-gray-medium text-xs'>
            {format(publishedAt, 'MMM dd, yyyy')}
          </p>
        )}
      </div>
    </Link>
  )
}

export default RecipeCard

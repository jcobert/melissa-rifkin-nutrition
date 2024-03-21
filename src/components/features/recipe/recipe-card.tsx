import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { type Recipe } from 'sanity-studio/types'

import Logo from '@/components/common/logo'
import Tag from '@/components/common/tag'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  recipe: Recipe
}

const RecipeCard: FC<Props> = ({ recipe }) => {
  const { mainImage, slug, title, publishedAt, category } = recipe || {}
  const linkToFull = `/recipes/${slug?.current}`

  return (
    <Link
      href={linkToFull}
      className='flex flex-col w-full items-center group gap-2 max-w-80 bg-almost-white border hover:border-brand-blue/30 rounded shadow-sm transition hover:-translate-y-1 transform max-md:mx-auto'
    >
      {mainImage ? (
        <Image
          src={builder
            .image(mainImage)
            .width(400)
            .height(400)
            .fit('crop')
            .crop('focalpoint')
            .quality(80)
            .url()}
          alt={mainImage?.alt || ''}
          width={400}
          height={400}
          className='object-cover object-center h-52 w-full rounded'
        />
      ) : (
        <div className='h-52 w-full flex items-center justify-center rounded bg-background'>
          <Logo variant='small' imageProps={{ width: 150, height: 150 }} />
        </div>
      )}

      <div className='px-12 pt-6 pb-12 flex flex-col gap-2'>
        <span className='absolute inset-0 m-2 md:m-4 border border-brand-gray-light pointer-events-none'></span>
        <p className='flex-auto text-balance text-center text-lg font-medium text-brand-blue-dark group-hover:text-brand-blue transition'>
          {title}
        </p>
        {!!publishedAt && (
          <p className='text-brand-gray-medium text-xs'>
            {format(publishedAt, 'MMM dd, yyyy')}
          </p>
        )}
        {category?.length ? (
          <div className='flex items-center justify-center gap-2 sm:gap-1'>
            {category?.map((cat) => (
              <Tag
                key={cat}
                tag={cat}
                className='bg-almost-white text-brand-blue-dark border-gray-200 text-xs max-sm:py-1 max-sm:px-2'
              />
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default RecipeCard

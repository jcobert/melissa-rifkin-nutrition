import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { Recipe } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import Logo from '@/components/common/logo'
import Tag from '@/components/common/tag'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  recipe: Recipe
  className?: string
}

const RecipeOverview: FC<Props> = ({ recipe, className }) => {
  const { mainImage, slug, title, publishedAt, tags, category } = recipe || {}
  const linkToFull = `/recipes/${slug?.current}`

  return (
    <Link
      href={linkToFull}
      className={cn(
        'group transition w-full flex max-sm:flex-col gap-x-8 items-stretch__ sm:items-end gap-y-4 bg-almost-white sm:bg-almost-white/40 hover:bg-almost-white p-4 border border-gray-100 hover:border-gray-200 rounded hover:shadow-sm__',
        [className],
      )}
    >
      <div className='max-sm:w-full'>
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
            className='object-cover object-center h-72 sm:h-36 w-full rounded'
          />
        ) : (
          <div className='h-52 w-full flex items-center justify-center rounded bg-background'>
            <Logo variant='small' imageProps={{ width: 150, height: 150 }} />
          </div>
        )}
      </div>

      <div className='flex flex-col gap-2 md:gap-y-4__ max-sm:items-center'>
        <p className='flex-auto__ md:pb-4__ text-balance text-brand-blue-dark max-w-prose text-lg max-sm:text-center font-medium group-hover:text-brand-blue transition'>
          {title}
        </p>

        {publishedAt ? (
          <p className='text-brand-gray-medium text-xs'>
            {format(publishedAt, 'MMM dd, yyyy')}
          </p>
        ) : null}

        {/* {category?.length ? (
          <div className='flex-auto__ max-sm:hidden'>
            {category?.map((cat) => (
              <Tag
                key={cat}
                tag={cat}
                className='bg-almost-white text-brand-blue-dark border-gray-200'
                // className='bg-brand-blue-dark text-almost-white border-none'
              />
            ))}
          </div>
        ) : null} */}

        {tags?.length ? (
          <div className='flex items-center gap-4 sm:gap-2 flex-auto__ mt-auto__ mt-4 max-sm:hidden'>
            {tags?.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                className='bg-gray-100 text-brand-gray-dark border-gray-200'
              />
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default RecipeOverview

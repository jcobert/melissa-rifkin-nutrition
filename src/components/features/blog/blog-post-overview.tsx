import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { Post } from 'sanity-studio/types'

import { getImageProps } from '@/utils/cms'
import { cn } from '@/utils/style'

import Logo from '@/components/common/logo'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  post: Post
  hideDate?: boolean
  className?: string
}

const BlogPostOverview: FC<Props> = ({ post, className, hideDate = false }) => {
  const { mainImage, slug, title, author, publishedAt } = post
  const image = getImageProps(mainImage)

  return (
    <Link
      href={`/blog/${slug?.current}`}
      className={cn(
        'group transition flex max-sm:flex-col gap-x-8 items-center gap-y-2 bg-almost-white/40 hover:bg-almost-white p-4 sm:border border-gray-100 hover:border-gray-200 rounded hover:shadow-sm__',
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
            alt={image?.alt || ''}
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

      <div className='flex flex-col max-sm:items-center gap-2'>
        <h2 className='flex-auto text-balance text-brand-blue-dark max-w-prose text-lg max-sm:text-center font-medium group-hover:text-brand-blue transition'>
          {title}
        </h2>
        {!!author?.name && (
          <p className='flex-auto text-brand-gray-dark'>By {author?.name}</p>
        )}
        {!!publishedAt && !hideDate && (
          <p className='text-brand-gray-medium text-xs'>
            {format(publishedAt, 'MMM dd, yyyy')}
          </p>
        )}
      </div>
    </Link>
  )
}

export default BlogPostOverview

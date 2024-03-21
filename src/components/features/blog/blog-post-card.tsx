import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { Post } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import Logo from '@/components/common/logo'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  post: Post
  hideDate?: boolean
  className?: string
}

const BlogPostCard: FC<Props> = ({
  post,
  hideDate = false,
  className = '',
}) => {
  const { mainImage, slug, title, author, publishedAt } = post

  return (
    <Link
      href={`/blog/${slug?.current}`}
      className={cn(
        'group hover:bg-almost-white/hover transition flex flex-col items-center gap-2 max-w-80 bg-almost-white p-4 border hover:border-brand-blue/30 rounded shadow-sm',
        [className],
      )}
    >
      <div className='w-full'>
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
            className='object-cover object-center h-52 rounded'
          />
        ) : (
          <div className='h-52 w-full flex items-center justify-center rounded bg-background'>
            <Logo variant='small' imageProps={{ width: 150, height: 150 }} />
          </div>
        )}
      </div>
      <h2 className='flex-auto text-balance text-center text-lg font-medium text-brand-blue-dark group-hover:text-brand-blue transition'>
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
    </Link>
  )
}

export default BlogPostCard

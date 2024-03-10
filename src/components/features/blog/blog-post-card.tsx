import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { Post } from 'sanity-studio/types'

import { getImageProps } from '@/utils/cms'
import { cn } from '@/utils/style'

import Logo from '@/components/common/logo'

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

  /** @todo use sanity image builder. */
  const image = getImageProps(mainImage)
  return (
    <Link
      href={`/blog/${slug?.current}`}
      className={cn(
        'group hover:bg-almost-white/hover transition flex flex-col items-center gap-2 max-w-80 bg-almost-white p-4 border rounded shadow-sm',
        [className],
      )}
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

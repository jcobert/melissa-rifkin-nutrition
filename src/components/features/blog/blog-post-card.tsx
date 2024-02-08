import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { Post } from 'sanity-studio/types'

import { getImageProps } from '@/utils/cms'

import Logo from '@/components/common/logo'

type Props = {
  post: Post
}

const BlogPostCard: FC<Props> = ({ post }) => {
  const { mainImage, slug, title, author, publishedAt } = post
  const image = getImageProps(mainImage)
  return (
    <div className='flex flex-col items-center gap-2 max-w-80 bg-almost-white p-4 border rounded shadow-sm'>
      <Link href={`/blog/${slug?.current}`} className='w-full'>
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
      </Link>
      <Link
        href={`/blog/${slug?.current}`}
        className='flex-auto text-balance text-center text-lg font-medium text-brand-gray-dark hover:text-brand-gray-dark/hover transition'
      >
        {title}
      </Link>
      {!!author?.name && (
        <p className='flex-auto text-brand-gray-dark'>By {author?.name}</p>
      )}
      {!!publishedAt && (
        <p className='text-brand-gray-medium text-xs'>
          {format(publishedAt, 'MMM dd, yyyy')}
        </p>
      )}
    </div>
  )
}

export default BlogPostCard

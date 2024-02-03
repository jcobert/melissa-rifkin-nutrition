import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import Image from 'next/image'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { Post } from 'sanity-studio/types'

import PageLayout from '@/components/common/layout/page-layout'
import Logo from '@/components/common/logo'
import { portableComponents } from '@/components/common/portable/portable-components'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  post: Post
}

const BlogPost: FC<Props> = ({ post }) => {
  const { title, publishedAt, author, mainImage, body } = post || {}

  return (
    <PageLayout className='flex flex-col items-center text-almost-black'>
      <div className='my-8 md:my-16 flex flex-col items-center gap-4 w-full'>
        {/* Heading */}
        <section className='flex max-md:flex-col w-full items-center md:items-end gap-y-4 gap-x-6 pb-4 md:self-start md:px-8'>
          {/* Image */}
          {mainImage ? (
            <Image
              src={builder
                .image(mainImage)
                .width(600)
                .height(600)
                .fit('crop')
                .crop('focalpoint')
                .quality(80)
                .url()}
              alt={mainImage?.alt || ''}
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
            {/* Author */}
            {author?.name ? (
              <p className='text-pretty'>By {author?.name}</p>
            ) : null}
            {/* Date */}
            {publishedAt ? (
              <p className='text-brand-gray-medium text-sm'>
                {format(publishedAt, 'MMM dd, yyyy')}
              </p>
            ) : null}
          </div>
        </section>

        <span
          aria-hidden
          className='h-px max-md:w-1/3 w-full border-b mx-auto mb-2'
        />

        {/* Body */}
        <section className='prose'>
          {body ? (
            <PortableText value={body} components={portableComponents} />
          ) : null}
        </section>
      </div>
    </PageLayout>
  )
}

export default BlogPost

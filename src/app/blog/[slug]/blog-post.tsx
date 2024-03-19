import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import Image from 'next/image'
import React, { FC } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { dataset, projectId } from 'sanity-studio/env'
import { Post } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import PageLayout from '@/components/common/layout/page-layout'
import Back from '@/components/common/links/back'
import Logo from '@/components/common/logo'
import { portableComponents } from '@/components/common/portable/portable-components'
import Tag from '@/components/common/tag'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  post: Post
}

const BlogPost: FC<Props> = ({ post }) => {
  const { title, publishedAt, author, mainImage, body, tags, externalUrl } =
    post || {}

  const { width, height, aspectRatio } =
    mainImage?.asset?.metadata?.dimensions || {}

  const wideImage = aspectRatio && aspectRatio > 1

  return (
    <PageLayout className='flex flex-col items-center text-almost-black'>
      <Back href='/blog' text='All Posts' />
      <div className='my-8 md:my-16 flex flex-col items-center gap-4 w-full'>
        {/* Heading */}
        <section
          className={cn([
            'flex max-md:flex-col w-full items-center md:items-end gap-y-4 gap-x-6 pb-4 md:self-start md:px-8 lg:px-24',
            wideImage && 'flex-col !items-center',
          ])}
        >
          {/* Image */}
          {mainImage ? (
            <Image
              src={builder
                .image(mainImage)
                .width(width as number)
                .height(height as number)
                .fit('crop')
                .crop('focalpoint')
                .quality(80)
                .url()}
              alt={mainImage?.alt || ''}
              width={width}
              height={height}
              className={cn([
                'w-3/4 max-w-64 sm:w-64__ object-cover rounded border-2',
                wideImage && 'max-w-[36rem]',
              ])}
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

      {/* External Link */}
      {externalUrl ? (
        <div className='flex flex-col items-center gap-2'>
          <a
            href={externalUrl}
            className='btn-outline flex items-center gap-2 w-fit'
          >
            <span>Keep reading</span>
            <FiExternalLink />
          </a>
          <p className='text-sm text-brand-gray-medium'>
            {`This article was originally posted by ${author?.name} on another site.`}
          </p>
        </div>
      ) : null}

      {/* Tags */}
      {tags?.length ? (
        <div className='p-4 mt-16 w-full border-t flex flex-col gap-4'>
          <h5 className='text-center text-brand-gray-dark'>Categories</h5>
          <div className='flex items-center gap-4 flex-wrap justify-center max-sm:justify-between'>
            {tags?.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                href={`/blog?category=${tag}`}
                className='max-sm:flex-1 max-sm:max-w-[calc(50%-16px)]'
              />
            ))}
          </div>
        </div>
      ) : null}
    </PageLayout>
  )
}

export default BlogPost

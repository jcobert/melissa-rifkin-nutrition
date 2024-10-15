'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { QueryParams, SanityDocument } from 'next-sanity'
import React, { FC } from 'react'
import { POST_QUERY } from 'sanity-studio/lib/queries'
import { Post } from 'sanity-studio/types'

import BlogPost from '@/app/(main)/blog/[slug]/blog-post'

type Props = {
  initial: QueryResponseInitial<SanityDocument<Post>>
  params: QueryParams
}

const BlogPostPreview: FC<Props> = ({ initial, params }) => {
  const { data } = useQuery<SanityDocument<Post> | null>(POST_QUERY, params, {
    initial,
  })

  return data ? (
    <BlogPost post={data} />
  ) : (
    <div className='bg-red-100'>Post not found</div>
  )
}

export default BlogPostPreview

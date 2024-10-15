'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import React, { FC } from 'react'
import { POSTS_QUERY } from 'sanity-studio/lib/queries'
import { Post } from 'sanity-studio/types'

import BlogPosts from '@/app/(main)/blog/blog-posts'

type Props = {
  initial: QueryResponseInitial<SanityDocument<Post>[]>
}

const BlogPostsPreview: FC<Props> = ({ initial }) => {
  const { data } = useQuery<SanityDocument<Post>[] | null>(
    POSTS_QUERY,
    {},
    { initial },
  )

  return data ? (
    <BlogPosts posts={data || []} />
  ) : (
    <div className='bg-red-100'>No posts found</div>
  )
}

export default BlogPostsPreview

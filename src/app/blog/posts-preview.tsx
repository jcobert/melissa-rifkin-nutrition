'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import React, { FC } from 'react'
import { POSTS_QUERY } from 'sanity-studio/lib/queries'
import { Post } from 'sanity-studio/types'

import Posts from '@/app/blog/posts'

type Props = {
  data: QueryResponseInitial<SanityDocument<Post>[]>
}

const PostsPreview: FC<Props> = ({ data }) => {
  const { data: posts } = useQuery<SanityDocument<Post>[] | null>(
    POSTS_QUERY,
    {},
    { initial: data },
  )

  return data ? (
    <Posts data={posts || []} />
  ) : (
    <div className='bg-red-100'>No posts found</div>
  )
}

export default PostsPreview

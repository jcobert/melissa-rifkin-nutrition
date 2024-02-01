import { POSTS_QUERY } from 'cms/lib/queries'
import { loadQuery } from 'cms/lib/store'
import { Post } from 'cms/schemas/post'
import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'

import PageLayout from '@/components/common/layout/page-layout'

import Posts from '@/app/blog/posts'
import PostsPreview from '@/app/blog/posts-preview'
import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Blog'),
}

const BlogPage: FC = async () => {
  const posts = await loadQuery<SanityDocument<Post>[]>(
    POSTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  return (
    <PageLayout
      heading='Blog'
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      <div className='flex flex-col items-center gap-8'>
        <div>
          {draftMode()?.isEnabled ? (
            <PostsPreview data={posts} />
          ) : (
            <Posts data={posts?.data} />
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default BlogPage

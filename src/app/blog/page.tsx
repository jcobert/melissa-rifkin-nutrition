import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { POSTS_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { Post } from 'sanity-studio/types'

import PageLayout from '@/components/common/layout/page-layout'

import BlogPosts from '@/app/blog/blog-posts'
import BlogPostsPreview from '@/app/blog/blog-posts-preview'
import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Blog'),
}

const BlogPage: FC = async () => {
  const initial = await loadQuery<SanityDocument<Post>[]>(
    POSTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  // console.log(posts?.data?.[0])

  return (
    <PageLayout
      heading='Blog'
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      {draftMode()?.isEnabled ? (
        <BlogPostsPreview initial={initial} />
      ) : (
        <BlogPosts posts={initial?.data} />
      )}
    </PageLayout>
  )
}

export default BlogPage

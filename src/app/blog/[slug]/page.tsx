import { Metadata } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { client } from 'sanity-studio/lib/client'
import { POSTS_QUERY, POST_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { Post } from 'sanity-studio/types'

import PageLayout from '@/components/common/layout/page-layout'

import BlogPost from '@/app/blog/[slug]/blog-post'
import BlogPostPreview from '@/app/blog/[slug]/blog-post-preview'
import { pageTitle } from '@/configuration/site'

/** @todo set dynamic metadata for page title.  */
export const metadata: Metadata = {
  title: pageTitle('Blog'),
}

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY)
  return posts?.map((post) => ({
    slug: post.slug.current,
  }))
}

const BlogPostPage: FC<{ params: QueryParams }> = async ({ params }) => {
  const initial = await loadQuery<SanityDocument<Post>>(POST_QUERY, params, {
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
  })

  return (
    <PageLayout className='flex flex-col gap-16 items-center text-almost-black'>
      {draftMode().isEnabled ? (
        <BlogPostPreview initial={initial} params={params} />
      ) : (
        <BlogPost post={initial?.data} />
      )}
    </PageLayout>
  )
}

export default BlogPostPage

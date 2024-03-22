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
import { buildOgImage, openGraphMeta, twitterMeta } from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'

export const metadata: Metadata = {
  title: 'Blog',
  openGraph: openGraphMeta({
    title: `The ${siteConfig?.title} Blog`,
    images: [buildOgImage({ title: 'Blog' })],
  }),
  twitter: twitterMeta({
    title: `The ${siteConfig?.title} Blog`,
    images: [buildOgImage({ title: 'Blog' })],
  }),
}

export type BlogPageProps = {
  searchParams?: {
    category?: string
  }
}

const BlogPage: FC<BlogPageProps> = async ({ searchParams }) => {
  const initial = await loadQuery<SanityDocument<Post>[]>(
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
      {draftMode()?.isEnabled ? (
        <BlogPostsPreview initial={initial} />
      ) : (
        <BlogPosts posts={initial?.data} params={searchParams} />
      )}
    </PageLayout>
  )
}

export default BlogPage

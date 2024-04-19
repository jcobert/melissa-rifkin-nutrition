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
import {
  buildOgImage,
  generatePageTitle,
  openGraphMeta,
  twitterMeta,
} from '@/configuration/seo'

const pageTitle = 'Blog'
const seoDescription =
  'Our blog includes a collection of insightful posts and articles about health and wellness.'

export const metadata: Metadata = {
  title: pageTitle,
  description: seoDescription,
  openGraph: openGraphMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [buildOgImage({ title: pageTitle })],
  }),
  twitter: twitterMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [buildOgImage({ title: pageTitle })],
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
      heading={pageTitle}
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

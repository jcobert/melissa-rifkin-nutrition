import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React from 'react'
import {
  GENERAL_QUERY,
  POSTS_QUERY,
  TESTIMONIALS_BY_RELATIONSHIP_QUERY,
} from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { General, Post, Testimonial } from 'sanity-studio/types'

import HomePage from '@/components/features/home/home-page'
import { getHomePageSchema } from '@/components/features/home/utils/schema-json'

import {
  buildOgImage,
  buildPageTitle,
  openGraphMeta,
} from '@/configuration/seo'

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
  openGraph: openGraphMeta({ images: [buildOgImage()] }),
}

const Page = async () => {
  const generalInfo = await loadQuery<SanityDocument<General>>(
    GENERAL_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const testimonials = await loadQuery<SanityDocument<Testimonial>[]>(
    TESTIMONIALS_BY_RELATIONSHIP_QUERY,
    { relationship: 'client' },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const blogPosts = await loadQuery<SanityDocument<Post>[]>(
    POSTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const jsonLd = getHomePageSchema(generalInfo)

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage
        generalInfo={generalInfo}
        blogPosts={blogPosts}
        testimonials={testimonials}
      />
    </>
  )
}

export default Page

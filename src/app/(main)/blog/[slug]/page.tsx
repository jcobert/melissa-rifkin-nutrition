import { toPlainText } from '@portabletext/react'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { client } from 'sanity-studio/lib/client'
import { POSTS_QUERY, POST_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { BlockContent, Post } from 'sanity-studio/types'
import { BlogPosting, WithContext } from 'schema-dts'

import BlogPost from '@/app/(main)/blog/[slug]/blog-post'
import BlogPostPreview from '@/app/(main)/blog/[slug]/blog-post-preview'
import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl, siteConfig } from '@/configuration/site'

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'default-no-store'
// export const revalidate = 60

export type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params?.slug
  const post = await client.fetch<SanityDocument<Post>>(
    POST_QUERY,
    {
      slug,
    },
    {
      next: { revalidate: 60 },
      // cache: 'no-store'
    },
  )

  const { title, mainImage, author, seoDescription } = post || {}

  return generatePageMeta({
    title,
    description: seoDescription || title,
    category: 'Blog post',
    authors: [{ name: author?.name, url: siteConfig?.url }],
    url: canonicalUrl(`/blog/${slug}`),
    images: [
      {
        url: mainImage?.asset?.url || '',
        width: mainImage?.asset?.metadata?.dimensions?.width,
        height: mainImage?.asset?.metadata?.dimensions?.height,
        alt: mainImage?.alt,
      },
    ],
    openGraph: { type: 'article', authors: author?.name },
  })
}

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument<Post>[]>(POSTS_QUERY)
  return posts?.map((post) => ({
    slug: post?.slug?.current,
  }))
}

const BlogPostPage: FC<{ params: QueryParams }> = async ({ params }) => {
  const initial = await loadQuery<SanityDocument<Post>>(POST_QUERY, params, {
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    next: { revalidate: 60 },
    // cache: 'no-store',
  })

  const { title, body, seoDescription, author, tags, mainImage, _createdAt } =
    initial?.data || {}

  const articleBody = body ? toPlainText(body as BlockContent) : ''

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: title,
    author: { '@type': 'Person', name: author?.name },
    datePublished: format(_createdAt, 'yyy-MM-dd'),
    description: seoDescription,
    articleBody,
    keywords: tags ? tags?.join(', ') : undefined,
    image: {
      '@type': 'ImageObject',
      contentUrl: mainImage?.asset?.url,
      url: mainImage?.asset?.url,
      name: mainImage?.alt,
    },
  }

  return draftMode().isEnabled ? (
    <BlogPostPreview initial={initial} params={params} />
  ) : (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost post={initial?.data} />
    </>
  )
}

export default BlogPostPage

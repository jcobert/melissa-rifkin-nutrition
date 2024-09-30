import { toPlainText } from '@portabletext/react'
import { Metadata } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { client } from 'sanity-studio/lib/client'
import { POSTS_QUERY, POST_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { BlockContent, Post } from 'sanity-studio/types'
import { BlogPosting, WithContext } from 'schema-dts'

import BlogPost from '@/app/blog/[slug]/blog-post'
import BlogPostPreview from '@/app/blog/[slug]/blog-post-preview'
import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl, siteConfig } from '@/configuration/site'

export const dynamic = 'force-dynamic'
export const fetchCache = 'default-no-store'
export const revalidate = 10

export type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params?.slug
  const post = await client.fetch<SanityDocument<Post>>(POST_QUERY, {
    slug,
  })

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
    next: { revalidate: 10 },
  })

  const { title, body, tags, mainImage } = initial?.data || {}

  const articleBody = toPlainText(body as BlockContent)

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: title,
    articleBody,
    keywords: tags?.join(', '),
    image: {
      '@type': 'ImageObject',
      contentUrl: mainImage?.asset?.url,
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

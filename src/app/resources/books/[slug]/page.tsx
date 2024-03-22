import { Metadata } from 'next'
import React, { FC } from 'react'

import { getCollectionProducts } from '@/lib/shopify'

import PageLayout from '@/components/common/layout/page-layout'
import ProductPage from '@/components/common/layout/product-page'
import Back from '@/components/common/links/back'

import { buildOgImage, openGraphMeta, twitterMeta } from '@/configuration/seo'

export type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = decodeURI(params?.slug)

  /** @todo Remove once production store is in use. */
  const collection = process.env.NODE_ENV === 'production' ? 'books' : 'books-1'
  const allBooks = await getCollectionProducts({
    collection,
  })

  const { title, description, featuredImage } =
    allBooks?.find((b) => b?.handle === slug) || {}

  return {
    title,
    description,
    // keywords: tags?.join(', '),
    openGraph: openGraphMeta({
      title,
      images: [
        {
          url: featuredImage?.url || '',
          width: featuredImage?.width,
          height: featuredImage?.height,
          alt: featuredImage?.altText,
        },
      ],
    }),
    twitter: twitterMeta({
      title,
      // description,
      images: [
        {
          url: featuredImage?.url || '',
          width: featuredImage?.width,
          height: featuredImage?.height,
          alt: featuredImage?.altText,
        },
      ],
    }),
  }
}

const BookPage: FC<{ params: { slug: string } }> = async ({ params }) => {
  const slug = decodeURI(params?.slug)

  /** @todo Remove once production store is in use. */
  const collection = process.env.NODE_ENV === 'production' ? 'books' : 'books-1'
  const allBooks = await getCollectionProducts({
    collection,
  })

  const book = allBooks?.find((b) => b?.handle === slug)

  return (
    <PageLayout className='flex flex-col items-center text-almost-black'>
      <Back href='/resources/books' text='All Books' />
      <ProductPage product={book} />
    </PageLayout>
  )
}

export default BookPage

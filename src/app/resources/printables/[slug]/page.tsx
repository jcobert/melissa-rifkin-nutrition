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

  const allPrintables = await getCollectionProducts({
    collection: 'printables',
  })

  const { title, description, featuredImage } =
    allPrintables?.find((p) => p?.handle === slug) || {}

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

const PrintablePage: FC<{ params: { slug: string } }> = async ({ params }) => {
  const slug = decodeURI(params?.slug)

  const allPrintables = await getCollectionProducts({
    collection: 'printables',
  })

  const printable = allPrintables?.find((p) => p?.handle === slug)

  return (
    <PageLayout className='flex flex-col items-center text-almost-black'>
      <Back href='/resources/printables' text='All Printables' />
      <ProductPage product={printable} />
    </PageLayout>
  )
}

export default PrintablePage

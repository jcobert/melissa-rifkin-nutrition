import { Metadata } from 'next'
import React from 'react'

import { getCollectionProducts } from '@/lib/shopify'

import PageLayout from '@/components/common/layout/page-layout'
import ProductCard from '@/components/product-card'

import {
  buildOgImage,
  generatePageTitle,
  openGraphMeta,
  twitterMeta,
} from '@/configuration/seo'

const pageTitle = 'Printables'
const seoDescription =
  'A collection of resources for you to read and print out for quick reference. Tips, tricks, and valuable insight.'

export const metadata: Metadata = {
  title: pageTitle,
  description: seoDescription,
  openGraph: openGraphMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [
      buildOgImage({
        title: pageTitle,
      }),
    ],
  }),
  twitter: twitterMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [
      buildOgImage({
        title: pageTitle,
      }),
    ],
  }),
}

const PrintablesPage = async () => {
  const printables = await getCollectionProducts({
    collection: 'printables',
    // sortKey: 'TITLE',
  })

  return (
    <PageLayout
      heading={pageTitle}
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      <div className='prose self-start'>
        <p>
          A collection of resources for you to read and print out for quick
          reference. You'll find tips, tricks, and valuable health and wellness
          insight.
        </p>
      </div>

      <div className='flex flex-col gap-6 items-center max-w-3xl'>
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2 w-full justify-items-center'>
          {printables?.map((item) => (
            <ProductCard
              key={item?.id}
              data={item}
              path='/resources/printables'
            />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default PrintablesPage

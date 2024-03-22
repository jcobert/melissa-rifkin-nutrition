import { Metadata } from 'next'
import React from 'react'

import { getCollectionProducts } from '@/lib/shopify'

import PageLayout from '@/components/common/layout/page-layout'
import ProductCard from '@/components/product-card'

import { buildOgImage, openGraphMeta } from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'

export const metadata: Metadata = {
  title: 'Printables',
  openGraph: openGraphMeta({
    title: `Printables by ${siteConfig?.title}`,
    description:
      "A collection of resources for you to read and print out for quick reference. You'll find tips, tricks, and valuable health and wellness insight.",
    images: [
      buildOgImage({
        title: 'Printables',
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
      heading='Printables'
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

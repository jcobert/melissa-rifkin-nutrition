import { Metadata } from 'next'
import React from 'react'

import { getCollectionProducts } from '@/lib/shopify'

import PageLayout from '@/components/common/layout/page-layout'
import ProductCard from '@/components/product-card'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Books'),
}

const BooksPage = async () => {
  /**
   * @todo Remove once production store is in use.
   */
  const collection = process.env.NODE_ENV === 'production' ? 'books' : 'books-1'
  const books = await getCollectionProducts({
    collection,
  })

  return (
    <PageLayout
      heading='Books'
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      {/* <div className='prose self-start'>
        <p></p>
      </div> */}

      <div className='flex flex-col gap-6 items-center max-w-3xl'>
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2 w-full justify-items-center'>
          {books?.map((item) => (
            <ProductCard key={item?.id} data={item} path='/resources/books' />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default BooksPage

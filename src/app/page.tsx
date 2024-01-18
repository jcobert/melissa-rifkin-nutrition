import { Metadata } from 'next'
import React from 'react'

// import { getProducts } from '@/lib/shopify/request'

import PageLayout from '@/components/common/layout/page-layout'

export const metadata: Metadata = {
  title: 'Home | ',
}

const HomePage = async () => {
  // const data = await getProducts()
  // console.log(data.products.edges)

  return (
    <PageLayout>
      <div className=''></div>
    </PageLayout>
  )
}

export default HomePage

import { Metadata } from 'next'
import React from 'react'

import PageLayout from '@/components/common/layout/page-layout'

export const metadata: Metadata = {
  title: 'Home | ',
}

const HomePage = async () => {
  return (
    <PageLayout>
      <div className=''></div>
    </PageLayout>
  )
}

export default HomePage

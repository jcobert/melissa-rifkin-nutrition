import { Metadata } from 'next'
import React from 'react'

import PageLayout from '@/components/common/layout/page-layout'

import { pageTitle } from '@/configuration/site'

export const metadata: Metadata = {
  title: pageTitle('Home'),
}

const HomePage = async () => {
  return (
    <PageLayout>
      <div className='mt-24'>
        <p className=''>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </PageLayout>
  )
}

export default HomePage

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
        <p className='font-manrope'>
          lkajsdflkjadsf ljadsflk asd;lfkjs da;lfkj as;lkfj as;dlkfj ;lksadjf
          ;lkasj f;lkasdj f;lkadjs f;lk jads;lfkj dsl;fkjadsl;kf
          jl;kadsjflkasjdf;lkasj;lkfjasl;dkf j
        </p>
      </div>
    </PageLayout>
  )
}

export default HomePage

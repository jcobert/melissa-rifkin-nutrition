import { Metadata } from 'next'
import React, { FC } from 'react'

import Calendly from '@/components/calendly'
import PageLayout from '@/components/common/layout/page-layout'

import { buildOgImage, openGraphMeta, twitterMeta } from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'

export const metadata: Metadata = {
  title: 'Contact',
  openGraph: openGraphMeta({
    title: `Contact ${siteConfig?.title}`,
    description:
      "We'd love to learn about you and your wellness goals! Schedule a quick call with us, so we can identify the right path forward for you.",
    images: [buildOgImage({ title: 'Contact Us' })],
  }),
  twitter: twitterMeta({
    title: `Contact ${siteConfig?.title}`,
    description:
      "We'd love to learn about you and your wellness goals! Schedule a quick call with us, so we can identify the right path forward for you.",
    images: [buildOgImage({ title: 'Contact Us' })],
  }),
}

const ContactPage: FC = () => {
  return (
    <PageLayout heading='Contact Us'>
      <div className='flex flex-col items-center gap-8'>
        {/* <h2>Schedule a Consultation</h2> */}
        <p className='prose'>
          We'd love to learn about you and your wellness goals! Schedule a quick
          call with us, so we can identify the right path forward for you.
        </p>
        <div className='w-full sm:w-10/12 md:w-3/4 lg:w-1/2 border rounded'>
          <Calendly />
        </div>
      </div>
    </PageLayout>
  )
}

export default ContactPage

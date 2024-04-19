import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { ABOUT_PAGE_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { type AboutPage } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import PageLayout from '@/components/common/layout/page-layout'
import FullBio from '@/components/features/bio/full-bio'

import {
  buildOgImage,
  generatePageTitle,
  openGraphMeta,
  twitterMeta,
} from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'

const pageTitle = 'About Us'
const seoDescription = `Meet Melissa and our team of expert dieticians and nutritionists at ${siteConfig?.title}.`

export const metadata: Metadata = {
  title: pageTitle,
  description: seoDescription,
  openGraph: openGraphMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [buildOgImage({ title: pageTitle })],
  }),
  twitter: twitterMeta({
    title: generatePageTitle(pageTitle),
    description: seoDescription,
    images: [buildOgImage({ title: pageTitle })],
  }),
}

const AboutPage: FC = async () => {
  const content = await loadQuery<SanityDocument<AboutPage>>(
    ABOUT_PAGE_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )
  const data = content?.data

  return (
    <PageLayout
      heading={pageTitle}
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      <div className='flex flex-col gap-12 mt-4 md:mt-8'>
        {data?.bios?.length
          ? data?.bios?.map((bio, i) => (
              <div key={bio?._id} className='flex flex-col gap-4'>
                <FullBio bio={bio} />
                <span
                  aria-hidden
                  className={cn(
                    'h-px max-md:w-2/3 w-full border-b mx-auto mt-8',
                    [i === (data?.bios || [])?.length - 1 && 'hidden'],
                  )}
                />
              </div>
            ))
          : null}
      </div>
    </PageLayout>
  )
}

export default AboutPage

import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { ABOUT_PAGE_QUERY, GENERAL_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { AboutPage as AboutPageData, General } from 'sanity-studio/types'

import AboutPage from '@/components/features/about/about-page'
import { aboutPageSchemaMarkup } from '@/components/features/about/utils/schema-markup'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl, siteConfig } from '@/configuration/site'

export const metadata: Metadata = generatePageMeta({
  title: 'About Us',
  description: `Meet Melissa and our team of expert dieticians and nutritionists at ${siteConfig?.title}.`,
  url: canonicalUrl('/about'),
})

const Page: FC = async () => {
  const aboutPageData = await loadQuery<SanityDocument<AboutPageData>>(
    ABOUT_PAGE_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const generalInfo = await loadQuery<SanityDocument<General>>(GENERAL_QUERY)

  const jsonLd = aboutPageSchemaMarkup({ generalInfo, aboutPageData })

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage aboutPageData={aboutPageData} generalInfo={generalInfo} />
    </>
  )
}

export default Page

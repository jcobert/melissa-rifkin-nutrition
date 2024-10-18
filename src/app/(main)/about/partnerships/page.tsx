import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import {
  GENERAL_QUERY,
  TESTIMONIALS_BY_RELATIONSHIP_QUERY,
} from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { General, Testimonial } from 'sanity-studio/types'

import PartnershipsPage from '@/components/features/partnerships/partnerships-page'
import { partnershipsPageSchemaMarkup } from '@/components/features/partnerships/utils/schema-markup'

import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl, siteConfig } from '@/configuration/site'

export const metadata: Metadata = generatePageMeta({
  title: 'Partnerships',
  description: `Explore a partnership with ${siteConfig?.title}.`,
  url: canonicalUrl('/about/partnerships'),
})

const Page: FC = async () => {
  const generalInfo = await loadQuery<SanityDocument<General>>(
    GENERAL_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const testimonials = await loadQuery<SanityDocument<Testimonial>[]>(
    TESTIMONIALS_BY_RELATIONSHIP_QUERY,
    { relationship: 'partner' },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    },
  )

  const jsonLd = partnershipsPageSchemaMarkup({ generalInfo, testimonials })

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PartnershipsPage generalInfo={generalInfo} testimonials={testimonials} />
    </>
  )
}

export default Page

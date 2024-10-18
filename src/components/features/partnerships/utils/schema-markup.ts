import { QueryResponseInitial } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import { General, Testimonial } from 'sanity-studio/types'
import { WebPage, WithContext } from 'schema-dts'

import { websiteSchemaMarkup } from '@/utils/schema-markup/common'

import { buildPageTitle } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

type Params = {
  generalInfo: QueryResponseInitial<SanityDocument<General>>
  testimonials: QueryResponseInitial<SanityDocument<Testimonial>[]>
}

export const partnershipsPageSchemaMarkup = ({
  generalInfo,
  testimonials,
}: Params) => {
  const website = websiteSchemaMarkup({ generalInfo })

  const webPage: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: buildPageTitle('Partnerships'),
    url: canonicalUrl('/about/partnerships'),
    isPartOf: website,
  }

  return webPage
}

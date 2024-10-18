import { QueryResponseInitial } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import { AboutPage, General } from 'sanity-studio/types'
import { WebPage, WithContext } from 'schema-dts'

import { websiteSchemaMarkup } from '@/utils/schema-markup/common'

import { buildPageTitle } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

type Params = {
  generalInfo: QueryResponseInitial<SanityDocument<General>>
  aboutPageData: QueryResponseInitial<SanityDocument<AboutPage>>
}

export const aboutPageSchemaMarkup = ({
  generalInfo,
  aboutPageData,
}: Params) => {
  const website = websiteSchemaMarkup({ generalInfo })

  const webPage: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: buildPageTitle('About Us'),
    url: canonicalUrl('/about'),
    isPartOf: website,
  }

  return webPage
}

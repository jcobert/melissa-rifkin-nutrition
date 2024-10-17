import { QueryResponseInitial } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import { General } from 'sanity-studio/types'
import { WebPage, WithContext } from 'schema-dts'

import { websiteSchemaMarkup } from '@/utils/schema-markup/common'

import { buildPageTitle } from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'

type Params = {
  generalInfo: QueryResponseInitial<SanityDocument<General>>
}

export const homePageSchemaMarkup = ({ generalInfo }: Params) => {
  const website = websiteSchemaMarkup({ generalInfo })

  const webPage: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: buildPageTitle('Home'),
    url: siteConfig?.url,
    isPartOf: website,
  }

  return webPage
}

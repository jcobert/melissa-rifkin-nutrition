import { QueryResponseInitial } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import { General } from 'sanity-studio/types'
import { Organization, WebPage, WebSite, WithContext } from 'schema-dts'

import { buildPageTitle } from '@/configuration/seo'
import { siteConfig } from '@/configuration/site'

export const getHomePageSchema = (
  generalInfo: QueryResponseInitial<SanityDocument<General>>,
) => {
  const info = generalInfo?.data
  const socialLinks = Object.values(info?.socialLinks || {})
    ?.map((link) => link)
    ?.filter(Boolean)

  const organization: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'DietNutrition',
    name: siteConfig?.title,
    legalName: siteConfig?.businessName,
    url: siteConfig?.url,
    founder: {
      '@type': 'Person',
      name: siteConfig?.founder,
    },
    email: info?.email || undefined,
    sameAs: socialLinks?.length ? socialLinks : undefined,
  }

  const website: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig?.title,
    url: siteConfig?.url,
    publisher: organization,
  }

  const webPage: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: buildPageTitle('Home'),
    url: siteConfig?.url,
    isPartOf: website,
  }

  return webPage
}

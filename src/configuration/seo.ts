import { Metadata } from 'next'

import { siteConfig } from '@/configuration/site'

export const baseOpenGraph: Metadata['openGraph'] = {
  url: siteConfig.url,
  title: siteConfig.title,
  description: siteConfig.description,
  siteName: siteConfig.title,
  // images: ['/images/logo-expanded.png'],
  type: 'website',
  locale: 'en_US',
}

export const baseTwitter: Metadata['twitter'] = {
  card: 'summary_large_image',
  title: siteConfig.title,
  description: siteConfig.description,
  images: ['/images/logo-expanded.png'],
}

export const openGraphMeta = (
  meta?: Metadata['openGraph'],
): Metadata['openGraph'] => {
  return { ...baseOpenGraph, ...meta }
}

export const twitterMeta = (
  meta?: Metadata['twitter'],
): Metadata['twitter'] => {
  return { ...baseTwitter, ...meta }
}

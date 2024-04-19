import { Metadata } from 'next'

import { siteConfig } from '@/configuration/site'

/** Appends site name to provided page title. */
export const generatePageTitle = (title?: string) =>
  !title ? siteConfig?.title : `${title} | ${siteConfig?.title}`

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

// export const generatePageMeta = (meta?: Metadata): Metadata => {
//   return { ...meta }
// }

export type OgImageParams = {
  title?: string
  subtitle?: string
  url?: string
  alt?: string
  width?: string | number
  height?: string | number
}

export const buildOgImage = (params?: OgImageParams) => {
  const endpoint = `${process.env.SITE_BASE_URL}/api/og`
  if (!params) return endpoint

  const searchParams = {}
  Object.keys(params)?.forEach((param) => {
    searchParams[param] = (params[param] as string | number)?.toString()
  })

  const queryString = new URLSearchParams(searchParams)
  return `${endpoint}?${queryString}`
}

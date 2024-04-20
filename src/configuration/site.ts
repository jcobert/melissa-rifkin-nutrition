export const siteConfig = {
  title: 'Melissa Rifkin Nutrition',
  description: 'Melissa Rifkin Nutrition',
  businessName: 'Melissa Rifkin Nutrition, LLC',
  /** Without trailing slash. */
  url: process.env.SITE_BASE_URL || 'https://melissarifkinnutrition.com',
}

/** Appends the provided pathname to the site's base URL. */
export const canonicalUrl = (path: string) => `${siteConfig?.url}${path}`

export const calendlyDiscoveryUrl =
  process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_URL || ''

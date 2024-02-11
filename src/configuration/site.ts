export const siteConfig = {
  title: 'Melissa Rifkin Nutrition',
  description: 'Melissa Rifkin Nutrition',
  /** Without trailing slash. */
  url: 'https://melissarifkinnutrition.com',
  businessName: 'Melissa Rifkin Nutrition, LLC',
}

/** Appends site name to provided page title. */
export const pageTitle = (title: string) =>
  !title ? siteConfig?.title : `${title} | ${siteConfig?.title}`

export const calendlyDiscoveryUrl =
  process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_URL || ''

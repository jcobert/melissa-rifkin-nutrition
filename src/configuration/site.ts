export const siteConfig = {
  title: 'Melissa Rifkin Nutrition',
  description: 'Melissa Rifkin Nutrition',
  /** Without trailing slash. */
  url: 'https://melissarifkinnutrition.com',
}

/** Appends site name to provided page title. */
export const pageTitle = (title: string) =>
  !title ? siteConfig?.title : `${title} | ${siteConfig?.title}`

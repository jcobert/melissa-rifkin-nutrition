export type OpenGraphType = {
  siteName: string
  description: string
  templateTitle?: string
  logo?: string
}
export const openGraph = ({
  siteName,
  templateTitle,
  description,
  logo = 'https://og.melissarifkinnutrition.com/images/logo.jpg',
}: OpenGraphType): string => {
  const ogLogo = encodeURIComponent(logo)
  const ogSiteName = encodeURIComponent(siteName.trim())
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined
  const ogDesc = encodeURIComponent(description.trim())

  return `https://og.melissarifkinnutrition.com/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`
}

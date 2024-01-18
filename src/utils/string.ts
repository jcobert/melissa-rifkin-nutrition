import { Address } from '@/lib/hygraph/schema/common'

export const formatAddress = (address?: Address) => {
  if (!address) return {}
  const { city, state, zip, ...street } = address
  const locale = `${city}, ${state} ${zip}`
  return { street, locale }
}

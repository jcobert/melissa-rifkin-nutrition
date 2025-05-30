import { startCase } from 'lodash'
import { fraction } from 'mathjs'
import { RecipeUnit, Tag } from 'sanity-studio/types'

export const formatFraction = (number?: number) => {
  if (!number) return ''
  const frac = fraction(number || 0)
  const { n, d } = frac
  const whole = n > d ? Math.floor(n / d) : 0
  const rem = fraction(n / d - whole)

  let wholeDisplay = `${whole}`
  let remDisplay = `${rem?.n}/${rem?.d}`
  if (!!rem?.n && rem?.n === rem?.d && !whole) {
    wholeDisplay = `${rem?.n}`
    remDisplay = ''
  }
  if (rem?.n / rem?.d >= 0.3 && rem?.n / rem?.d < 0.4) {
    remDisplay = '1/3'
  }
  if (!rem?.n) remDisplay = ''
  return `${whole > 0 || (whole === 0 && rem?.d === 1) ? `${wholeDisplay}` : ''}${remDisplay ? ` ${remDisplay}` : ''}`
}

export const formatUnit = (unit?: keyof typeof RecipeUnit) => {
  if (!unit) return ''
  return RecipeUnit?.[unit]
}

export const formatCurrency = (amount?: string) => {
  if (!amount) return ''
  const currency = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(parseFloat(amount))
  return currency
}

export const getTags = (
  tags?: Tag[],
  options: { titleCase?: boolean } = { titleCase: false },
) => {
  if (!tags?.length) return []
  return tags?.flatMap((tag) =>
    tag?.label?.split(',')?.map((part) => {
      return options?.titleCase ? startCase(part?.trim()) : part?.trim()
    }),
  )
}

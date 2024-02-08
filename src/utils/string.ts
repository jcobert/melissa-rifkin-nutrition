import { fraction } from 'mathjs'
import { RecipeUnit } from 'sanity-studio/types'

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
  if (!rem?.n) remDisplay = ''
  return `${whole > 0 || (whole === 0 && rem?.d === 1) ? `${wholeDisplay} ` : ''}${remDisplay}`
}

export const formatUnit = (unit?: keyof typeof RecipeUnit) => {
  if (!unit) return ''
  return RecipeUnit?.[unit]
}

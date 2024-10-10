import { useState } from 'react'

type UseTruncateArrayOptions = {
  limit?: number
}

export const useTruncateArray = <T extends unknown[]>(
  arr: T,
  options?: UseTruncateArrayOptions,
) => {
  const original = arr || []
  const { limit = 5 } = options || {}

  const [expanded, setExpanded] = useState(false)

  const isLong = original.length > limit
  const truncatedArray = original?.slice(0, limit)
  const visibleArray = (expanded ? original : truncatedArray) as T

  return {
    isLong,
    visibleArray,
    expanded,
    setExpanded,
    toggleExpand: () => setExpanded((prev) => !prev),
  }
}

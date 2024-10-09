import { truncate } from 'lodash'
import { useState } from 'react'

type UseTruncateTextOptions = {
  limit?: number
}

export const useTruncateText = (
  text: string = '',
  options?: UseTruncateTextOptions,
) => {
  const { limit = 85 } = options || {}
  const [expanded, setExpanded] = useState(false)

  const isLong = text.length > limit
  const truncatedText = truncate(text, { length: limit })
  const visibleText = expanded ? text : truncatedText

  return {
    isLong,
    visibleText,
    expanded,
    setExpanded,
    toggleExpand: () => setExpanded((prev) => !prev),
  }
}

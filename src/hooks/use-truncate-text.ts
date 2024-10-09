import { truncate } from 'lodash'
import { useState } from 'react'

type UseTruncateTextProps = {
  text?: string
  limit?: number
}

export const useTruncateText = ({
  text = '',
  limit = 85,
}: UseTruncateTextProps) => {
  const [expanded, setExpanded] = useState(false)

  const isLong = text.length > limit
  const initialText = truncate(text, { length: limit })
  const currentText = expanded ? text : initialText

  return {
    isLong,
    currentText,
    expanded,
    setExpanded,
    toggleExpand: () => setExpanded((prev) => !prev),
  }
}

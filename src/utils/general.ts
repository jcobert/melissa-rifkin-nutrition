export const exists = (
  val: unknown,
  options: { allowEmptyString?: boolean } = { allowEmptyString: false },
) => {
  return ![
    undefined,
    null,
    ...(!options?.allowEmptyString ? [''] : []),
  ].includes(val as string)
}

/** Returns whether all of the values in the provided object are nullish. */
export const allValuesEmpty = (obj: Record<string, any>) => {
  if (!obj || typeof obj !== 'object' || !Object.keys(obj)?.length) {
    return true
  }
  return Object.entries(obj)?.every(([, val]) => !exists(val))
}

/** Returns whether some of the values in the provided object are nullish. */
export const someValuesEmpty = (obj: Record<string, any>) => {
  if (!obj || typeof obj !== 'object' || !Object.keys(obj)?.length) {
    return true
  }
  return Object.entries(obj)?.some(([, val]) => !exists(val))
}

export const emptyKeys = (obj: Record<string, any>) => {
  if (!obj || typeof obj !== 'object' || !Object.keys(obj)?.length) {
    return []
  }
  return Object.entries(obj)
    ?.map(([key, val]) => (!exists(val) ? key : undefined))
    ?.filter(Boolean) as string[]
}

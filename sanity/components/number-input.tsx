import { Text, TextInput } from '@sanity/ui'
import { FormEvent, useCallback } from 'react'
import { NumberInputProps, set, unset } from 'sanity'

import { formatFraction } from '@/utils/string'

export const CustomNumberInput = (props: NumberInputProps) => {
  const { elementProps, onChange, value } = props

  const handleChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const nextValue = Number(e.currentTarget?.value || 0)
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const display = formatFraction(value)

  return (
    <div className='flex items-center gap-4'>
      <TextInput
        type='number'
        {...elementProps}
        onChange={handleChange}
        value={value}
        step={0.025}
        min={0}
      />
      <Text>{display}</Text>
    </div>
  )
}

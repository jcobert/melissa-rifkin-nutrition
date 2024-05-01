import { Text, TextInput } from '@sanity/ui'
import { FormEvent, useCallback } from 'react'
import { TextInputProps, set, unset } from 'sanity'

export const CustomTextInput = (
  props: TextInputProps & { characterLimit?: number },
) => {
  const { elementProps, onChange, value, characterLimit = 185 } = props

  const handleChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const nextValue = e.currentTarget?.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const count = value?.length || 0

  return (
    <div className='flex flex-col gap-4'>
      <TextInput {...elementProps} onChange={handleChange} value={value} />
      <Text
        className='self-end'
        style={{ color: count > characterLimit ? 'red' : 'inherit' }}
      >{`${count} / ${characterLimit} characters`}</Text>
    </div>
  )
}

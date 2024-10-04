import { Rule } from '@sanity/types'
import { Text } from '@sanity/ui'
import { StringFieldProps, TextInputProps } from 'sanity'

export const RequiredIndicator = <span className='text-red-500'>*</span>

export const CustomTextInput = (
  props: TextInputProps & { characterLimit?: number },
) => {
  const {
    // elementProps,
    renderDefault,
    // onChange,
    value,
    characterLimit = 185,
  } = props

  // const handleChange = useCallback(
  //   (e: FormEvent<HTMLInputElement>) => {
  //     const nextValue = e.currentTarget?.value
  //     onChange(nextValue ? set(nextValue) : unset())
  //   },
  //   [onChange],
  // )

  const count = value?.length || 0

  // const validationRules = (props?.schemaType?.validation ||
  //   []) as unknown as Rule[]

  // const isRequired = validationRules?.some((rule) => rule._required)

  return (
    <div className='flex flex-col gap-4'>
      {/* <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        // style={{ backgroundColor: isRequired ? '#f76d5f' : 'inherit' }}
      /> */}
      {renderDefault(props)}
      <Text
        className='self-end'
        style={{
          color: count > characterLimit ? 'red' : 'inherit',
          fontSize: '0.75rem',
        }}
      >{`${count} / ${characterLimit} characters`}</Text>
    </div>
  )
}

export const CustomTextField = (props: StringFieldProps) => {
  const validationRules = (props?.schemaType?.validation ||
    []) as unknown as Rule[]

  const isRequired = validationRules?.some((rule) => rule._required)

  return (
    <div className='flex gap-1'>
      {isRequired ? <span className='text-red-500'>*</span> : null}
      <div className='flex-auto'>{props?.renderDefault(props)}</div>
    </div>
  )
}

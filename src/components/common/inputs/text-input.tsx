'use client'

import clsx from 'clsx'
import React, { FC, InputHTMLAttributes } from 'react'

export type TextInputProps = Partial<InputHTMLAttributes<HTMLInputElement>> & {
  label?: string
  helper?: string
}

const TextInput: FC<TextInputProps> = ({
  type = 'text',
  id,
  name,
  label = '',
  placeholder = '',
  ...props
}) => {
  return (
    <label htmlFor={id} className=''>
      <span
        className={clsx('text-sm text-gray-500', {
          "after:content-['*'] after:ml-[0.125rem] after:text-red-400":
            props?.required,
        })}
      >
        {label}
      </span>
      <input
        className='w-full h-10 px-[0.875rem] py-2 border border-gray-300 hover:border-slate-400 transition rounded'
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </label>
  )
}

export default TextInput

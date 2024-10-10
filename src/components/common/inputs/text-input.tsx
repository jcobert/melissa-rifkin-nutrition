'use client'

import React, { FC, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/utils/style'

export type TextInputProps = Partial<InputHTMLAttributes<HTMLInputElement>> & {
  label?: string
  helper?: string
  error?: FieldError['message']
}

const TextInput: FC<TextInputProps> = ({
  type = 'text',
  id,
  name,
  label = '',
  placeholder = '',
  required,
  error,
  className,
  ...props
}) => {
  return (
    <label htmlFor={id || name} className={className}>
      <span
        className={cn('text-sm text-gray-500', {
          "after:content-['*'] after:ml-[0.125rem] after:text-red-400":
            required,
        })}
      >
        {label}
      </span>
      <input
        className={cn(
          'w-full h-10 px-[0.875rem] py-2 border border-gray-300 hover:border-slate-400 transition rounded',
          error && 'border-rose-600',
        )}
        type={type}
        id={id || name}
        name={name}
        placeholder={placeholder}
        {...props}
      />
      {error ? (
        <span className='text-sm text-rose-600 mt-1'>{error}</span>
      ) : null}
    </label>
  )
}

export default TextInput

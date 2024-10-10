'use client'

import React, { FC, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/utils/style'

export type TextAreaProps = Partial<
  InputHTMLAttributes<HTMLTextAreaElement>
> & {
  label?: string
  helper?: string
  error?: FieldError['message']
}

const TextAreaInput: FC<TextAreaProps> = ({
  id,
  name,
  label = '',
  placeholder = '',
  required,
  error,
  className,
  maxLength,
  ...props
}) => {
  const value = props?.value as string
  const characterCount = `${value?.length}/${maxLength}`
  const maxError = (value?.length || 0) > (maxLength || 0)

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
      <div className='flex flex-col gap-1'>
        <textarea
          className={cn(
            'w-full px-[0.875rem] py-2 border border-gray-300 hover:border-slate-400 transition rounded min-h-32 -mb-2__',
            [error && 'border-rose-600 mb-1', maxLength && 'mb-1'],
          )}
          id={id || name}
          name={name}
          placeholder={placeholder}
          rows={4}
          {...props}
        />
      </div>
      <div className='flex items-center gap-4'>
        {error ? (
          <span className='text-sm text-rose-600 flex-1'>{error}</span>
        ) : null}
        {maxLength ? (
          <span
            className={cn('self-end text-sm', [
              !error && 'ml-auto',
              maxError && 'text-rose-600',
            ])}
          >
            {characterCount}
          </span>
        ) : null}
      </div>
    </label>
  )
}

export default TextAreaInput

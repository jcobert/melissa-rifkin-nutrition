'use client'

import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'
import Select, {
  ActionMeta,
  GroupBase,
  Props,
  StylesConfig,
} from 'react-select'

export const selectStyles: StylesConfig<any, boolean, GroupBase<any>> = {
  control: (base) => ({
    ...base,
    borderWidth: '1px',
    borderColor: 'rgb(209, 213, 219)',
    '&:hover': {
      borderColor: 'rgb(148, 163, 184)',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: 'rgb(156, 163, 175)',
  }),
}

export type SelectInputProps = Omit<Props, 'onChange'> & {
  label?: string
  helper?: string
  className?: string
  onChange?: (
    opt: SelectOption<any, any>,
    actionMeta: ActionMeta<unknown>,
  ) => void
}

const SelectInput: FC<SelectInputProps> = ({
  label = '',
  helper = '',
  className = '',
  id,
  onChange,
  classNames,
  ...props
}) => {
  return (
    <label htmlFor={id} className={clsx({ [className]: !!className })}>
      <span
        className={clsx('text-sm text-zinc-500 dark:text-zinc-200', {
          "after:content-['*'] after:ml-[0.125rem] after:text-red-400":
            props?.required,
        })}
      >
        {label}
      </span>
      <Select
        menuShouldBlockScroll
        menuShouldScrollIntoView
        // captureMenuScroll
        classNames={{
          control: () =>
            'hover:border-slate-400 transition px-1 py-[1px] border border-zinc-300 rounded dark:bg-zinc-600',
          placeholder: () => 'text-base text-zinc-400 dark:text-zinc-300',
          menu: () => 'dark:bg-zinc-800',
          option: (props) =>
            clsx({
              'dark:bg-zinc-700': props.isFocused && !props.isSelected,
            }),
          input: () => clsx('dark:text-zinc-100'),
          singleValue: () => clsx('dark:text-zinc-100'),
          ...classNames,
        }}
        styles={{
          ...selectStyles,
          multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgb(240, 240, 240)',
            borderWidth: '1px',
            borderRadius: '50px',
            padding: '0 4px',
            maxHeight: '28px',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: 'rgb(150, 150, 150)',
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              backgroundColor: 'unset',
              // backgroundColor: "rgb(200, 200, 200)",
              color: 'rgb(100, 100, 100)',
            },
          }),
        }}
        onChange={onChange as Props['onChange']}
        {...props}
      />
      <span className='text-xs text-gray-600'>{helper}</span>
    </label>
  )
}

export default SelectInput

export type SelectOption<
  T extends ReactNode | any = string,
  U extends ReactNode = ReactNode,
> = {
  value: T
  label: U
}

import { ButtonHTMLAttributes, FC } from 'react'

import { cn } from '@/utils/style'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  unstyled?: boolean
}

const Button: FC<Props> = ({
  children,
  className = '',
  type = 'button',
  unstyled = false,
  ...props
}) => {
  return (
    <>
      <button
        className={cn({
          'px-8 py-3 flex text-almost-white bg-brand hover:bg-brand items-center justify-center gap-2 max-sm:text-lg sm:py-2 cursor-pointer rounded-md min-w-[8rem] max-sm:w-full transition':
            !unstyled,
          [className]: !!className,
        })}
        type={type}
        {...props}
      >
        {children}
      </button>
    </>
  )
}

export default Button

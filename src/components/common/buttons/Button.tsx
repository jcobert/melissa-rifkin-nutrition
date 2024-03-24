import { ButtonHTMLAttributes, FC } from 'react'

import { cn } from '@/utils/style'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  unstyled?: boolean
}

const Button: FC<ButtonProps> = ({
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
          btn: !unstyled,
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

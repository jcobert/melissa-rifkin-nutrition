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

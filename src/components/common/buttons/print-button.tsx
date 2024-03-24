import { FC } from 'react'
import { FiPrinter } from 'react-icons/fi'

import { cn } from '@/utils/style'

import Button, { ButtonProps } from '@/components/common/buttons/Button'

const PrintButton: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <Button
      unstyled
      className={cn([
        'print:hidden btn-outline rounded-full min-w-0 p-4 sm:p-2 text-xl max-sm:w-fit',
        className,
      ])}
      {...props}
    >
      <FiPrinter />
      <span className='sr-only'>Print</span>
    </Button>
  )
}

export default PrintButton

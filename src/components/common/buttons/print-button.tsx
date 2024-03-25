import { FC } from 'react'
import { FiPrinter } from 'react-icons/fi'
import { useReactToPrint } from 'react-to-print'

import { cn } from '@/utils/style'

import Button, { ButtonProps } from '@/components/common/buttons/Button'

export type PrintHandler = ReturnType<typeof useReactToPrint>

const PrintButton: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <Button
      unstyled
      className={cn([
        'print:hidden btn-outline rounded-full min-w-0 p-2 sm:p-2 text-2xl sm:text-xl max-sm:w-fit',
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

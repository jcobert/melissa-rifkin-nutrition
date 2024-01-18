import * as Collapse from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import React, { FC, ReactNode, useState } from 'react'
import { MdOutlineExpandMore } from 'react-icons/md'

type Props = {
  children?: ReactNode
  header?: ReactNode
  triggerIcon?: ReactNode
  defaultOpen?: boolean
  className?: string
  triggerClassName?: string
}

const Collapsible: FC<Props> = ({
  children,
  header,
  triggerIcon,
  defaultOpen = false,
  className = '',
  triggerClassName = '',
}) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Collapse.Root
      open={open}
      onOpenChange={setOpen}
      className={clsx('flex flex-col gap-1', { [className]: !!className })}
    >
      <Collapse.Trigger
        className={clsx('flex items-center gap-2 justify-between', {
          [triggerClassName]: !!triggerClassName,
        })}
      >
        <>
          <h4 className='font-medium'>{header}</h4>
          <div
            className={clsx('text-xl transition-transform', {
              'rotate-180': open,
            })}
          >
            {triggerIcon ?? <MdOutlineExpandMore />}
          </div>
        </>
      </Collapse.Trigger>
      <Collapse.Content className='overflow-hidden data-[state=open]:animate-collapseDown data-[state=closed]:animate-collapseUp'>
        {children}
      </Collapse.Content>
    </Collapse.Root>
  )
}

export default Collapsible

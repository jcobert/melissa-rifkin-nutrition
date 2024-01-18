import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'
import { CgClose } from 'react-icons/cg'

type Props = {
  children?: ReactNode
  trigger?: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  closeButton?: boolean
  className?: string
}

const Modal: FC<Props> = ({
  children,
  trigger,
  isOpen,
  setIsOpen,
  closeButton = true,
  className = '',
}) => {
  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen} modal>
        {!!trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/60' />
          <Dialog.Content
            className={clsx(
              'fixed -translate-x-1/2 -translate-y-1/2 overflow-auto top-1/2 left-1/2 w-full h-fit max-h-[70dvh] sm:w-[95vw] md:w-[80vw] lg:w-[75vw] xl:max-w-[50vw] sm:max-h-[80dvh] shadow p-4 sm:rounded-md bg-zinc-50 dark:bg-zinc-700 z-50',
              {
                [className]: !!className,
              },
            )}
          >
            {closeButton && (
              <Dialog.Close
                className='absolute top-2 right-2'
                aria-label='Close'
              >
                <div className='p-2 border-gray-300 rounded-full bg-gray-200 border dark:text-zinc-600'>
                  <CgClose />
                </div>
              </Dialog.Close>
            )}
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default Modal

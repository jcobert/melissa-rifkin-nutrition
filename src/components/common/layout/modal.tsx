import * as Dialog from '@radix-ui/react-dialog'
import React, { FC, ReactNode } from 'react'
import { CgClose } from 'react-icons/cg'

import { cn } from '@/utils/style'

// type Props = {
//   children?: ReactNode
//   trigger?: ReactNode
//   isOpen: boolean
//   setIsOpen: (isOpen: boolean) => void
//   closeButton?: boolean
//   className?: string
// }

export type ModalProps = {
  children?: ReactNode
  trigger?: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  closeButton?: boolean
  title?: ReactNode
  className?: string
  titleClassName?: string
} & Pick<Dialog.DialogPortalProps, 'container'>

const Modal: FC<ModalProps> = ({
  children,
  trigger,
  isOpen,
  setIsOpen,
  closeButton = true,
  title,
  className,
  titleClassName,
  container,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen} modal>
      {!!trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        {/* <Dialog.Portal container={containerRef.current}> */}
        <Dialog.Overlay className='fixed inset-0 bg-black/60 z-[1000]' />
        {/* <div className='fixed inset-0 bg-black/60 z-[1000]' /> */}
        <Dialog.Content
          className={cn([
            'fixed -translate-x-1/2 -translate-y-1/2 overflow-auto top-1/2 left-1/2 w-full h-fit max-sm:h-[100dvh] sm:w-[95vw] md:w-[85vw] lg:w-[75vw] xl:max-w-[50vw] sm:max-h-[80dvh] shadow p-4 sm:rounded-md bg-almost-white z-[1001] flex flex-col gap-6 pb-safe',
            className,
          ])}
        >
          <div
            className={cn([
              'w-full flex items-center text-balance font-semibold text-xl mb-2',
              titleClassName,
            ])}
          >
            {title ? (
              <div className='flex-auto text-center'>{title}</div>
            ) : null}
            {closeButton ? (
              <Dialog.Close
                className='absolute top-2 right-2'
                aria-label='Close'
              >
                <CgClose className='text-xl hover:text-gray-600 transition m-2 rounded' />
              </Dialog.Close>
            ) : null}
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    // <>
    //   <Dialog.Root open={isOpen} onOpenChange={setIsOpen} modal>
    //     {!!trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
    //     <Dialog.Portal>
    //       <Dialog.Overlay className='fixed inset-0 bg-black/60' />
    //       <Dialog.Content
    //         className={clsx(
    //           'fixed -translate-x-1/2 -translate-y-1/2 overflow-auto top-1/2 left-1/2 w-full h-fit max-h-[70dvh] sm:w-[95vw] md:w-[80vw] lg:w-[75vw] xl:max-w-[50vw] sm:max-h-[80dvh] shadow p-4 sm:rounded-md bg-zinc-50 dark:bg-zinc-700 z-50',
    //           {
    //             [className]: !!className,
    //           },
    //         )}
    //       >
    //         {closeButton && (
    //           <Dialog.Close
    //             className='absolute top-2 right-2'
    //             aria-label='Close'
    //           >
    //             <div className='p-2 border-gray-300 rounded-full bg-gray-200 border dark:text-zinc-600'>
    //               <CgClose />
    //             </div>
    //           </Dialog.Close>
    //         )}
    //         {children}
    //       </Dialog.Content>
    //     </Dialog.Portal>
    //   </Dialog.Root>
    // </>
  )
}

export default Modal

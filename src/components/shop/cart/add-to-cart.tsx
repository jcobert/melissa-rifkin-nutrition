'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'

import { ProductVariant } from '@/lib/shopify/types'

import { addItem } from '@/components/shop/cart/actions'
import LoadingDots from '@/components/shop/loading-dots'

function SubmitButton({
  availableForSale,
  selectedVariantId,
  text,
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
  text?: string
}) {
  const { pending } = useFormStatus()
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded bg-brand p-4 tracking-wide text-white transition'
  const disabledClasses =
    'cursor-not-allowed opacity-60 hover:opacity-60 transition'

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    )
  }

  // if (!selectedVariantId) {
  //   return (
  //     <button
  //       aria-label='Please select an option'
  //       aria-disabled
  //       className={clsx(buttonClasses, disabledClasses)}
  //     >
  //       <div className='absolute left-0 ml-4'>
  //         <PlusIcon className='h-5' />
  //       </div>
  //       Add To Cart
  //     </button>
  //   )
  // }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault()
      }}
      aria-label='Add to cart'
      aria-disabled={pending}
      className={clsx('flex items-center gap-2 btn', {
        disabledClasses: pending,
      })}
    >
      <div className=''>
        {pending ? (
          <LoadingDots className='mb-3 bg-white' />
        ) : (
          <PlusIcon className='h-5' />
        )}
      </div>
      {text || 'Add to Cart'}
    </button>
  )
}

export function AddToCart({
  variants,
  availableForSale,
  text,
}: {
  variants: ProductVariant[]
  availableForSale: boolean
  text?: string
}) {
  const [message, formAction] = useFormState(addItem, null)
  const searchParams = useSearchParams()
  const defaultVariantId = variants?.length === 1 ? variants[0]?.id : undefined
  const variant = variants?.find((variant: ProductVariant) =>
    variant?.selectedOptions?.every(
      (option) =>
        option?.value === searchParams?.get(option?.name?.toLowerCase()),
    ),
  )
  const selectedVariantId = variant?.id || defaultVariantId
  const actionWithVariant = formAction.bind(null, selectedVariantId)

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        text={text}
      />
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  )
}

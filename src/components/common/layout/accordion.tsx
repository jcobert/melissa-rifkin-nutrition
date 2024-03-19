import * as Radix from '@radix-ui/react-accordion'
import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'
import { MdOutlineExpandMore } from 'react-icons/md'

type Props = {
  items?: { header?: ReactNode; content?: ReactNode }[]
  className?: string
  triggerClassName?: string
  itemClassName?: string
  defaultOpen?: number[]
  type?:
    | Radix.AccordionSingleProps['type']
    | Radix.AccordionMultipleProps['type']
  collapsible?: Radix.AccordionSingleProps['collapsible']
}

const Accordion: FC<Props> = ({
  items = [],
  className = '',
  triggerClassName = '',
  itemClassName = '',
  defaultOpen = [],
  ...props
}) => {
  const isSingleType = props?.type === 'single' || !props?.type
  const open = defaultOpen?.map((item) => `item-${item}`)
  const radixProps = isSingleType
    ? {
        collapsible: props?.collapsible,
        type: 'single' as const,
        defaultValue: open?.[0] ? open[0] : ('' as string),
      }
    : { type: 'multiple' as const, defaultValue: open }
  return (
    <Radix.Root
      {...radixProps}
      className={clsx('border rounded-md divide-y', {
        [className]: !!className,
      })}
    >
      {items
        // Only render accordion sections that have content
        ?.filter((itm) => !!itm?.content)
        ?.map((item, i) => (
          <Radix.Item
            key={i}
            value={`item-${i + 1}`}
            className={clsx('p-2 rounded-md', {
              [itemClassName]: !!itemClassName,
            })}
          >
            <Radix.Header>
              <Radix.Trigger
                className={clsx(
                  'flex w-full items-center justify-between gap-2 max-sm:py-2 group',
                  { [triggerClassName]: !!triggerClassName },
                )}
              >
                <>
                  <h4 className=''>{item?.header}</h4>
                  <MdOutlineExpandMore className='text-xl transition-transform duration-300 group-data-[state=open]:rotate-180' />
                </>
              </Radix.Trigger>
            </Radix.Header>
            <Radix.Content className='overflow-hidden mt-2 data-[state=open]:animate-accordionDown data-[state=closed]:animate-accordionUp'>
              {item?.content}
            </Radix.Content>
          </Radix.Item>
        ))}
    </Radix.Root>
  )
}

export default Accordion

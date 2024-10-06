import { FC } from 'react'
import { FaqSet } from 'sanity-studio/types'

import Accordion from '@/components/common/layout/accordion'
import PortableBlockContent from '@/components/common/portable/portable-block-content'

type Props = {
  faqSet?: FaqSet[]
}

const RecipeFaq: FC<Props> = ({ faqSet }) => {
  if (!faqSet?.length) return null

  return (
    <Accordion
      items={faqSet?.concat(faqSet)?.map((faq, i) => ({
        header: faq?.question,
        content: (
          <div className='prose'>
            {faq?.answer ? <PortableBlockContent value={faq?.answer} /> : null}
          </div>
        ),
      }))}
      collapsible
      type='multiple'
      defaultOpen={[1]}
      triggerClassName='text-left text-pretty font-medium text-xl py-4 data-[state=open]:text-brand data-[state=open]:hover:text-brand-dark'
      itemClassName='bg-almost-white data-[state=closed]:hover:bg-brand-gray-light px-4 transition'
    />
  )
}

export default RecipeFaq

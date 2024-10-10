import { format } from 'date-fns'
import { FC } from 'react'
import { MdOutlineExpandMore } from 'react-icons/md'
import { UserComment } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import Button from '@/components/common/buttons/Button'

import { useTruncateText } from '@/hooks/use-truncate-text'

type Props = {
  comment?: UserComment
}

const UserPostComment: FC<Props> = ({ comment }) => {
  const { name, _createdAt: date, comment: text = '' } = comment || {}

  const { visibleText, isLong, expanded, toggleExpand } = useTruncateText(text)

  if (!comment || !comment?.approved) return null

  return (
    <div className='flex flex-col gap-2 py-2 px-4 max-w-prose__'>
      <div className='flex flex-col'>
        {name ? <p className='text-sm'>{name}</p> : null}
        {date ? (
          <p className='text-xs text-brand-gray-dark'>
            {format(date, 'MMM dd, yyyy')}
          </p>
        ) : null}
      </div>
      <div className=''>
        {text ? <p className='max-w-prose leading-6'>{visibleText}</p> : null}
        {isLong ? (
          <Button
            aria-label='See full comment.'
            unstyled
            className='whitespace-nowrap btn-text p-0 text-base flex items-center'
            onClick={() => {
              toggleExpand()
            }}
          >
            <span>{expanded ? 'See less' : 'See more'}</span>
            <MdOutlineExpandMore
              aria-hidden
              className={cn('text-xl transition-transform duration-300', [
                expanded && 'rotate-180',
              ])}
            />
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default UserPostComment

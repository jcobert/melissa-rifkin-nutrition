import { format } from 'date-fns'
import { FC } from 'react'
import { UserComment } from 'sanity-studio/types'

type Props = {
  comment?: UserComment
}

const UserPostComment: FC<Props> = ({ comment }) => {
  if (!comment || !comment?.approved) return null

  const { name, _createdAt: date, comment: text } = comment

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
      {text ? <p className='max-w-prose'>{text}</p> : null}
    </div>
  )
}

export default UserPostComment

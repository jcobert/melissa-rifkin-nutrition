import { format } from 'date-fns'
import { FC } from 'react'
import { UserComment } from 'sanity-studio/types'

type Props = {
  comment?: UserComment
}

const UserPostComment: FC<Props> = ({ comment }) => {
  if (!comment || !comment?.approved) return null

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col'>
        <p>{comment?.name}</p>
        <p className='text-sm text-brand-gray-dark'>
          {format(comment?._createdAt, 'MMM dd, yyyy')}
        </p>
      </div>
      <p>{comment?.comment}</p>
    </div>
  )
}

export default UserPostComment

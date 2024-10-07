import { sortBy } from 'lodash'
import { FC } from 'react'
import { Recipe } from 'sanity-studio/types'

import NoResults from '@/components/common/no-results'
import CommentForm from '@/components/features/user-generated/comment-form'
import UserPostComment from '@/components/features/user-generated/user-post-comment'

type Props = {
  recipe?: Recipe
}

const RecipeComments: FC<Props> = ({ recipe }) => {
  if (!recipe) return null

  const comments = sortBy(
    recipe?.comments,
    (comment) => comment?._createdAt,
  )?.reverse()

  return (
    <div className='flex flex-col gap-8 sm:gap-12'>
      {/* New Comment */}
      <CommentForm />

      {/* Comments */}
      {comments?.length ? (
        <div className='flex flex-col divide-y-1 rounded border px-2 not-prose bg-almost-white'>
          {recipe?.comments?.map((comment) => (
            <UserPostComment key={comment?._id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className='mx-auto'>
          <NoResults
            title='No Comments'
            subtitle=''
            description='Be the first to comment!'
          />
        </div>
      )}
    </div>
  )
}

export default RecipeComments
